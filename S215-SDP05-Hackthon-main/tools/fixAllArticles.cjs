const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'allArticles.json');
const original = fs.readFileSync(filePath, 'utf8');

// Find all top-level object blocks using a simple parser (assumes no nested top-level {})
const objects = [];
let depth = 0;
let inString = false;
let startIndex = null;
for (let i = 0; i < original.length; i++) {
  const ch = original[i];
  if (ch === '"') {
    // Count backslashes to determine if quote is escaped
    let esc = 0; let j = i - 1;
    while (j >= 0 && original[j] === '\\') { esc++; j--; }
    if (esc % 2 === 0) inString = !inString;
  }
  if (!inString) {
    if (ch === '{') {
      if (depth === 0) startIndex = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && startIndex !== null) {
        const block = original.slice(startIndex, i + 1);
        objects.push(block);
        startIndex = null;
      }
    }
  }
}

function parseObj(str) {
  // We will attempt to parse the object by ensuring ids quoted if needed
  // But first try to JSON.parse directly
  try { return JSON.parse(str); } catch (e) {
    // Try to fix by quoting keys or id values that are improper - a quick approach
    // Replace patterns like "id": 323A -> "id": "323A"
    let fixed = str.replace(/"id"\s*:\s*(\d+)([A-Za-z]+)/g, '"id": "$1$2"');
    fixed = fixed.replace(/"id"\s*:\s*(\d{4,})/g, (m, p1) => {
      // For numbers with >3 digits, convert to string - likely wrong numeric; leave as string
      return `"id": "${p1}"`;
    });
    // Remove stray quotes like "id": 21" -> "id": 21
    fixed = fixed.replace(/"id"\s*:\s*(\d+)"/g, '"id": $1');
    try {
      return JSON.parse(fixed);
    } catch (e2) {
      // Last resort: replace id value entirely based on article label
      // Extract article label
      const match = /"article"\s*:\s*"([^"]+)"/.exec(str);
      let idVal = undefined;
      if (match) {
        const articleLabel = match[1].replace(/Article\s*/i, '').trim();
        idVal = articleLabel.replace(/[\s–]+/g, '').replace('\u2013', '-');
      }
      // Try to construct JSON by parsing with a more permissive regex to add correct id
      let permissive = str;
      if (idVal !== undefined) {
        // Insert/replace id field
        if (/"id"\s*:\s*"?[\w\d]+"?/.test(permissive)) {
          permissive = permissive.replace(/("id"\s*:)\s*"?[\w\d]+"?/, `$1 ${JSON.stringify(idVal)}`);
        } else {
          // insert after opening brace
          permissive = permissive.replace(/\{\s*/, `{\n  "id": ${JSON.stringify(idVal)},\n`);
        }
      }
      try {
        return JSON.parse(permissive);
      } catch (finalErr) {
        console.error('Failed to parse object even after fixes:', finalErr.message);
        console.error('Object snippet:', str.slice(0, 300));
        throw finalErr;
      }
    }
  }
}

const parsed = objects.map(parseObj);

// Now ensure id fields are normalized: if id is undefined, extract from article label
parsed.forEach(obj => {
  if (obj.id === undefined) {
    if (obj.article) {
      const label = obj.article.replace(/Article\s*/i, '').trim();
      // If label contains letters (e.g., 51A) keep as string, else numeric
      if (/\d+[A-Za-z]/.test(label)) {
        obj.id = label;
      } else if (/\d+/.test(label)) {
        obj.id = parseInt(label, 10);
      } else {
        obj.id = label;
      }
    }
  } else {
    // normalize ids: if they contain letters but are not string, convert to string
    if (typeof obj.id !== 'string' && /[A-Za-z]/.test(String(obj.id))) {
      obj.id = String(obj.id);
    }
  }
});

// Fix known typos: 2431 => "243A"
parsed.forEach(obj => {
  if (typeof obj.id === 'string' && obj.id === '2431') {
    obj.id = '243A';
  }
});

// Write back as compact JSON array
const out = JSON.stringify(parsed, null, 2);
fs.writeFileSync(filePath, out, 'utf8');
console.log('Finished repairing allArticles.json - items:', parsed.length);

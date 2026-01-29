export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        <p className="text-sm">
          © {new Date().getFullYear()} ConstitutionVerse. All Rights Reserved.
        </p>

        <div className="flex gap-6 text-sm mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/about" className="hover:text-white">About</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>

      </div>
    </footer>
  );
}

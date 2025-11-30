# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Adding Tailwind CSS

This project now includes Tailwind CSS configured with PostCSS. To get started:

1. Install dependencies (in the `constitutionverse` folder):

```powershell
cd constitutionverse; npm install
```

2. Start the dev server:

```powershell
npm run dev
```

3. Tailwind is configured in `tailwind.config.cjs` and loaded via PostCSS config in `postcss.config.cjs`. `src/index.css` includes the Tailwind directives.

Tip: Add Tailwind utility classes to elements in `src/App.jsx` to style them quickly.

## Deployment

This repository is set up to deploy to GitHub Pages via the `gh-pages` branch using GitHub Actions. After a push to `main`, the workflow builds the app and publishes the `dist` folder.

Expected public URL (once the workflow finishes and Pages is enabled for the repo):

https://shanmukha-2007.github.io/S215-SDP05-Hackthon/

If the site does not appear within a few minutes, check the repository's **Settings → Pages** and the **Actions** tab for workflow logs.

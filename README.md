# Avi Panchasara — Portfolio

Production portfolio built with React, TypeScript, and Vite.

Live Site: https://avpa1212.github.io

---

## Stack

- React
- TypeScript
- Vite (SWC)
- Framer Motion
- GitHub Actions (CI/CD)
- GitHub Pages (Hosting)

---

## Architecture

This is a static portfolio deployed via GitHub Pages using an automated GitHub Actions workflow.

Build output:

dist/


Deployment:
- Triggered on push to `main`
- Builds with Node 20
- Uploads static artifact
- Deploys automatically

---

## Development

Install dependencies:


npm install


Start local dev server:


npm run dev


Default local URL:

http://localhost:5173


---

## Production Build

Generate optimized build:


npm run build


Preview production build locally:


npm run preview


---

## Deployment

Deployment is handled automatically via GitHub Actions.

Workflow file:

.github/workflows/deploy.yml


On every push to `main`, the site is rebuilt and redeployed.

---

## Project Structure


src/
components/
App.tsx
main.tsx
styles.css

public/

vite.config.ts
package.json


---

## Features

- Dark, high-contrast design system
- Gradient hero typography
- Motion-based scroll reveals
- Responsive grid layout
- Modular component architecture
- CI/CD pipeline

---

## License

This repository contains personal portfolio code and is not intended for reuse without permission.
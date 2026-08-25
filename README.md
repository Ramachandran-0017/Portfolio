# Ramachandran G — Portfolio

A dark-first,  developer portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Motion, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Personalize

Edit `src/data/portfolio.ts`:

- email
- GitHub
- LinkedIn
- resume path
- projects
- skills
- education/experience timeline

Put your actual resume at `public/resume.pdf`.

The project deliberately does not invent achievements, statistics, clients, or production metrics.

## Contact form

The contact form uses FormSubmit's AJAX endpoint, so this static GitHub Pages site does not need its own backend server. Submissions are sent to the portfolio email address and the form stays on the page. FormSubmit requires the email address to be confirmed the first time the form is used. See the official documentation: https://formsubmit.co/documentation

The form is configured for `rahulda053@gmail.com` in `src/App.tsx`. If you ever change the portfolio email, update the FormSubmit endpoint there as well.

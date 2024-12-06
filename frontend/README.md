# Frontend

Frontend of budget tracker application

## Code Guidelines

- Code is organzied by features and file types
- Code is co-located by feature as possible for maintainability and ease of use
- Componenets that are used by multiple features are placed in `components` folder
- Using `kebab-case` for folder, file and components naming convention
- Using `camelCase` for function and variable naming

## Run Tasks

To run the dev server for your app, use:

```sh
npx nx serve frontend
```

To create a production bundle:

```sh
npx nx build frontend
```

## Project Structure

Overview of the project's directory structure:

```md
├── src
│ ├── app
| ├── assets
| ├── components
| ├── feature
| ├── layouts
| ├── pages
| ├── providers
| ├── lib
| ├── routing
| ├── services
| ├── theme
| ├── utils
| ├── styles
| ├── main.tsx
├── project.json
├── README.md
└── tsconfig.base.json
└── vite.config.ts
```

## Deployment

- Deployed using Netlify
- See env variables from `.env.sample`

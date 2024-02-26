# React + TypeScript + Vite

This is a demo project aiming to provide a simple booking system managed in a global app store.

## Features

- React with TypeScript
- Fast development server with Vite
- Efficient production build
- ESLint for code linting

## Getting Started

First, clone this repository, then navigate into the project directory

Install dependencies using npm:

```
npm install
```

## Development

To start the development server, run:

```
npm run dev
```
## Linting

To lint your code using ESLint, run:

```
npm run lint
```

This will check your TypeScript and JavaScript files for linting errors and warnings and will attempt to fix linting errors where possible.

## Testing

Add or Edit tests in [cypress/e2e/](/cypress/e2e/main.cy.ts)

To run test in interactive mode, run:

```
npm run test:open
```

To run tests in headless mode, run:
```
npm run test:ci
```

## Building for Production

To build the application for production, run:

```
npm run build
```


This will generate an optimized production build of your application in the `dist` directory.

## Docs

Architecture documentation can be [found here](/docs/index.md)


# Project Architecture Documentation

## Overview

This document provides an overview of the architecture decisions and patterns used in our React project. It outlines the structure of the project, key technologies, and design principles guiding our development.

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture Decisions](#architecture-decisions)
3. [Project Structure](#project-structure)
4. [Technologies](#technologies)
5. [Design Principles](#design-principles)

## 1. Introduction <a name="introduction"></a>

This project is a web application built using React, aiming to provide a demo version for a booking system managed is a global application state

## 2. Architecture Decisions <a name="architecture-decisions"></a>

### ADR 001: State Management
Zustand was choosen for state management due to its simplicity, performance, and compatibility with React hooks. Zustand allows us to manage global application state efficiently without the complexity of a larger library like Redux.

### ADR 002: Component Styling
We have chosen to use a combination of Tailwind CSS and Material Design System for styling our components. This decision was made to leverage the benefits of both frameworks, Tailwind CSS for its utility-first approach and rapid development capabilities, and Material Design System for its consistent design language and pre-designed components.

Tailwind CSS
Tailwind CSS provides a utility-first approach to styling, allowing for rapid development and consistent styling across the application. We use Tailwind CSS for low-level utility classes and custom styling. Its modular and configurable nature fits well with our component-based architecture.

Material Design System
Material Design System offers a comprehensive set of pre-designed components and guidelines based on Google's Material Design principles. We use Material Design System components for complex UI elements such as buttons, forms, and navigation menus, ensuring consistency and adherence to design standards.

Emotion/React
Emotion/React is a library for styling React components with CSS-in-JS. It provides powerful features such as dynamic styling, composition, and theming. We use Emotion/React for scoped styles, component-specific styles, and dynamic styling based on props or state.

## 3. Project Structure <a name="project-structure"></a>

Our project follows a modular and component-based architecture to promote reusability and maintainability. The directory structure is organized as follows:

```
📦docs
 ┗ 📜index.md
📦src
 ┣ 📂assets
 ┃ ┗ react.svg
 ┣ 📂components
 ┃ ┣ 📂ui
 ┃ ┃ ┣ Box.tsx
 ┃ ┃ ┣ Input.tsx
 ┃ ┃ ┗ Textarea.tsx
 ┃ ┣ Booking.tsx
 ┃ ┣ BookingsList.tsx
 ┃ ┗ MainHeader.tsx
 ┣ 📂containers
 ┃ ┗ App.tsx
 ┣ 📂utils
 ┃ ┣ constants.ts
 ┃ ┗ store.ts
 ┣ index.css
 ┣ main.tsx
 ┗ vite-env.d.ts
```

- `components/`: Contains reusable UI components used across the application.
- `pages/`: Contains top-level pages and views.
- `styles/`: Contains global styles and configuration for Tailwind CSS.

## 4. Technologies <a name="technologies"></a>

- React: Front-end JavaScript library for building user interfaces.
- Zustand: State management library for React.
- Tailwind CSS: Utility-first CSS framework for rapidly building custom designs.
- Material Design System: React component library that implements Google's Material Design.
- Emotion/React: Emotion is a library designed for writing css styles with JavaScript

## 5. Design Principles <a name="design-principles"></a>

This project adheres to the following design principles:

- **Modularity**: Components are designed to be self-contained and reusable.
- **Simplicity**: Emphasis is placed on simplicity and readability of code.
- **Scalability**: Architecture is designed to scale with the growth of the project.
- **Accessibility**: UI components are designed with accessibility best practices in mind.


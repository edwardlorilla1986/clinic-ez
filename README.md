This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Dynamic Form Builder

A dynamic form builder application inspired by Google Forms, built using Next.js and TypeScript. This application allows users to create, edit, and submit forms with various types of fields including text, number, checkbox, multiple-choice, and dropdown.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add and remove form fields dynamically.
- Support for different types of form fields:
    - Text
    - Number
    - Checkbox
    - Multiple Choice
    - Dropdown
- Form submission handling.
- State management using Redux.

## Installation

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/your-username/dynamic-form-builder.git
   cd dynamic-form-builder
   \`\`\`

2. Install dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:

   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to \`http://localhost:3000\`.

## Usage

1. Open the application in your browser.
2. Use the buttons to add different types of form fields.
3. Fill out the fields as needed.
4. Click "Submit" to see the form data logged in the console.

## Project Structure

\`\`\`
dynamic-form-builder/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── CheckboxField.tsx
│   │   ├── DropdownField.tsx
│   │   ├── FormBuilder.tsx
│   │   ├── MultipleChoiceField.tsx
│   │   ├── NumberField.tsx
│   │   ├── TextField.tsx
│   ├── store/
│   │   ├── formSlice.ts
│   │   ├── index.ts
│   ├── types/
│   │   ├── formField.ts
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   ├── submit.tsx
├── .babelrc
├── .gitignore
├── package.json
├── tsconfig.json
\`\`\`

## Components

### TextField

A component for rendering a text input field.

### NumberField

A component for rendering a number input field.

### CheckboxField

A component for rendering a checkbox input field.

### MultipleChoiceField

A component for rendering a multiple-choice input field.

### DropdownField

A component for rendering a dropdown input field.

### FormBuilder

The main component for building and managing the form fields.

### FormSubmission

A component for handling form submission.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

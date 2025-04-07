# Recipe Extractor

A web application that automatically extracts and formats recipes from any webpage. Built with Next.js, this tool uses AI to parse recipe content and present it in a beautiful, shareable format.

## Features

- 🔗 **URL-based Extraction**: Simply paste a recipe URL to extract its contents
- 🤖 **AI-Powered Parsing**: Utilizes advanced language models (Gemini and Llama) to intelligently extract recipe information
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🌓 **Dark Mode Support**: Seamless dark/light mode switching
- 📸 **Image Export**: Download recipes as high-quality images
- 🎨 **Beautiful Formatting**: Clean, organized presentation of recipe details including:
  - Recipe title
  - Cooking duration
  - Ingredients list
  - Step-by-step instructions
  - Additional notes and tips

## Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **AI Integration**: Google's Gemini and Meta's Llama models
- **UI Components**: Radix UI, Framer Motion
- **Development**: Turbopack for fast development experience

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Setup

To use the AI features, you'll need to set up the following environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
```

## Project Structure

- `src/app/`: Next.js app router components and pages
- `src/app/backend/`: Server-side logic for recipe extraction
- `src/app/components/`: Reusable UI components
- `src/static/`: Static assets and configuration files

## License

This project is licensed under the MIT License - see the LICENSE file for details.

<sub>Note: most of the codebase (especially the UI) was written using AI. And same goes for the README as well :)</sub>
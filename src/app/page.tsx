'use client'

import { useState } from 'react';
import { RecipeViewer } from './components/RecipeViewer';
import { parseRecipeFromWebpage } from './backend/html_parser';
import { extractRecipe } from './backend/recipe_extractor';
import { motion } from 'framer-motion';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onExtractButtonClick = async () => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const recipeText = await parseRecipeFromWebpage(url);
      const recipeData = await extractRecipe(recipeText);
      console.log('Extracted recipe data:', recipeData);
      const recipe = JSON.parse(recipeData.response);

      setRecipe(recipe);
    } catch (err) {
      console.error('Extraction error:', err);
      setError('Failed to extract recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 mb-4">
            Recipe Extractor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform any recipe from a webpage into a beautiful, shareable format with just one click.
          </p>
        </motion.div>

        {/* URL Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a recipe URL here..."
              className="flex-1 p-4 border dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
            />
            <button
              onClick={onExtractButtonClick}
              disabled={isLoading || !url}
              className="px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl hover:from-slate-800 hover:to-slate-600 disabled:from-slate-300 disabled:to-slate-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-slate-200 dark:hover:to-slate-400 dark:disabled:from-zinc-800 dark:disabled:to-zinc-700 dark:disabled:text-zinc-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Extracting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Extract Recipe
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Recipe Display */}
        {recipe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl dark:shadow-zinc-950/50 overflow-hidden">
              <RecipeViewer recipe={recipe} />
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

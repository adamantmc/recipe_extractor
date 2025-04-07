'use client'

import { useState, useEffect } from 'react';
import { getCurrentPrompt } from './backend/prompts';
import { RecipeViewer } from './components/RecipeViewer';
import { parseRecipeFromWebpage } from './backend/html_parser';
import { extractRecipe, loadSchemas } from './backend/recipe_extractor';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load schemas when the app starts
    const loadSchemasAsync = async () => {
      try {
        await loadSchemas();
      } catch (err) {
        console.error('Error loading schemas:', err);
      }
    };
    void loadSchemasAsync();
  }, []);

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
    <main className="flex flex-col gap-8 items-center font-[family-name:var(--font-geist-sans)] max-w-2xl mx-auto w-full min-h-screen py-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Recipe Extractor
      </h1>

      {/* URL Input Section */}
      <div className="flex gap-4 w-full">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a recipe URL here and click `Extract`"
          className="flex-1 p-3 border dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          onClick={onExtractButtonClick}
          disabled={isLoading || !url}
          className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              Extract
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Recipe Display */}
      {recipe && (
        <div className="w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg dark:shadow-zinc-950/50 overflow-hidden">
          <RecipeViewer recipe={recipe} />
        </div>
      )}
    </main>
  );
}

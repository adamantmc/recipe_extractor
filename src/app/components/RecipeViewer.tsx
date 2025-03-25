import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

interface Recipe {
    title?: string;
    duration?: string;
    ingredients?: string[];
    steps?: string[];
    notes?: string[];
}

interface RecipeViewerProps {
    recipe: Recipe;
}

export function RecipeViewer({ recipe }: RecipeViewerProps) {
    const recipeRef = useRef<HTMLDivElement>(null);

    const downloadAsImage = async () => {
        if (!recipeRef.current) return;

        try {
            const dataUrl = await toPng(recipeRef.current, {
                quality: 1.0,
                backgroundColor: document.documentElement.classList.contains('dark') ? '#09090b' : '#ffffff'
            });

            const link = document.createElement('a');
            link.download = `${recipe.title || 'recipe'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Error generating image:', err);
        }
    };

    if (!recipe) {
        return <div className="p-6 text-gray-500">No recipe data available</div>;
    }

    return (
        <div className="relative">
            <button
                onClick={downloadAsImage}
                className="absolute top-4 right-4 px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </button>
            <div ref={recipeRef} className="p-6 space-y-6 bg-white dark:bg-zinc-900 rounded-lg">
                {/* Title */}
                <div className="border-b dark:border-zinc-700 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{recipe.title}</h2>
                </div>

                {/* Duration */}
                {recipe.duration && (
                    <div className="text-gray-600 dark:text-gray-300 flex items-center">
                        <span className="mr-2">⏱️</span>
                        {recipe.duration}
                    </div>
                )}

                {/* Ingredients */}
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ingredients</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="text-base">{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Steps */}
                {recipe.steps && recipe.steps.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Instructions</h3>
                        <ol className="list-decimal pl-5 space-y-3 text-gray-700 dark:text-gray-300">
                            {recipe.steps.map((step, index) => (
                                <li key={index} className="text-base">{step}</li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Notes */}
                {recipe.notes && recipe.notes.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notes</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                            {recipe.notes.map((note, index) => (
                                <li key={index} className="text-base">{note}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
} 
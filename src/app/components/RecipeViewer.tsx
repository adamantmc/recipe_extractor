import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { motion } from 'framer-motion';

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
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadAsImage}
                className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-lg hover:from-slate-800 hover:to-slate-600 dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-slate-200 dark:hover:to-slate-400 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Download
            </motion.button>

            <div ref={recipeRef} className="p-8 space-y-8">
                {/* Title */}
                <div className="border-b dark:border-zinc-700 pb-6">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400">
                        {recipe.title}
                    </h2>
                </div>

                {/* Duration */}
                {recipe.duration && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{recipe.duration}</span>
                    </motion.div>
                )}

                {/* Ingredients */}
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Ingredients
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {recipe.ingredients.map((ingredient, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg"
                                >
                                    <span className="text-slate-500 dark:text-slate-400">•</span>
                                    <span>{ingredient}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* Steps */}
                {recipe.steps && recipe.steps.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Instructions
                        </h3>
                        <ol className="space-y-4">
                            {recipe.steps.map((step, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                                    className="flex gap-4 text-gray-700 dark:text-gray-300"
                                >
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-full dark:bg-slate-100 dark:text-slate-900 font-medium">
                                        {index + 1}
                                    </span>
                                    <span className="pt-1">{step}</span>
                                </motion.li>
                            ))}
                        </ol>
                    </motion.div>
                )}

                {/* Notes */}
                {recipe.notes && recipe.notes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            Notes
                        </h3>
                        <ul className="space-y-3">
                            {recipe.notes.map((note, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg"
                                >
                                    <svg className="w-5 h-5 text-slate-500 dark:text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{note}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>
        </div>
    );
} 
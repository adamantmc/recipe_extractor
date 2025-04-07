'use server'
import { promises as fs } from 'fs';
import path from 'path';
import { getCurrentPrompt } from './prompts';
import LlamaClient from './llm/llama_client';
import GeminiClient from './llm/gemini_client';
import { AbstractLLMClient } from './llm/abstract_llm_client';

const SECTIONS = ["Title", "Duration", "Ingredients", "Steps", "Notes"]

type ModelType = 'llama' | 'gemini';

class RecipeExtractor {
    private llmClient: AbstractLLMClient;
    private modelType: ModelType;
    private schemas: Record<ModelType, object>;

    constructor(modelType: ModelType = 'gemini') {
        this.modelType = modelType;
        this.schemas = {
            llama: {},
            gemini: {}
        };
        this.llmClient = this.createLLMClient();
    }

    private createLLMClient(): AbstractLLMClient {
        switch (this.modelType) {
            case 'llama':
                return new LlamaClient();
            case 'gemini':
                return new GeminiClient();
            default:
                throw new Error(`Unsupported model type: ${this.modelType}`);
        }
    }

    async setModelType(modelType: ModelType) {
        this.modelType = modelType;
        this.llmClient = this.createLLMClient();
        // Set the current prompt for the new client
        const currentPrompt = await getCurrentPrompt();
        this.llmClient.setPrompt(currentPrompt.prompt);
    }

    async setPrompt(prompt: string) {
        this.llmClient.setPrompt(prompt);
    }

    async loadSchemas() {
        try {
            const llamaSchema = await fs.readFile(
                path.join(process.cwd(), 'src/app/backend/schemas/llama.json'),
                'utf-8'
            );
            const geminiSchema = await fs.readFile(
                path.join(process.cwd(), 'src/app/backend/schemas/gemini.json'),
                'utf-8'
            );
            this.schemas = {
                llama: JSON.parse(llamaSchema),
                gemini: JSON.parse(geminiSchema)
            };
        } catch (error) {
            console.error('Error loading schemas:', error);
        }
    }

    async extractRecipe(recipe: string) {
        return this.llmClient.generateContent(recipe, this.schemas[this.modelType]);
    }
}

// Create a singleton instance
const recipeExtractor = new RecipeExtractor();

// Export only async functions
export async function setExtractorModel(modelType: ModelType) {
    return recipeExtractor.setModelType(modelType);
}

export async function setExtractorPrompt(prompt: string) {
    return recipeExtractor.setPrompt(prompt);
}

export async function extractRecipe(recipe: string) {
    return recipeExtractor.extractRecipe(recipe);
}

export async function loadSchemas() {
    return recipeExtractor.loadSchemas();
}

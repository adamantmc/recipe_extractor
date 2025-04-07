'use server'
import { getCurrentPrompt } from './prompts';
import LlamaClient from './llm/llama_client';
import GeminiClient from './llm/gemini_client';
import { AbstractLLMClient } from './llm/abstract_llm_client';
import { GEMINI_SCHEMA } from './schemas/gemini';
import { LLAMA_SCHEMA } from './schemas/llama';


type ModelType = 'llama' | 'gemini';
const SCHEMAS = { llama: LLAMA_SCHEMA, gemini: GEMINI_SCHEMA }

class RecipeExtractor {
    private llmClient: AbstractLLMClient;
    private modelType: ModelType;

    constructor(modelType: ModelType = 'gemini') {
        this.modelType = modelType;
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

    async extractRecipe(recipe: string) {
        console.log("Extracting recipe using", this.modelType);
        return this.llmClient.generateContent(recipe, SCHEMAS[this.modelType]);
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

'use server'
import { promises as fs } from 'fs';
import { getCurrentPrompt } from './prompts';

const SECTIONS = ["Title", "Duration", "Ingredients", "Steps", "Notes"]

class RecipeExtractor {
    prompt: string;
    schema: object | null;

    constructor(schema: object | null = null) {
        this.prompt = "";
        this.schema = schema;
    }

    async setPrompt(prompt: string) {
        this.prompt = prompt;
    }

    async extractRecipe(recipe: string) {
        const url = "http://localhost:11434/api/generate";

        const payload = { "model": "llama3", "prompt": this.prompt + "\n" + recipe, "stream": false, "format": this.schema };

        console.log(payload);

        const response = await fetch(url, { method: "POST", body: JSON.stringify(payload) });

        if (!response.ok) {
            return { "error": "Failed to talk with Ollama server" };
        }

        return response.json();
    }

}

const recipeExtractor = new RecipeExtractor(
    JSON.parse(await fs.readFile(process.cwd() + "/src/static/response_format.json", "utf-8")),
);

export async function extractRecipe(recipe: string) {
    return recipeExtractor.extractRecipe(recipe);
}

export async function setExtractorPrompt(prompt: string) {
    recipeExtractor.setPrompt(prompt);
}

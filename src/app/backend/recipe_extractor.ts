'use server'
import { promises as fs } from 'fs';


class RecipeExtractor {
    prompt: string;

    constructor(prompt: string) {
        this.prompt = prompt;
    }

    async extractRecipe(recipe: string) {
        const url = "http://localhost:11434/api/generate";

        const payload = {"model": "llama3", "prompt": this.prompt + "\n" + recipe, "stream": false};
    
        const response = await fetch(url, {method: "POST", body: JSON.stringify(payload)});

        if(!response.ok) {
            return {"error": "Failed to talk with Ollama server"};
        }
    
        return response.json();    
    }
}


const recipeExtractor = new RecipeExtractor(await fs.readFile(process.cwd() + "/src/static/prompt.txt", "utf-8"));

export async function extractRecipe(recipe: string) {
    const res = await recipeExtractor.extractRecipe(recipe);
    if(res.response.toLowerCase().startsWith("no_recipe_found")) {
        return null;
    }

    return res.response;
}
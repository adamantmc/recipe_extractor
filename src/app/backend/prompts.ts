'use server'
import { promises as fs } from 'fs';
import path from 'path';
import { setExtractorPrompt } from './recipe_extractor';

export type Prompt = {
    name: string
    prompt: string
}

class PromptHandler {
    private prompts: Prompt[];
    private currentPrompt: string;
    private readonly promptsPath: string;

    constructor() {
        this.prompts = [];
        this.currentPrompt = "Default";
        this.promptsPath = path.join(process.cwd(), 'src/static/prompts.json');
    }

    private async loadPrompts() {
        try {
            const data = await fs.readFile(this.promptsPath, 'utf-8');
            const jsonData = JSON.parse(data);
            this.prompts = jsonData.prompts;
            this.currentPrompt = jsonData.currentPrompt;
        } catch (error) {
            console.error('Error loading prompts:', error);
            // Initialize with default prompt if file doesn't exist
            this.prompts = [{
                name: "Default",
                prompt: "You are a helpful assistant that extracts recipe information from text. Please analyze the following text and extract the recipe details in a structured format."
            }];
            this.currentPrompt = "Default";
            await this.savePrompts();
        }
    }

    private async savePrompts() {
        try {
            await fs.writeFile(
                this.promptsPath,
                JSON.stringify({
                    prompts: this.prompts,
                    currentPrompt: this.currentPrompt
                }, null, 4)
            );
        } catch (error) {
            console.error('Error saving prompts:', error);
        }
    }

    async listPrompts() {
        await this.loadPrompts();
        return this.prompts;
    }

    async getCurrentPrompt() {
        await this.loadPrompts();
        const prompt = this.prompts.find(p => p.name === this.currentPrompt);
        return prompt || this.prompts[0];
    }

    async setCurrentPrompt(name: string): Promise<boolean> {
        await this.loadPrompts();
        for (const p of this.prompts) {
            if (p.name === name) {
                this.currentPrompt = name;
                await this.savePrompts();
                setExtractorPrompt(p.prompt);
                return true;
            }
        }
        return false;
    }

    async addPrompt(name: string, prompt: string): Promise<boolean> {
        await this.loadPrompts();
        if (!this.prompts.some(p => p.name === name)) {
            this.prompts.push({ name, prompt });
            await this.savePrompts();
            return true;
        }
        return false;
    }
}

const promptHandler = new PromptHandler();

// Set initial prompt
setExtractorPrompt((await promptHandler.getCurrentPrompt()).prompt);

export async function listPrompts() {
    return promptHandler.listPrompts();
}

export async function getCurrentPrompt() {
    return promptHandler.getCurrentPrompt();
}

export async function setCurrentPrompt(name: string): Promise<boolean> {
    return promptHandler.setCurrentPrompt(name);
}

export async function addPrompt(name: string, prompt: string): Promise<boolean> {
    return promptHandler.addPrompt(name, prompt);
}

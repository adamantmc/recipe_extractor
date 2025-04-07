'use server'

interface LLMResponse {
    response: string;
    error?: string;
}

abstract class AbstractLLMClient {
    protected prompt: string;

    constructor() {
        this.prompt = "";
    }

    setPrompt(prompt: string): void {
        this.prompt = prompt;
    }

    abstract generateContent(text: string, schema?: object): Promise<LLMResponse>;
}

export { AbstractLLMClient, type LLMResponse };
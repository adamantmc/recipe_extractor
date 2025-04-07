'use server'

import { AbstractLLMClient, LLMResponse } from './abstract_llm_client';

class LlamaClient extends AbstractLLMClient {
    private readonly url: string;

    constructor() {
        super();
        this.url = "http://localhost:11434/api/generate";
    }

    async generateContent(text: string, schema?: object): Promise<LLMResponse> {
        const payload = {
            "model": "llama3",
            "prompt": this.prompt + "\n" + text,
            "stream": false,
            "format": schema
        };

        const response = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            return { response: "", error: "Failed to talk with Ollama server" };
        }

        const data = await response.json();
        return { response: data.response };
    }
}

export default LlamaClient;
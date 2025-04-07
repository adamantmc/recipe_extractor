'use server'

import { GoogleGenerativeAI, GenerateContentRequest, Schema } from '@google/generative-ai';
import { AbstractLLMClient, LLMResponse } from './abstract_llm_client';

class GeminiClient extends AbstractLLMClient {
    private readonly model;

    constructor() {
        super();
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        this.model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    }

    async generateContent(text: string, schema?: Schema): Promise<LLMResponse> {
        try {
            const request: GenerateContentRequest = {
                contents: [{ role: "user", parts: [{ text: this.prompt + "\n" + text }] }],
                generationConfig: schema ? {
                    responseMimeType: 'application/json',
                    responseSchema: schema
                } : undefined
            };
            const result = await this.model.generateContent(request);
            const response = await result.response;
            const responseText = response.text();

            return { response: responseText };
        } catch (error) {
            console.error('Error generating content with Gemini:', error);
            return { response: "", error: 'Failed to generate content with Gemini' };
        }
    }
}

export default GeminiClient;
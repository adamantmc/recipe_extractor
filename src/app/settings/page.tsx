'use client'

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react";
import { listPrompts, getCurrentPrompt, setCurrentPrompt as setCurrentPromptBackend, addPrompt, Prompt } from "../backend/prompts";
import { setExtractorModel, loadSchemas } from "../backend/recipe_extractor";

function PromptSettings() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [currentPrompt, setCurrentPromptState] = useState<Prompt | null>(null);
    const [newPromptName, setNewPromptName] = useState("");
    const [newPromptText, setNewPromptText] = useState("");
    const [selectedPromptName, setSelectedPromptName] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<'llama' | 'gemini'>('llama');

    useEffect(() => {
        loadPrompts();
    }, []);

    const loadPrompts = async () => {
        try {
            const [promptsList, current] = await Promise.all([
                listPrompts(),
                getCurrentPrompt()
            ]);
            setPrompts(promptsList);
            setCurrentPromptState(current);
            setSelectedPromptName(current.name);
        } catch (error) {
            console.error('Error loading prompts:', error);
        }
    };

    const handlePromptSelect = async (name: string) => {
        try {
            setSelectedPromptName(name);
            const success = await setCurrentPromptBackend(name);
            if (success) {
                const newCurrent = await getCurrentPrompt();
                if (newCurrent) {
                    setCurrentPromptState(newCurrent);
                }
            } else {
                // If setting the prompt failed, revert the selection
                setSelectedPromptName(currentPrompt?.name || "");
            }
        } catch (error) {
            console.error('Error selecting prompt:', error);
            setSelectedPromptName(currentPrompt?.name || "");
        }
    };

    const handleModelSelect = async (model: 'llama' | 'gemini') => {
        try {
            setSelectedModel(model);
            await setExtractorModel(model);
            await loadSchemas();
        } catch (error) {
            console.error('Error selecting model:', error);
            setSelectedModel('llama'); // Revert on error
        }
    };

    const handleAddPrompt = async () => {
        if (newPromptName && newPromptText) {
            try {
                const success = await addPrompt(newPromptName, newPromptText);
                if (success) {
                    setNewPromptName("");
                    setNewPromptText("");
                    await loadPrompts();
                }
            } catch (error) {
                console.error('Error adding prompt:', error);
            }
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Select Model</h3>
                <Select
                    value={selectedModel}
                    onValueChange={(value: 'llama' | 'gemini') => {
                        void handleModelSelect(value);
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Models</SelectLabel>
                            <SelectItem value="llama">Olamma (Local)</SelectItem>
                            <SelectItem value="gemini">Gemini Pro</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Select Prompt</h3>
                <Select
                    value={selectedPromptName}
                    onValueChange={(value: string) => {
                        void handlePromptSelect(value);
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a prompt" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Prompts</SelectLabel>
                            {prompts.map(item => (
                                <SelectItem key={item.name} value={item.name}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Add New Prompt</h3>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Prompt Name"
                        value={newPromptName}
                        onChange={(e) => setNewPromptName(e.target.value)}
                        className="w-full p-2 border rounded bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 dark:focus:ring-neutral-300 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                    />
                    <textarea
                        placeholder="Prompt Text"
                        value={newPromptText}
                        onChange={(e) => setNewPromptText(e.target.value)}
                        className="w-full p-2 border rounded h-32 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 dark:focus:ring-neutral-300 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                    />
                    <Button onClick={() => void handleAddPrompt()}>Add Prompt</Button>
                </div>
            </div>

            {currentPrompt && (
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Current Prompt</h3>
                    <div className="p-4 bg-gray-100 dark:bg-zinc-800 rounded">
                        <p className="font-medium">{currentPrompt.name}</p>
                        <p className="mt-2 text-sm">{currentPrompt.prompt}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PromptSettings;

'use client'

import { Textarea } from "@/app/components/textarea";
import { Button } from "@/app/components/button";
import { extractRecipe } from "./backend/recipe_extractor";
import { useState } from "react";
import { Skeleton } from "./components/skeleton";



export default function Home() {
  const [text, setText] = useState<string>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<string>();

  function onExtractButtonClick(text: string | undefined) {
    if (text === undefined) {
      return "";
    }
    setDisabled(true);
    extractRecipe(text).then(recipe => setRecipe(recipe)).finally(() => setDisabled(false));
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Recipe Extractor
        </h1>

        <Textarea disabled={disabled} placeholder="Paste a recipe URL here and click `Extract`" value={text} onChange={e => setText(e.target.value)}></Textarea>
        <Button disabled={disabled} variant="outline" onClick={() => onExtractButtonClick(text)}>Extract</Button>
        {disabled ? <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-slate-400" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-slate-400" />
            <Skeleton className="h-4 w-[200px] bg-slate-400" />
          </div>
        </div> : ""}
        {recipe ? <pre>{recipe}</pre> : ""}
      </main>
    </div>
  );
}

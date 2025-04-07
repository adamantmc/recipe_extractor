"use client"

import { GearIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button";

const TopBar = ({ onSettingsClick, onThemeClick }: { onSettingsClick: () => void, onThemeClick: () => void }) => {
    return (
        <div className="w-full h-10 flex flex-row justify-between items-center px-8 py-8">
            <div className="text-gray-900 dark:text-white">
                <a
                    href="https://github.com/adamantmc/recipe_extractor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <span className="relative">
                        adamantmc/recipe_extractor
                        <span className="absolute -bottom-1 left-0 w-full h-px bg-slate-300 dark:bg-slate-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </span>
                </a>
            </div>
            <div className="flex flex-row gap-4">
                <Button variant="ghost" size="icon" onClick={onSettingsClick}>
                    <GearIcon style={{ width: "1.8em", height: "1.8em" }} />
                </Button>

                <Button variant="ghost" size="icon" onClick={onThemeClick}>
                    <SunIcon className="dark:hidden" style={{ width: "1.8em", height: "1.8em" }} />
                    <MoonIcon className="hidden dark:block" style={{ width: "1.8em", height: "1.8em" }} />
                </Button>
            </div>
        </div>
    );
};

export default TopBar;

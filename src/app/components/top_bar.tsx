"use client"

import { useState } from "react";
import { GearIcon, GitHubLogoIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons"
import * as Separator from "@radix-ui/react-separator";
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"

const TopBar = ({ onSettingsClick, onThemeClick }: { onSettingsClick: () => void, onThemeClick: () => void }) => {
    return (
        <div className="w-full h-10 flex flex-row justify-between items-center px-8 py-8">
            <div className="text-gray-900 dark:text-white">
                Recipe Extractor
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

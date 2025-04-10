'use client'

import { useState } from 'react';
import localFont from "next/font/local";
import "./globals.css";
import TopBar from "./components/top_bar";
import Settings from './settings/page';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <html lang="en" className={isDarkTheme ? 'dark' : ''}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950 text-gray-900 dark:text-white`}
      >
        <TopBar onSettingsClick={() => setIsSettingsOpen(true)} onThemeClick={toggleTheme} />
        <div className="pt-16">
          {children}
        </div>

        {/* Settings Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg dark:shadow-zinc-800/30 transition-colors duration-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Settings />
            </div>
          </div>
        )}
      </body>
    </html>
  );
}

'use server'
import * as cheerio from 'cheerio';

async function fetchWebpage(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    return null;
  }

  return response.text();
}


export async function parseRecipeFromWebpage(url: string) {
  const webpageText: string | null = await fetchWebpage(url);

  const promise: Promise<string> = new Promise(function (resolve, reject) {
    if (webpageText === null) reject(Error("Failed to fetch content from " + url));
    else {
      const parsed = cheerio.load(webpageText);
      const bodyText = parsed("body").text();
      if (bodyText.length === 0) reject(Error("Failed to extract content from " + url));
      else resolve(bodyText);
    }
  })

  return promise;
}

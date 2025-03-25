'use server'
import { parse } from 'node-html-parser';


async function fetchWebpage(url: string) {
  let response = await fetch(url);

  if (!response.ok) {
    return null;
  }

  return response.text();
}


export async function parseRecipeFromWebpage(url: string) {
  let webpageText: string | null = await fetchWebpage(url);

  let conf = {
    lowerCaseTagName: false,		// convert tag name to lower case (hurts performance heavily)
    comment: false,           		// retrieve comments (hurts performance slightly)
    fixNestedATags: false,    		// fix invalid nested <a> HTML tags 
    parseNoneClosedTags: false, 	// close none closed HTML tags instead of removing them 
    voidTag: {
      tags: ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'],	// optional and case insensitive, default value is ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']
      closingSlash: true	// optional, default false. void tag serialisation, add a final slash <br/>
    },
    blockTextElements: {
      script: false,		// keep text content when parsing
      noscript: false,		// keep text content when parsing
      style: false,		// keep text content when parsing
      pre: true			// keep text content when parsing
    }
  }

  const promise: Promise<string> = new Promise(function (resolve, reject) {
    if (webpageText === null) reject();
    else {
      let parsed = parse(webpageText, conf);

      const body = parsed.querySelector("body");

      if (body == null) reject(null);
      else resolve(body.innerText);
    }
  })

  return promise;
}

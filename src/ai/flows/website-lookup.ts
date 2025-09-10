// This file uses server-side code.
'use server';

/**
 * @fileOverview A flow that takes a list of company names and a location,
 * and uses the Gemini API to find the website URLs for each company.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import json5 from 'json5';
import { GoogleGenerativeAIError } from '@google/generative-ai';

const CompanyWebsiteSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  websiteUrl: z
    .string()
    .describe(
      'The website URL of the company. If a URL cannot be found, this should be an empty string.'
    ),
});
export type WebsiteLookupOutput = z.infer<typeof CompanyWebsiteSchema>;

const WebsiteLookupInputSchema = z.object({
  companyNames: z.string().describe('A list of company names, one per line.'),
  location: z
    .string()
    .describe('The location to search for the companies in.'),
  apiKey: z.string().optional().describe('The Gemini API key to use.'),
});
export type WebsiteLookupInput = z.infer<typeof WebsiteLookupInputSchema>;

export async function websiteLookup(
  input: WebsiteLookupInput
): Promise<WebsiteLookupOutput[]> {
  try {
    const response = await ai.generate({
      model: 'gemini-1.5-flash-latest',
      prompt: `For each of the following company names, find the official website URL. The search should be localized to '${input.location}'.

Companies:
${input.companyNames}

Return the results as a valid JSON array of objects, where each object has two keys: "companyName" and "websiteUrl". If a website cannot be found for a company, the "websiteUrl" should be an empty string.
Do not include any text outside of the JSON array.`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text;
    const parsed = json5.parse<WebsiteLookupOutput[]>(jsonText);
    return parsed;
  } catch (error: any) {
    if (error instanceof GoogleGenerativeAIError && error.status === 429) {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    throw error;
  }
}

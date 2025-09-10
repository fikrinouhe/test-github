import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// This is the default global plugin configuration.
// It is used when no specific plugin is passed to a generation call.
export const ai = genkit({
  plugins: [googleAI()],
});

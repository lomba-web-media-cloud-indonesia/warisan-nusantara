import { OpenRouter } from "@openrouter/sdk";

// Initialize OpenRouter client
const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY
});

export default openrouter;
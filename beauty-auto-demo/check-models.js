const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // Just try to list models if possible, but the SDK doesn't have a direct listModels on the client instance easily without using the model manager which is server side usually?
        // Actually the SDK has no direct listModels method exposed on the main class in some versions.
        // Let's try to just run a simple text generation with 1.5-flash to see if it works without image.

        console.log("Testing gemini-pro with text only...");
        const result = await model.generateContent("Hello");
        console.log("Success! Response:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-pro:", error.message);
    }
}

main();

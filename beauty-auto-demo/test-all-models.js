const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

const modelsToTest = [
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash-image-preview",
    "gemini-2.5-flash-image",
    "gemini-2.5-flash-preview-09-2025"
];

// 1x1 pixel transparent GIF base64
const dummyImageBase64 = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

async function testModel(modelName) {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    console.log(`Testing model: ${modelName}...`);

    try {
        const result = await model.generateContent([
            "Describe this image in one word.",
            {
                inlineData: {
                    data: dummyImageBase64,
                    mimeType: "image/gif",
                },
            },
        ]);
        const response = await result.response;
        const text = response.text();
        console.log(`✅ SUCCESS: ${modelName} worked! Response: ${text}`);
        return true;
    } catch (error) {
        console.log(`❌ FAILED: ${modelName}`);
        console.log("Error details:", JSON.stringify(error, null, 2));
        console.log("Error message:", error.message);
        return false;
    }
}

async function main() {
    console.log("Starting detailed model testing...");

    for (const modelName of modelsToTest) {
        const success = await testModel(modelName);
        if (success) {
            console.log(`\n🎉 FOUND WORKING MODEL: ${modelName}`);
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log("\n⚠️ ALL MODELS FAILED.");
}

main();

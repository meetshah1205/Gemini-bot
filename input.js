import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const geminiAPIKey = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
const model = geminiAPIKey.getGenerativeModel({ model: "gemini-1.5-flash" });

// Flag to check if it's the first prompt
let isFirstPrompt = true;

// Helper function to clean up the text by removing markdown formatting
const cleanText = (text) => {
    // Remove markdown-style formatting like **bold**, *italic*, and links
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1')  // remove **bold**
        .replace(/\*(.*?)\*/g, '$1')      // remove *italic*
        .replace(/\[.*?\]\(.*?\)/g, '')    // remove links like [text](url)
        .replace(/`(.*?)`/g, '$1')         // remove inline code (`code`)
        .replace(/\n+/g, '\n')             // remove extra newlines
        .trim();                          // trim leading/trailing spaces
};

export const askQuestion = async () => {
    // Print the initial prompt only once
    if (isFirstPrompt) {
        console.log("Hey there! How can I help you today?");
        isFirstPrompt = false; // Set the flag to false after the first prompt
    }

    rl.question("", async (input) => {
        try {
            // Generate content using the model
            const result = await model.generateContent(input);

            // Get the generated text directly and clean it up
            const generatedText = await result.response.text();
            const cleanedText = cleanText(generatedText);

            // Print only the cleaned response
            console.log(cleanedText);

            // Check if the AI suggests quitting based on the response
            if (cleanedText.toLowerCase().includes("goodbye") || cleanedText.toLowerCase().includes("bye") || cleanedText.toLowerCase().includes("exit")) {
                console.log("Goodbye! Have a great day!");
                rl.close(); // Close the readline interface and exit
                return;
            }

        } catch (error) {
            console.error("Error generating response:", error);
        }

        // Ask again after generating the response
        askQuestion();
    });
};

askQuestion();

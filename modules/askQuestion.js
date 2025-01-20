const readline = require("readline");
const generateResponse = require("./generateResponse");
const cleanText = require("./cleanText");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Flag to check if it's the first prompt
let isFirstPrompt = true;

const askQuestion = async () => {
    // Print the initial prompt only once
    if (isFirstPrompt) {
        console.log("Hey there! How can I help you today?");
        isFirstPrompt = false; // Set the flag to false after the first prompt
    }

    rl.question("", async (input) => {
        // Generate the response
        const generatedText = await generateResponse(input);

        if (!generatedText) {
            console.log("Something went wrong, try again.");
            return askQuestion(); // Retry if the response is null
        }

        // Clean the generated response
        const cleanedText = cleanText(generatedText);

        // Print only the cleaned response
        console.log(cleanedText);

        // Check if the AI suggests quitting based on the response
        if (cleanedText.toLowerCase().includes("goodbye") || cleanedText.toLowerCase().includes("bye") || cleanedText.toLowerCase().includes("exit")) {
            console.log("Goodbye! Have a great day!");
            rl.close(); // Close the readline interface and exit
            return;
        }

        // Ask again after generating the response
        askQuestion();
    });
};

module.exports = askQuestion;

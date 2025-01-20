const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiAPIKey = new GoogleGenerativeAI("AIzaSyCHDCh7nvp4A76ilWZDHtXFL9msTxt_-ac");
const model = geminiAPIKey.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateResponse = async (input) => {
    try {
        // Generate content using the model
        const result = await model.generateContent(input);
        const generatedText = await result.response.text();
        return generatedText;
    } catch (error) {
        console.error("Error generating response:", error);
        return null;
    }
};

module.exports = generateResponse;

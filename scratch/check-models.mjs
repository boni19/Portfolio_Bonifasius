import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function list() {
  try {
    const result = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent("Hi");
    console.log("Success with gemini-1.5-flash:", result.response.text());
  } catch (e) {
    console.log("Failed with gemini-1.5-flash, trying to list models...");
    // The SDK doesn't have a direct listModels, but we can try another one
    try {
        const result2 = await genAI.getGenerativeModel({ model: "gemini-pro" }).generateContent("Hi");
        console.log("Success with gemini-pro:", result2.response.text());
    } catch (e2) {
        console.error("All failed. Error:", e2.message);
    }
  }
}

list();

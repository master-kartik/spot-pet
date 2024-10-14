import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a skilled pet matchmaker with expertise in music psychology and animal behavior. Your task is to analyze the following music genres: ${genres}, and suggest a unique perfectly suited pet name and breed based on this musical profile.",
});

interface GenerationConfig {
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
  responseMimeType: string;
  responseSchema: {
    type: string;
    properties: {
      pet: { type: string };
      breed: { type: string };
      reasoning: { type: string };
    };
  };
}

const generationConfig: GenerationConfig = {
  temperature: 1.5,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1024,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    properties: {
      pet: { type: "string" },
      breed: { type: "string" },
      reasoning: { type: "string" },
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 

    const { genres } = body;
    // console.log("genres,", genres)
    const prompt = `You are a skilled pet matchmaker with expertise in music psychology and animal behavior. Your task is to analyze the following music genres: ${genres}, and suggest a unique perfectly suited pet name and breed based on this musical profile.

Step 1: Genre Analysis
- Conduct a thorough analysis of the provided genres.
- The first 10 generes hold the most importance and are core music taste
- Identify key themes, emotions, and cultural associations within each genre.
- Create a psychological profile of the potential pet owner based on their musical tastes.

Step 2: Pet Selection
- Based on your analysis, determine the most suitable pet type (e.g., mammal, dog, cat, bird, reptile) that aligns with the musical profile.
- Consider factors such as energy levels, social needs, and lifestyle implications associated with the genres.
- Make sure the pets you suggest can be of any variety like cat, dog, bird, fish, horse, turtle, snake etc.
- The pets should be unique and should not be very common

Step 3: Breed Selection
- Choose a specific breed that best matches the music profile and pet type from the top 300 most common pets, using psychology profile.
- Consider unique characteristics of the breed that resonate with the musical genres.
- Make sure the pets you suggest can be of any variety like cat, dog, bird, fish, horse, turtle, snake etc.
- The pets should be unique and should not be very common

Step 4: Justification
- Provide a concise yet compelling explanation (2-4 lines) for your pet, breed
- Draw clear connections between the musical preferences and the suggested pet.

Strict json Output Format:
{
pet : [specific class(like dog, bird, cat) along with its breed],
resoning: [specific reason on why and on based on what genres strictly under 100 words at max]
}
Before finalizing your suggestion, critically evaluate your choices. Ensure they truly capture the spirit of the music genres and would resonate with the potential pet owner. If necessary, refine your selection to achieve the most harmonious match between music taste and pet companionship. And nevery respond without this given json format, it should be stricly in this json format no matter what`;
    // console.log(prompt, "prompt")
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const chatSession = model.startChat({
      generationConfig,
      history: []
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response)

    return NextResponse.json(result.response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed response' }, { status: 500 });
  }
}

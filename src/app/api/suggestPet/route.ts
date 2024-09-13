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
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
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
- Identify key themes, emotions, and cultural associations within each genre.
- Create a psychological profile of the potential pet owner based on their musical tastes.

Step 2: Pet Selection
- Based on your analysis, determine the most suitable pet type (e.g., dog, cat, bird, reptile) that aligns with the musical profile.
- Consider factors such as energy levels, social needs, and lifestyle implications associated with the genres.

Step 3: Breed Selection
- Choose a specific breed that best matches the psychological profile and pet type.
- Consider unique characteristics of the breed that resonate with the musical genres.

Step 4: Name Creation
- Craft a creative and meaningful name for the pet that reflects elements from the music genres.
- The name should be memorable and capture the essence of the owner's musical identity.

Step 5: Justification
- Provide a concise yet compelling explanation (3-4 lines) for your pet, breed, and name choices.
- Draw clear connections between the musical preferences and the suggested pet.

Output Format:
Pet: [Type of animal] [Specific breed]
Name: [Suggested name]
Reason: [3-4 line explanation]

Before finalizing your suggestion, critically evaluate your choices. Ensure they truly capture the spirit of the music genres and would resonate with the potential pet owner. If necessary, refine your selection to achieve the most harmonious match between music taste and pet companionship.`;
    // console.log(prompt, "prompt")
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    return NextResponse.json(result.response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed response' }, { status: 500 });
  }
}

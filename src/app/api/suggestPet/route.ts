import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "act as a professional pet suggestion person with a deep understanding of music, human, and animal psychology.",
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
  temperature: 2,
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
    const body = await req.json(); // Parse the JSON body
    const { prompt } = body;

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

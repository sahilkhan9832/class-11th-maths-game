import { GoogleGenAI, Type } from "@google/genai";
import { Question } from '../types';
import { TOTAL_QUESTIONS } from '../constants';

const quizSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      description: `An array of ${TOTAL_QUESTIONS} quiz questions.`,
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "The question text.",
          },
          options: {
            type: Type.ARRAY,
            description: "An array of 4 multiple-choice options.",
            items: {
              type: Type.STRING,
            },
          },
          answer: {
            type: Type.STRING,
            description: "The correct answer, which must be one of the provided options.",
          },
        },
        required: ["question", "options", "answer"],
      },
    },
  },
  required: ["questions"],
};


export const generateQuizQuestions = async (topic: string): Promise<Question[]> => {
  // API Key is handled by the environment variable process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Generate ${TOTAL_QUESTIONS} multiple-choice questions for a Class 11th Maths student on the topic of "${topic}". Each question should have 4 options. Ensure the answer is one of the options.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString) as { questions: Question[] };
    
    if (!parsedResponse.questions || parsedResponse.questions.length === 0) {
        throw new Error("AI failed to generate questions in the expected format.");
    }

    // Basic validation
    return parsedResponse.questions.filter(q => 
        q.question && 
        q.options && 
        q.options.length === 4 && 
        q.answer && 
        q.options.includes(q.answer)
    );

  } catch (error) {
    console.error("Error generating quiz questions:", error);
    if (error instanceof Error && error.message.includes('API key')) {
        throw new Error("Failed to connect to the AI service due to an API key issue.");
    }
    throw new Error("Failed to generate quiz questions. Please try again.");
  }
};
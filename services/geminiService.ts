import { GoogleGenAI } from "@google/genai";

// Initialize the client
// process.env.API_KEY is guaranteed to be available by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BASE_INSTRUCTION = `
You are an AI assistant for a portfolio website belonging to a creative Frontend Engineer named "FILEX".
Your persona is creative, professional, artistic, and helpful.

Here is some context about FILEX:
- Name: FILEX
- Role: Frontend Engineer & Web Designer
- Expertise: Building stunning websites, React, Tailwind CSS, UI/UX Design, Animations, Responsive Layouts.
- Speciality: "I can design and build any website you can imagine."
- Traits: Creative, pixel-perfect, visual thinker.

If a user asks about FILEX's skills, emphasize his ability to turn designs into reality code.
If asked to write code, provide high-quality frontend code (React components with Tailwind).
Keep responses concise (under 100 words).
Always refer to the engineer as "FILEX".
`;

export const sendMessageToGemini = async (message: string, language: 'en' | 'ar'): Promise<string> => {
  const languageInstruction = language === 'ar' 
    ? " IMPORTANT: The user is browsing in Arabic. You MUST reply in Arabic. Keep the tone professional yet friendly in Arabic." 
    : " The user is browsing in English. Reply in English.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: BASE_INSTRUCTION + languageInstruction,
      }
    });
    
    return response.text || (language === 'ar' ? "آسف، لا أستطيع الرد حالياً." : "I processed that, but I'm having trouble articulating a response right now.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to the AI mainframe.");
  }
};
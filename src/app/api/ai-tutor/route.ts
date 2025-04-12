import { OpenAI } from "openai";
import { NextResponse } from "next/server";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    
    // Debug logging
    console.log('AI Tutor API called');
    console.log('API Key defined:', !!process.env.OPENAI_API_KEY);
    console.log('Messages received:', JSON.stringify(messages));
    
    // Check if OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      // Fallback response for testing when API key is not available
      return NextResponse.json({ 
        message: "[DEBUG MODE] API key not set - This is a fallback response. Please configure your OpenAI API key in .env.local"
      });
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert academic tutor for college students. Your purpose is to provide accurate, relevant, and focused answers to academic questions. 
            
GUIDELINES:
1. Focus exclusively on academic content and educational topics
2. Provide specific, detailed explanations with examples when helpful
3. If the student asks about a topic outside of academics, gently redirect them to academic subjects
4. Use college-level terminology and concepts appropriate for the student's question
5. Structure your responses in a clear, organized manner
6. For math and science questions, explain step-by-step reasoning
7. For humanities questions, provide thoughtful analysis and relevant contexts
8. If you don't know something, admit it rather than guessing
9. Provide supplementary learning resources when appropriate
10. Keep responses concise but comprehensive

You specialize in subjects including: mathematics, physics, chemistry, biology, computer science, literature, history, philosophy, economics, and other standard college subjects.`
          },
          ...messages
        ],
        temperature: 0.5, // Lower temperature for more focused, deterministic responses
        max_tokens: 800, // Increased max tokens to allow for more detailed responses
      });
      
      console.log('OpenAI API response received');
      
      return NextResponse.json({ 
        message: response.choices[0].message.content 
      });
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      throw openaiError;
    }
  } catch (error: any) {
    console.error('AI Tutor error:', error);
    return NextResponse.json(
      { error: "An error occurred while processing your request", details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

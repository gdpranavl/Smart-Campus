import { OpenAI } from "openai";
import { NextResponse } from "next/server";

// Initialize the OpenAI client correctly
let openai: OpenAI;
try {
  // Ensure the key exists before initializing
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY environment variable is not set.");
    // We'll handle the error case within the POST handler
  } else {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      // Remove baseURL if sticking to OpenAI
    });
  }
} catch (error) {
  console.error("Failed to initialize OpenAI client:", error);
  // Error will be caught in POST handler if openai is undefined
}

export async function POST(request: Request) {
  try {
    // Check if client initialized successfully
    if (!openai) {
      return NextResponse.json(
        { error: "AI Tutor service not configured correctly. Missing API key?" },
        { status: 500 }
      );
    }

    // Input validation
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error("Invalid JSON in request body:", error);
      return NextResponse.json(
        { error: "Invalid request format. Please provide valid JSON." },
        { status: 400 }
      );
    }

    const { messages } = body;

    // Validate messages array
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error("Invalid or empty messages array:", messages);
      return NextResponse.json(
        { error: "Please provide a non-empty messages array." },
        { status: 400 }
      );
    }

    // Prepare the system message (optional but good practice)
    const systemMessage = {
      role: "system",
      // Use backticks for multi-line template literal
      content: `You are an expert academic tutor for college students providing educational assistance. 
        
Your purpose is to provide accurate, relevant, and focused answers to academic questions within ethical boundaries. When providing information:

- Focus on educational content
- Provide balanced perspectives
- Avoid generating harmful content
- If a question seems inappropriate, respond with helpful educational guidance instead of refusing
- Always attempt to provide some educational value in your response

Remember that you're in an educational context helping students learn.`
    };

    // Combine messages
    const completeMessages = [systemMessage, ...messages];

    try {
      // Make the API call to OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use a standard OpenAI model
        messages: completeMessages,
        temperature: 0.5,        
        max_tokens: 800,        
      });

      // Validate OpenAI response
      if (!response.choices || response.choices.length === 0 || !response.choices[0].message?.content) {
        console.error('Invalid or empty response structure from OpenAI:', response);
        throw new Error("Received an invalid response from the AI model.");
      }

      // Return the AI response content correctly
      return NextResponse.json({
        content: response.choices[0].message.content,
        role: "assistant" // Match frontend expectation
      });

    } catch (error: any) {
      console.error('Error during OpenAI API call:', error);
      
      // Provide more specific error feedback
      let errorMessage = "Failed to get response from AI model.";
      let statusCode = 500;

      if (error instanceof OpenAI.APIError) {
        errorMessage = `OpenAI API Error: ${error.message}`;
        statusCode = error.status || 500;
        if (statusCode === 401) errorMessage = "Invalid OpenAI API Key.";
        if (statusCode === 429) errorMessage = "OpenAI Rate Limit Exceeded.";
      }

      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }

  } catch (error: any) {
    // Catch-all for unexpected server errors
    console.error('Unhandled AI Tutor error:', error);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

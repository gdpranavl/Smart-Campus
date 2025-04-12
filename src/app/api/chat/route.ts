import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import OpenAI from 'openai';
import Subject from '@/models/Subject';
import Resource from '@/models/Resource';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { message, courseId, context } = await req.json();

    // Get course information and resources
    const subject = await Subject.findById(courseId).lean();
    const resources = await Resource.find({ subject: courseId })
      .sort({ createdAt: -1 })
      .lean();

    // Create a context-aware system prompt
    const systemPrompt = `You are an AI course assistant for the subject "${subject.name}" (${subject.code}). 
Your role is to help students understand course materials and concepts.

Course Description: ${subject.description}

Available Resources:
${resources.map(r => `- ${r.title} (${r.type}): ${r.description}`).join('\n')}

Guidelines:
1. Provide specific, accurate answers related to the course content
2. Reference available course resources when relevant
3. Break down complex topics into understandable parts
4. If you're unsure about something, acknowledge it and suggest consulting the instructor
5. Focus on helping students understand concepts rather than just giving answers
6. Provide examples and analogies to illustrate concepts
7. Suggest specific resources from the course materials that might help

Previous context: ${context || 'No previous context'}

Remember to maintain academic integrity and encourage proper learning practices.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

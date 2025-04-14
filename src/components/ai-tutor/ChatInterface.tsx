"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import ChatMessage from './ChatMessage';

type Message = {
  content: string;
  role: 'user' | 'assistant' | 'system';
};

// Define the type for the ref methods
export interface ChatInterfaceHandle {
  submitMessage: (message: string) => void;
}

interface ChatInterfaceProps {
  onSuggestedTopicClick?: (topic: string) => void;
}

// Sample student context - in a real app, this would come from user profile
const studentContext = {
  major: 'Computer Science',
  year: 'Third Year',
  currentCourses: [
    'Data Structures and Algorithms',
    'Database Systems',
    'Web Development',
    'Artificial Intelligence Fundamentals',
    'Operating Systems'
  ],
  academicInterests: ['Machine Learning', 'Software Engineering', 'Web Development']
};

const ChatInterface = forwardRef<ChatInterfaceHandle, ChatInterfaceProps>((props, ref) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: `The student is a ${studentContext.year} ${studentContext.major} major currently taking: ${studentContext.currentCourses.join(', ')}. Their academic interests include: ${studentContext.academicInterests.join(', ')}.`
    },
    {
      role: 'assistant',
      content: "Hello! I'm your AI academic tutor specialized in college-level subjects. How can I help you with your studies today?"
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to handle the core logic of sending a message and getting a response
  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = { role: 'user', content: messageContent };
    // Prepare the complete message list *before* the fetch call
    const updatedMessages = [...messages, userMessage];

    // Update the UI optimistically
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the prepared, updated message list
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Add AI response to chat
      const aiMessage: Message = {
        role: 'assistant',
        content: data.message || "I'm sorry, I couldn't process that request."
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      // Check error type before accessing message
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("ChatInterface Error:", error); // Log the actual error object
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I couldn't process that. Error: ${errorMessage}` // Provide clearer error feedback
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Imperative handle to allow parent component to call sendMessage
  useImperativeHandle(ref, () => ({
    submitMessage: (message: string) => {
      // Directly call the sendMessage logic
      sendMessage(message);
      // Note: We don't clear the parent's potential input state here,
      // only the internal state if the internal form is used.
    }
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Trigger scroll whenever messages change

  // Handle form submission from the internal input field
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = input.trim();
    if (!currentInput) return;

    setInput(''); // Clear input field immediately for better UX
    await sendMessage(currentInput); // Send the message
  };

  // Only show messages that are from user or assistant (not system messages)
  const visibleMessages = messages.filter(msg => msg.role === 'user' || msg.role === 'assistant');

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-indigo-600 text-white">
        <h2 className="text-xl font-semibold">AI Academic Tutor</h2>
        <p className="text-xs opacity-80">Specialized for {studentContext.major} students</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {visibleMessages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.content}
            isUser={message.role === 'user'}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100">
              {/* Loading Dots Animation */}
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
              </div>
            </div>
          </div>
        )}
        {/* Anchor for scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-600">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any academic topic..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
});

// Add display name for better debugging
ChatInterface.displayName = 'ChatInterface';

export default ChatInterface;
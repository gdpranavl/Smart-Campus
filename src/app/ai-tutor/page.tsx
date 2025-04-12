"use client";

import { useState, useRef } from 'react';
import ChatInterface from '@/components/ai-tutor/ChatInterface';

export default function AITutorPage() {
  const chatInterfaceRef = useRef<any>(null);
  
  const suggestedTopics = [
    "Explain the concept of binary search",
    "What is the difference between HTTP and HTTPS?",
    "Help me understand quadratic equations",
    "Explain the process of photosynthesis",
    "What are the key principles of object-oriented programming?"
  ];

  const handleTopicClick = (topic: string) => {
    if (chatInterfaceRef.current) {
      chatInterfaceRef.current.submitMessage(topic);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-200">AI Tutor</h1>
        <p className="mt-1 text-sm text-gray-100">
          Get personalized academic help with our AI tutor. Ask questions about any subject.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 text-gray-800 gap-6">
        <div className="lg:col-span-2">
          <ChatInterface ref={chatInterfaceRef} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggested Topics</h2>
            <ul className="space-y-2">
              {suggestedTopics.map((topic, index) => (
                <li key={index}>
                  <button 
                    className="w-full text-left px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-900 rounded-lg text-sm"
                    onClick={() => handleTopicClick(topic)}
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Tips</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                • Be specific with your questions<br />
                • Include relevant context<br />
                • Break down complex problems<br />
                • Follow up if you need clarification
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

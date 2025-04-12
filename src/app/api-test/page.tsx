"use client";

import { useState } from 'react';

export default function ApiTestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<'unknown' | 'valid' | 'invalid' | 'not-set'>('unknown');

  const testApi = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: 'Test message: What is a data structure?'
            }
          ],
        }),
      });

      const data = await response.json();
      
      if (data.message && data.message.includes('[DEBUG MODE]')) {
        setApiKeyStatus('not-set');
      } else if (data.error) {
        setApiKeyStatus('invalid');
        setResult(`Error: ${JSON.stringify(data)}`);
      } else {
        setApiKeyStatus('valid');
        setResult(data.message || 'No message received');
      }
    } catch (error) {
      setApiKeyStatus('invalid');
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">OpenAI API Test</h1>
      
      <div className="mb-6">
        <button
          onClick={testApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test OpenAI API'}
        </button>
      </div>

      {apiKeyStatus !== 'unknown' && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">API Key Status:</h2>
          <div className={`p-3 rounded ${getStatusColor(apiKeyStatus)}`}>
            {getStatusMessage(apiKeyStatus)}
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">API Response:</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{result}</pre>
        </div>
      )}
      
      <div className="mt-8 bg-yellow-50 p-4 rounded border border-yellow-200">
        <h2 className="text-lg font-semibold text-yellow-800">Troubleshooting Tips:</h2>
        <ul className="list-disc pl-5 mt-2 text-yellow-800">
          <li>Make sure you have a valid OpenAI API key in your .env.local file</li>
          <li>The key should be defined as: <code>OPENAI_API_KEY=your_key_here</code></li>
          <li>Restart the Next.js server after updating your .env.local file</li>
          <li>Check server logs for any errors related to API calls</li>
        </ul>
      </div>
    </div>
  );
}

function getStatusColor(status: 'unknown' | 'valid' | 'invalid' | 'not-set'): string {
  switch (status) {
    case 'valid':
      return 'bg-green-100 text-green-800';
    case 'invalid':
      return 'bg-red-100 text-red-800';
    case 'not-set':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusMessage(status: 'unknown' | 'valid' | 'invalid' | 'not-set'): string {
  switch (status) {
    case 'valid':
      return '✅ API Key is valid and working correctly!';
    case 'invalid':
      return '❌ API Key is invalid or there was an error communicating with OpenAI.';
    case 'not-set':
      return '⚠️ API Key is not set in your .env.local file.';
    default:
      return 'Status unknown';
  }
}

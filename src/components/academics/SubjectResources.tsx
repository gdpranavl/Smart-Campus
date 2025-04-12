'use client';

import { useState, useEffect } from 'react';

interface Resource {
  _id: string;
  title: string;
  description: string;
  type: 'note' | 'presentation' | 'video' | 'other';
  fileUrl: string;
  createdAt: string;
}

interface Props {
  subjectId: string;
}

export default function SubjectResources({ subjectId }: Props) {
  const [activeTab, setActiveTab] = useState<'notes' | 'presentations' | 'videos' | 'other'>('notes');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResources();
  }, [subjectId]);

  const fetchResources = async () => {
    try {
      const response = await fetch(`/api/resources?subject=${subjectId}`);
      const data = await response.json();
      if (response.ok) {
        setResources(data.resources);
      } else {
        setError('Failed to load resources');
      }
    } catch (error) {
      setError('Error loading resources');
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter(
    (resource) => resource.type === activeTab
  );

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="mb-6">
        <nav className="flex space-x-4">
          {(['notes', 'presentations', 'videos', 'other'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm font-medium rounded-md capitalize ${
                activeTab === tab
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div
              key={resource._id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div>
                <h4 className="font-medium text-gray-900">{resource.title}</h4>
                <p className="text-sm text-gray-500">{resource.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Added on: {new Date(resource.createdAt).toLocaleDateString()}
                </p>
              </div>
              <a
                href={resource.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Download
              </a>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No {activeTab} available
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Check back later for new resources.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

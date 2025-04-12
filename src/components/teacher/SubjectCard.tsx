'use client';

import { useState } from 'react';
import ResourceUpload from './ResourceUpload';

interface Resource {
  _id: string;
  title: string;
  type: string;
  description: string;
  fileUrl: string;
  createdAt: string;
}

interface Subject {
  _id: string;
  name: string;
  code: string;
  description: string;
  semester: number;
  resources: Resource[];
}

interface Props {
  subject: Subject;
  onUpdate: () => void;
}

export default function SubjectCard({ subject, onUpdate }: Props) {
  const [showUpload, setShowUpload] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'presentations' | 'videos' | 'other'>('notes');

  const filteredResources = subject.resources?.filter(
    (resource) => resource.type === activeTab
  ) || [];

  const handleResourceUpload = async () => {
    await onUpdate();
    setShowUpload(false);
  };

  const handleDeleteResource = async (resourceId: string) => {
    try {
      const response = await fetch(`/api/teacher/resources/${resourceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
          <p className="text-sm text-gray-500">Code: {subject.code}</p>
          <p className="text-sm text-gray-500">Semester: {subject.semester}</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
        >
          Upload Resource
        </button>
      </div>

      <div className="mb-4">
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
        {filteredResources.map((resource) => (
          <div
            key={resource._id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-md"
          >
            <div>
              <h4 className="font-medium text-gray-900">{resource.title}</h4>
              <p className="text-sm text-gray-500">{resource.description}</p>
              <p className="text-xs text-gray-400">
                Added on: {new Date(resource.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <a
                href={resource.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Download
              </a>
              <button
                onClick={() => handleDeleteResource(resource._id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredResources.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No {activeTab} uploaded yet.
          </p>
        )}
      </div>

      {showUpload && (
        <ResourceUpload
          subjectId={subject._id}
          onClose={() => setShowUpload(false)}
          onSuccess={handleResourceUpload}
        />
      )}
    </div>
  );
}

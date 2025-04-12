'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface Subject {
  id: string;
  name: string;
  code: string;
}

interface UploadedResource {
  id: string;
  title: string;
  type: string;
  fileUrl: string;
  createdAt: string;
}

export default function ResourceUploadCard() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'note' | 'presentation' | 'video' | 'other'>('note');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [recentUploads, setRecentUploads] = useState<UploadedResource[]>([]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchRecentUploads();
    }
  }, [selectedSubject]);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('/api/teacher/subjects');
      const data = await response.json();
      if (response.ok) {
        setSubjects(data.subjects);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load subjects' });
    }
  };

  const fetchRecentUploads = async () => {
    try {
      const response = await fetch(`/api/resources?subject=${selectedSubject}`);
      const data = await response.json();
      if (response.ok) {
        setRecentUploads(data.resources);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load recent uploads' });
    }
  };

  const handleUpload = async () => {
    if (!selectedSubject || !title || !type || acceptedFiles.length === 0) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setUploading(true);
    try {
      // First upload the file
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error('Failed to upload file');
      
      const { fileUrl } = await uploadResponse.json();

      // Then create the resource
      const resourceResponse = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: selectedSubject,
          title,
          description,
          type,
          fileUrl,
        }),
      });

      if (!resourceResponse.ok) throw new Error('Failed to create resource');

      setMessage({ type: 'success', text: 'Resource uploaded successfully' });
      setTitle('');
      setDescription('');
      acceptedFiles.length = 0;
      fetchRecentUploads();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload resource' });
    } finally {
      setUploading(false);
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'note':
        return '📝';
      case 'presentation':
        return '📊';
      case 'video':
        return '🎥';
      default:
        return '📄';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Resources</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., Week 1 Lecture Notes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Brief description of the resource"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="note">Note</option>
                <option value="presentation">Presentation</option>
                <option value="video">Video</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                  isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                {acceptedFiles.length > 0 ? (
                  <p className="text-sm text-gray-900">
                    Selected: {acceptedFiles[0].name}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Drag & drop a file here, or click to select
                  </p>
                )}
              </div>
            </div>

            {message.text && (
              <div
                className={`p-4 rounded-md ${
                  message.type === 'error'
                    ? 'bg-red-50 text-red-700'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Resource'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Recent Uploads</h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {recentUploads.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <span className="text-2xl">{getFileTypeIcon(resource.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {resource.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <a
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import mongoose from 'mongoose';

export interface IResource extends mongoose.Document {
  title: string;
  description: string;
  type: 'note' | 'presentation' | 'video' | 'other';
  fileUrl: string;
  subject: mongoose.Types.ObjectId;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide resource title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide resource description'],
  },
  type: {
    type: String,
    enum: ['note', 'presentation', 'video', 'other'],
    required: [true, 'Please specify resource type'],
  },
  fileUrl: {
    type: String,
    required: [true, 'Please provide file URL'],
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Please provide subject ID'],
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide uploader ID'],
  },
}, { timestamps: true });

const Resource = mongoose.models.Resource || mongoose.model<IResource>('Resource', resourceSchema);

export default Resource;

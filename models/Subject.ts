import mongoose from 'mongoose';

export interface ISubject extends mongoose.Document {
  name: string;
  code: string;
  description: string;
  semester: number;
  teacher: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide subject name'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Please provide subject code'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide subject description'],
  },
  semester: {
    type: Number,
    required: [true, 'Please provide semester number'],
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide teacher ID'],
  },
}, { timestamps: true });

const Subject = mongoose.models.Subject || mongoose.model<ISubject>('Subject', subjectSchema);

export default Subject;

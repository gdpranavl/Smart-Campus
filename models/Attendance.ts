import mongoose from 'mongoose';

export interface IAttendance extends mongoose.Document {
  student: mongoose.Types.ObjectId;
  subject: mongoose.Types.ObjectId;
  date: Date;
  status: 'present' | 'absent';
  markedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide student ID'],
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Please provide subject ID'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide attendance date'],
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: [true, 'Please provide attendance status'],
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide teacher ID who marked attendance'],
  },
}, { timestamps: true });

// Create a compound index to prevent duplicate attendance records
attendanceSchema.index({ student: 1, subject: 1, date: 1 }, { unique: true });

const Attendance = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', attendanceSchema);

export default Attendance;

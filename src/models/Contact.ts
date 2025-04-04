import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
  },
  company: {
    type: String,
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['Quote Request', 'Project Inquiry', 'Technical Support', 'General Inquiry'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'completed'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
contactSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Contact || mongoose.model('Contact', contactSchema);

import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  projectReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  clientImage: {
    type: String,
  },
  companyLogo: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  verifiedPurchase: {
    type: Boolean,
    default: false,
  },
  industry: {
    type: String,
  },
  location: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

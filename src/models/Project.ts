import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  completionDate: {
    type: Date,
    required: true,
  },
  images: {
    type: [imageSchema],
    default: [],
  },
  category: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        const validCategories = [
          'Industrial Buildings',
          'Commercial Buildings',
          'Warehouses',
          'Sports Facilities',
          'Agricultural Buildings'
        ];
        return validCategories.includes(v);
      },
      message: props => `${props.value} is not a valid category`
    }
  },
  scope: {
    type: [String],
    default: [],
  },
  specifications: {
    type: Map,
    of: String,
    default: () => new Map(),
  },
  status: {
    type: String,
    enum: ['Planned', 'In Progress', 'Completed'],
    default: 'Planned',
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

// Basic indexes for common queries
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ featured: 1 });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;

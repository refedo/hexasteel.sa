import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  coverImage: {
    type: String,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  publishedAt: {
    type: Date,
  },
  readTime: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
}, {
  timestamps: true,
});

// Create the slug from the title
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  if (this.isModified('content')) {
    // Calculate read time based on words (assuming average reading speed of 200 words per minute)
    const words = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(words / 200);
  }

  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Virtual for formatted date
blogSchema.virtual('formattedDate').get(function() {
  return this.publishedAt ? new Date(this.publishedAt).toLocaleDateString() : '';
});

// Ensure virtuals are included in JSON output
blogSchema.set('toJSON', { virtuals: true });
blogSchema.set('toObject', { virtuals: true });

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Structural Steel',
      'Metal Buildings',
      'Steel Decking',
      'Roofing Systems',
      'Wall Panels',
      'Accessories',
      'Custom Solutions'
    ],
  },
  description: {
    type: String,
    required: true,
  },
  technicalSpecs: [{
    name: String,
    value: String,
  }],
  features: [{
    type: String,
  }],
  applications: [{
    type: String,
  }],
  dimensions: {
    length: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ['mm', 'cm', 'm', 'inch', 'ft'],
      default: 'mm',
    },
  },
  weight: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ['kg', 'ton', 'lb'],
      default: 'kg',
    },
  },
  materials: [{
    type: {
      type: String,
      required: true,
    },
    grade: String,
    finish: String,
  }],
  certifications: [{
    name: String,
    issuer: String,
    validUntil: Date,
    documentUrl: String,
  }],
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean,
  }],
  documents: [{
    name: String,
    type: {
      type: String,
      enum: ['datasheet', 'manual', 'certification', 'drawing'],
    },
    url: String,
  }],
  customizationOptions: [{
    name: String,
    options: [String],
  }],
  leadTime: {
    type: String,
  },
  minimumOrderQuantity: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    enum: ['active', 'discontinued', 'coming-soon'],
    default: 'active',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  seoMeta: {
    title: String,
    description: String,
    keywords: [String],
  },
}, {
  timestamps: true,
});

// Create slug from name
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Virtual for formatted dimensions
productSchema.virtual('formattedDimensions').get(function() {
  return `${this.dimensions.length}x${this.dimensions.width}x${this.dimensions.height} ${this.dimensions.unit}`;
});

// Virtual for formatted weight
productSchema.virtual('formattedWeight').get(function() {
  return `${this.weight.value} ${this.weight.unit}`;
});

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);

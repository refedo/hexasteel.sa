import { Schema, model, models, Document } from 'mongoose';

export interface IKnowledgeContent extends Document {
  title: string;
  content: string;
  category: string;
  subcategory: string;
  tags: string[];
  lastUpdated: Date;
  order: number;
}

const categoryEnum = [
  'materials_and_grades',
  'technical_specifications',
  'engineering_software',
  'building_components',
  'building_types',
  'design_parameters'
];

const subcategoryEnum = [
  // Materials and Grades
  'steel_grades',
  'coating_types',
  'material_properties',
  
  // Building Components
  'purlins',
  'girts',
  'eave_struts',
  'rafters',
  'joists',
  'columns',
  'bracing',
  
  // Building Types
  'single_span',
  'multi_span',
  'multi_gable',
  'lean_to',
  'cantilever',
  
  // Others
  'general'
];

const KnowledgeContentSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: categoryEnum
  },
  subcategory: {
    type: String,
    required: true,
    enum: subcategoryEnum
  },
  tags: [{
    type: String,
    trim: true
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    default: 0
  }
});

export default models.KnowledgeContent || model<IKnowledgeContent>('KnowledgeContent', KnowledgeContentSchema);

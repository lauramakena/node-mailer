import mongoose, { Document, Schema } from 'mongoose';

export interface ITemplate extends Document {
  userId: string;
  name: string;
  subject: string;
  htmlContent: string;
  plainText?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema = new Schema<ITemplate>({
  userId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  htmlContent: {
    type: String,
    required: true
  },
  plainText: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
TemplateSchema.index({ userId: 1, name: 1 });

export default mongoose.model<ITemplate>('Template', TemplateSchema);

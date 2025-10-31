import express from 'express';
import Template from '../models/Template';

const router = express.Router();

// Middleware to verify user authentication (you'll need to implement this with Clerk)
const requireAuth = (req: any, res: express.Response, next: express.NextFunction): void => {
  // This will be replaced with proper Clerk authentication
  const userId = req.headers['x-user-id'] || req.body?.userId; // Get from header or body

  if (!userId) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  req.userId = userId;
  next();
};

// Get all templates for a user
router.get('/', requireAuth, async (req: any, res: express.Response): Promise<void> => {
  try {
    const templates = await Template.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

// Get a specific template
router.get('/:id', requireAuth, async (req: any, res: express.Response): Promise<void> => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!template) {
      res.status(404).json({ error: 'Template not found' });
      return;
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch template' });
  }
});

// Create a new template
router.post('/', requireAuth, async (req: any, res: express.Response): Promise<void> => {
  try {
    const { name, subject, htmlContent, plainText, userId: bodyUserId } = req.body;

    // Use the authenticated user ID from middleware, but verify it matches the body if provided
    const templateUserId = req.userId;
    if (bodyUserId && bodyUserId !== templateUserId) {
      res.status(403).json({ error: 'User ID mismatch' });
      return;
    }

    const template = new Template({
      userId: templateUserId,
      name,
      subject,
      htmlContent,
      plainText
    });

    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create template' });
  }
});

// Update a template
router.put('/:id', requireAuth, async (req: any, res: express.Response): Promise<void> => {
  try {
    const { name, subject, htmlContent, plainText } = req.body;

    const template = await Template.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, subject, htmlContent, plainText },
      { new: true, runValidators: true }
    );

    if (!template) {
      res.status(404).json({ error: 'Template not found' });
      return;
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update template' });
  }
});

// Delete a template
router.delete('/:id', requireAuth, async (req: any, res: express.Response): Promise<void> => {
  try {
    const template = await Template.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!template) {
      res.status(404).json({ error: 'Template not found' });
      return;
    }

    res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

export default router;

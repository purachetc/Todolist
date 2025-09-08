const model = require('../model/todolist-model');

exports.list = async (req, res, next) => {
  try {
    const { q, completed } = req.query;
    const filters = {
      q: q ? String(q) : undefined,
      completed: typeof completed !== 'undefined' ? String(completed) === 'true' : undefined
    };
    const todos = await model.list(filters);
    res.json(todos);
  } catch (e) { next(e); }
};

exports.detail = async (req, res, next) => {
  try {
    const todo = await model.getById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Not found' });
    res.json(todo);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const title = (req.body?.title || '').trim();
    if (!title) return res.status(400).json({ message: 'title is required (non-empty string)' });
    const todo = await model.create({ title });
    res.status(201).json(todo);
  } catch (e) { next(e); }
};

exports.updatePartial = async (req, res, next) => {
  try {
    const { title, completed } = req.body || {};
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({ message: 'title, if provided, must be a non-empty string' });
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'completed, if provided, must be boolean' });
    }
    const updated = await model.update(req.params.id, { title, completed });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (e) { next(e); }
};

exports.replace = async (req, res, next) => {
  try {
    const { title, completed } = req.body || {};
    if (typeof title !== 'string' || title.trim() === '' || typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'title (string) and completed (boolean) are required' });
    }
    const replaced = await model.replace(req.params.id, { title, completed });
    if (!replaced) return res.status(404).json({ message: 'Not found' });
    res.json(replaced);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const removed = await model.remove(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted', todo: removed });
  } catch (e) { next(e); }
};
const { v4: uuid } = require('uuid');
const store = require('../store/todolist-store');

function nowISO() {
  return new Date().toISOString();
}

exports.list = async ({ q, completed } = {}) => {
  let todos = await store.read();
  if (q) {
    const needle = q.toLowerCase();
    todos = todos.filter(t => t.title.toLowerCase().includes(needle));
  }
  if (typeof completed === 'boolean') {
    todos = todos.filter(t => t.completed === completed);
  }
  return todos;
};

exports.getById = async (id) => {
  const todos = await store.read();
  return todos.find(t => t.id === id);
};

exports.create = async ({ title }) => {
  const todos = await store.read();
  const iso = nowISO();
  const todo = { id: uuid(), title: title.trim(), completed: false, createdAt: iso, updatedAt: iso };
  todos.push(todo);
  await store.write(todos);
  return todo;
};

exports.update = async (id, { title, completed }) => {
  const todos = await store.read();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return null;

  if (title !== undefined) todos[idx].title = String(title).trim();
  if (completed !== undefined) todos[idx].completed = completed;
  todos[idx].updatedAt = nowISO();

  await store.write(todos);
  return todos[idx];
};

exports.replace = async (id, { title, completed }) => {
  const todos = await store.read();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return null;

  todos[idx] = {
    ...todos[idx],
    title: String(title).trim(),
    completed: Boolean(completed),
    updatedAt: nowISO()
  };
  await store.write(todos);
  return todos[idx];
};

exports.remove = async (id) => {
  const todos = await store.read();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return null;
  const [removed] = todos.splice(idx, 1);
  await store.write(todos);
  return removed;
};
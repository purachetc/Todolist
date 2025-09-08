const { promises: fs } = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FILE_PATH = path.join(DATA_DIR, 'todos.json');

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(FILE_PATH);
  } catch {
    await fs.writeFile(FILE_PATH, '[]', 'utf8');
  }
}

exports.read = async () => {
  await ensureFile();
  const raw = await fs.readFile(FILE_PATH, 'utf8');
  return JSON.parse(raw);
};

exports.write = async (todos) => {
  await ensureFile();
  await fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 2), 'utf8');
};

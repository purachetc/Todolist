const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const todoRoutes = require('./routes/todolist-routes');
app.use('/todos', todoRoutes); 
// Route เริ่มต้น
app.get('/', (req, res) => {
  res.json({ message: 'Hello Express API!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
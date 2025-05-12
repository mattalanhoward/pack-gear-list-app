require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');  // Adjust the path as necessary

connectDB();

const PORT = process.env.PORT || 3001;  // Change from 5000 to 3001


app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.json({ message: 'Hello, Welcome to pack-gear-list-app backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

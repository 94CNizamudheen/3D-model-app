const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const modelRoutes = require('./routes/modelRoutes');
const connectDB = require('./models/db');

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.use(express.json());

connectDB()
  .then(() => {
    console.log(' MongoDB connected');

    app.use('/models', modelRoutes);

    // Start server
    const PORT = process.env.PORT || 9412;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(' MongoDB connection failed:', err.message);
    process.exit(1);
  });

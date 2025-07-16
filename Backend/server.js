// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const modelRoutes = require('./routes/modelRoutes');

dotenv.config();
const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL, 
}));


app.use(express.json());


app.use('/models', modelRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 9412;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

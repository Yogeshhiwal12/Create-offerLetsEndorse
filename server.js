const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const offerRoutes = require('./routes/offerRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/offers', offerRoutes);

const PORT = process.env.PORT || 5000;

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

connectToDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

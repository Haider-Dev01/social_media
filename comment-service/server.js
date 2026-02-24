const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

const commentRoutes = require('./routes/commentRoutes');
app.use('/comments', commentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Comment Service running on port ${process.env.PORT}`);
});
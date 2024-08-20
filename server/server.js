const app = require('./src/app');
const { connectDB } = require('./src/config/database');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
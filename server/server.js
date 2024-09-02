const app = require('./src/app');
const { connectDB } = require('./src/config/database');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Global error handlers
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error.message);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  process.exit(1);
});

async function startServer() {
  try {
    console.log('Starting server...');

    // Connect to MongoDB
    // console.log('Connecting to database...');
    await connectDB();
    // console.log('Database connected successfully.');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1); // Exit the process with a failure code
  }
}

// Graceful shutdown
function gracefulShutdown() {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  // If after 10 seconds the server hasn't finished, shut down forcefully
  setTimeout(() => {
    console.error('Forcing shutdown...');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

startServer();

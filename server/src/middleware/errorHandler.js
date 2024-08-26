const errorHandler = (err, req, res, next) => {
  // Log the full error stack trace to the console
  console.error(`Error occurred during request to ${req.method} ${req.url}:`);
  console.error(err.stack);

  // Respond to the client with a generic message in production, or full error details in development
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
};

module.exports = errorHandler;

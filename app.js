const express = require('express');
const { connectToDatabase } = require('./config/db');

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
// Import other routes as needed

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
// Add more routes as needed

// Simple home route
app.get('/', (req, res) => {
  res.send('College Website API is running');
});

// Start server
async function startServer() {
  await connectToDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

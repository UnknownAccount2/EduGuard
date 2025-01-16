const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Path to store activities in a JSON file
const activitiesFilePath = path.join(__dirname, 'activities.json');

// Ensure the activities file exists
if (!fs.existsSync(activitiesFilePath)) {
  fs.writeFileSync(activitiesFilePath, JSON.stringify([])); // Initialize with empty array if file doesn't exist
}

// Basic middleware to serve static files
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  res.send('Monitoring System');
});

// Function to save activity to the JSON file
const saveActivity = (activity) => {
  const activities = JSON.parse(fs.readFileSync(activitiesFilePath));
  activities.push(activity);
  fs.writeFileSync(activitiesFilePath, JSON.stringify(activities, null, 2));
};

// Real-time socket connection to track activity
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for activity updates from clients (students)
  socket.on('new-activity', (data) => {
    const newActivity = {
      studentId: data.studentId,
      activity: data.activity,
      timestamp: new Date().toISOString(),
    };

    saveActivity(newActivity); // Save activity to file

    // Broadcast activity to all connected clients
    io.emit('activity-update', newActivity);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

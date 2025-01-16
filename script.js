document.addEventListener("DOMContentLoaded", () => {
  const activityList = document.getElementById('activity-list');
  
  // Function to simulate tracking of student activity
  function trackActivity() {
    const activity = {
      studentId: 'Student 1',
      activity: 'Visited: ' + window.location.hostname,
      timestamp: new Date().toLocaleTimeString(),
    };

    const listItem = document.createElement('li');
    listItem.classList.add('activity-item');
    listItem.innerHTML = `${activity.studentId} - ${activity.activity} at ${activity.timestamp}`;
    
    activityList.appendChild(listItem);
  }

  // Simulate activity every 5 seconds
  setInterval(trackActivity, 5000);
});

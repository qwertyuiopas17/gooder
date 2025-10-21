// In sw.js

// This is the API URL of your backend on Render
const API_BASE_URL = 'https://sahara-sathi.onrender.com';

self.addEventListener('notificationclick', event => {
    // Always close the notification when a button is clicked
    event.notification.close();

    // Get the data passed from the main page
    const medicineName = event.notification.data.medicineName;
    const userId = event.notification.data.userId;

    // Check which button was clicked
    if (event.action === 'mark-taken') {
        console.log(`'Mark as Taken' clicked for ${medicineName}`);

        // This makes an API call to your backend, just like the button in the app
        event.waitUntil(
            fetch(`${API_BASE_URL}/v1/medicine-reminders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    action: 'update_adherence',
                    medicine_name: medicineName,
                    taken_time: new Date().toTimeString().slice(0, 5)
                })
            }).then(response => {
                if (!response.ok) {
                    console.error('Failed to mark medicine as taken from notification.');
                } else {
                    console.log('Successfully marked as taken from notification.');
                }
            }).catch(error => {
                console.error('Fetch error in Service Worker:', error);
            })
        );
    } else {
        // This handles clicks on the notification body itself or the 'Close' button
        console.log('Notification was clicked or closed.');
    }
});
// Custom event listeners for push notifications and notification click handling
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const title = data.title;
    const body = data.body;
    const url = data.data?.url || '/';

    const notificationOptions = {
      body: body,
      tag: `notification-${Date.now()}`,
      icon: "./next.svg",
      data: {
        url: url, // Replace with the desired URL for redirecting user to the desired page
      },
    };

    console.log('Push Notification Trigger', notificationOptions)

    event.waitUntil(
      self.registration.showNotification(title, notificationOptions)
    );
  }
});

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.');

  // Close the notification
  event.notification.close();

  const notificationData = event.notification.data;
  const urlToOpen = notificationData?.url || '/'; // Fallback to root if no URL is provided

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's an open tab with the same origin as the URL (i.e., same app)
      const client = clientList.find((c) => c.url.startsWith(self.location.origin) && 'focus' in c);

      if (client) {
        // If a client is found, focus on that tab
        client.focus();
        // Use the client to navigate to the new URL
        return client.navigate(urlToOpen);
      } else {
        // If no client is found, open a new tab
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
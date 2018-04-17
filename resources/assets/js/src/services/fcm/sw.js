importScripts('https://www.gstatic.com/firebasejs/4.1.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.3/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "642886628334"
});

workbox.skipWaiting();
workbox.clientsClaim();

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/firebase-logo.png"
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

/* self.addEventListener('push', (event) => {
    const title = 'Get Started With Workbox';
    const options = {
        body: event.data.text()
    };
    event.waitUntil(self.registration.showNotification(title, options));
}); */

workbox.precaching.precacheAndRoute(self.__precacheManifest);

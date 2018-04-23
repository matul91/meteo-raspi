importScripts('https://www.gstatic.com/firebasejs/4.1.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.3/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "642886628334"
});

workbox.skipWaiting();
workbox.clientsClaim();

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
    const notificationOptions = {
        body: payload.notification.body,
        ...payload.data
    };

    return self.registration.showNotification(payload.notification.title, notificationOptions);
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);

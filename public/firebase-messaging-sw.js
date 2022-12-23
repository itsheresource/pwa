importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyBNv6cCRwMI5V_MpgzDyXX_Jg-tci0Wc4E',
        authDomain: 'itshere-fa8cb.firebaseapp.com',
        databaseURL: 'https://itshere-fa8cb.firebaseio.com',
        projectId: 'itshere-fa8cb',
        storageBucket: 'itshere-fa8cb.appspot.com',
        messagingSenderId: '490824753341',
        appId: '1:490824753341:web:6ebb9d5f400c8a7069d7d4',
        measurementId: 'G-6LXBKHJ7Y7',
    });
}
console.log('in FCM service worker file...');

const messaging = firebase.messaging();

self.addEventListener('notificationclick', function (event) {
    // do what you want
    console.log('some event when notification is clicked');
});

messaging.setBackgroundMessageHandler(payload => {
    const notification = JSON.parse(payload.data.notification);
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body
    };
    //Show the notification :)
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});

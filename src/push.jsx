import firebase from 'firebase';

export const initializeFirebase = () => {
  if (!firebase.apps.length)
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
  else {
    firebase.app();
  }
};

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await Notification.requestPermission();
    const token = await messaging.getToken();
    return token;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getMessages = () => {
  const messaging = firebase.messaging();
  messaging.onMessage( payload => {
    console.log("Message received. ", payload);
    const { title, ...options } = payload.notification;
  });
};

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREABASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPKEY,
      }).then((currentToken) => {
        if (currentToken) {
          localStorage.setItem('fcmToken', currentToken);
        } else {
          console.log('토큰을 가져오지 못했습니다.');
        }
      });

      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
      });
    } else {
      console.log('권한이 없습니다.');
    }
  });
}

requestPermission();

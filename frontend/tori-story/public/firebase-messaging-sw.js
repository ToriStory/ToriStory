// /* eslint-env worker */
// importScripts('https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging-compat.js');

// var firebaseConfig = {
//   apiKey: 'AIzaSyDH8Pr9fhrYLmMwQFtv9ADfk8eyDax_WMw',
//   authDomain: 'tori-story.firebaseapp.com',
//   projectId: 'tori-story',
//   storageBucket: 'tori-story.appspot.com ',
//   messagingSenderId: '620178363335',
//   appId: '1:620178363335:web:a6cb34f7e2becb909a7fe2',
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// //백그라운드 서비스워커 설정
// messaging.onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);

//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: payload,
//     icon: './images/maskable_icon_x128.png',
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

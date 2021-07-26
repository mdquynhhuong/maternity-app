import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCOK05SneE3vgBYlpkKheYEbcx4I9NMG7Y",
    authDomain: "maternity-app-fb019.firebaseapp.com",
    projectId: "maternity-app-fb019",
    storageBucket: "maternity-app-fb019.appspot.com",
    messagingSenderId: "827514521346",
    appId: "1:827514521346:web:0e22c9ed8bbbc9ea12e41b"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
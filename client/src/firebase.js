import firebase from 'firebase/app';
import "firebase/auth" ;

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->


  const firebaseConfig = {
    apiKey: "AIzaSyANag7mTv2T8-vPFkB1_62ly7sQnY8Tebw",
    authDomain: "ecommerce-dcfcf.firebaseapp.com",
    databaseURL: "https://ecommerce-dcfcf.firebaseio.com",
    projectId: "ecommerce-dcfcf",
    storageBucket: "ecommerce-dcfcf.appspot.com",
    messagingSenderId: "1014090810096",
    appId: "1:1014090810096:web:8ee413645ec71871a97835"
  };
 
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
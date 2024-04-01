import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyCOKhaOBAqDpj83EXnuE9djj6vFrkmoQ7M",
  authDomain: "dearndeev2.firebaseapp.com",
  projectId: "dearndeev2",
  storageBucket: "dearndeev2.appspot.com",
  messagingSenderId: "280195130430",
  appId: "1:280195130430:web:57d46ffec4a43324f45d6f",
  measurementId: "G-FGWWJR4R99"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export { firebase };
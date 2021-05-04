import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyA-rhcsLezYK5_gbCr_eETA3lnnI0tlbpA",
    authDomain: "disney-c6fd7.firebaseapp.com",
    projectId: "disney-c6fd7",
    storageBucket: "disney-c6fd7.appspot.com",
    messagingSenderId: "731468178467",
    appId: "1:731468178467:web:9c0cf919bbcd92d21d7d96"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();


export { auth, provider, storage };
export default db;
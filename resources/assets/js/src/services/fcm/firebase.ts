import * as firebase from "firebase";

const config = {
    apiKey: process.env.MIX_FIREBASE_API_KEY,
    authDomain: process.env.MIX_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.MIX_FIREBASE_DATABASE_URL,
    messagingSenderId: process.env.MIX_FIREBASE_MESSAGING_SENDER_ID,
    projectId: process.env.MIX_FIREBASE_PROJECT_ID,
    storageBucket: process.env.MIX_FIREBASE_STORAGE_BUCKET,
};

try {
    firebase.initializeApp(config);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error", err.stack);
    }
}

const firebaseApp = firebase;

export default firebaseApp;

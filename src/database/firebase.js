import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDQlsZxF_JPyB81McQ9jeHadDldFBZYeP8",
    authDomain: "portofolio-application.firebaseapp.com",
    projectId: "portofolio-application",
    storageBucket: "portofolio-application.appspot.com",
    messagingSenderId: "497139609388",
    appId: "1:497139609388:web:f32ed093ff463d50e0c689",
    measurementId: "G-NBD5RHWFRD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();
firebase.auth();

export default firebase;
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        projectId: "-",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""

};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;

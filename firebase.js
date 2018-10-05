import firebase from 'firebase';
import firestore from 'firebase/firestore';

const config = {
	apiKey: "AIzaSyBQ8NQogw3ZuXgpONJbw61hxssFOB5ZRGY",
  authDomain: "bijyo-collection.firebaseapp.com",
  databaseURL: "https://bijyo-collection.firebaseio.com",
  projectId: "bijyo-collection",
  storageBucket: "bijyo-collection.appspot.com",
  messagingSenderId: "684500278423"
}

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export default firebase;
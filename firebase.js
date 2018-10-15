import firebase from 'firebase';
import firestore from 'firebase/firestore';
// import 'firebase/auth'

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

firebase.auth().onAuthStateChanged((user) => {
	if (user != null) {
		console.log("We are authenticated now!")
	}else{
		console.log("false")
	}
});

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().languageCode = 'pt';

export default firebase;
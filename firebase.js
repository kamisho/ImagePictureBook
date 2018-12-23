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

// firebaseのインスタンスを初期化する
firebase.initializeApp(config);

// Cloud Firestoreのインスタンスを初期化する
const db = firebase.firestore();

// Googleプロバイダオブジェクトのインスタンを作成する
const provider = new firebase.auth.GoogleAuthProvider();

// settingsを設定することが必須
db.settings({
  // タイムスタンプが保存される
  timestampsInSnapshots: true
});

// auth().onAuthStateChanged((user)) 現在ログインしているユーザーを取得
firebase.auth().onAuthStateChanged((user) => {
	if (user != null) {
		console.log("We are authenticated now!")
	}else{
		console.log("false")
	}
});

export default firebase;
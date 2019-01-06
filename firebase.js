import firebase from 'firebase';
import firestore from 'firebase/firestore';

const config = {
  // 本番環境
	// apiKey: "AIzaSyBRpBvMGOJV6-P0MKy2gg6XoPhguuDH_Iw",
  // authDomain: "bijyo-collection.firebaseapp.com",
  // databaseURL: "https://bijyo-collection.firebaseio.com",
  // projectId: "bijyo-collection",
  // storageBucket: "bijyo-collection.appspot.com",
  // messagingSenderId: "684500278423"

  // 開発環境
    apiKey: "AIzaSyAAqchjetUGTnbr4S99MSiZdauUoWtFk0g",
    authDomain: "bijostagram-test.firebaseapp.com",
    databaseURL: "https://bijostagram-test.firebaseio.com",
    projectId: "bijostagram-test",
    storageBucket: "bijostagram-test.appspot.com",
    messagingSenderId: "913422222238"
}

// firebaseのインスタンスを初期化する
firebase.initializeApp(config);

// Cloud Firestoreのインスタンスを初期化する
const db = firebase.firestore();

// settingsを設定することが必須
db.settings({
  // タイムスタンプが保存される
  timestampsInSnapshots: true
});

export default firebase;
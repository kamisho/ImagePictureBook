import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Button, 
  Alert, 
  TouchableOpacity, 
  ImageBackground  
} from 'react-native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import firebase from '../firebase';
import FooterBtn from './FooterBtn'
import Top from './Top';
import Expo from 'expo';

export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      signedIn: false,
      name: '',
      email: '',
    }
  }

  // 自動ログイン
  // componentWillMount(){
  //   // firebase.auth().onAuthStateChanged(user) : 現在ログインしているユーザーを取得できる
  //   firebase.auth().onAuthStateChanged(user => {
  //     if(user){
  //       this.state = {
  //         signedIn: true,
  //         name: user.uid
  //       }
  //       console.log(this.state.name)
  //       // Expo標準で入っているreact-navigation
  //       // 全てのコンポーネントにnavigationというpropsが渡される
  //       this.props.navigation.navigate("FooterBtn");
  //     }else{
  //       console.log("error")
  //     }
  //   })
  // }
  
  // async/awaitを用いることで非同期処理を記載できる(thenを使用せずにtry-catch文で)
  signIn = async () => {
      try {
        // await Expo.Google.logInAsync({}) : Google認証機能の追加・画面修正
        const result = await Expo.Google.logInAsync({
          iosClientId: "684500278423-i1okncu4ifvgiri9lmkjuj0g8td0e1up.apps.googleusercontent.com",
          scopes: ["profile", "email"]
      });

      // トークンが取得できたら
      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(res => {
            this.setState({
              signedIn: true,
              name: result.user.name,
              email: result.user.email
            })

            const user = firebase.auth().currentUser;
            const uid = user.uid;
            const db = firebase.firestore();
            // collection(コレクション名).doc(uid ← uidはユーザーのID(Authenticated IDと同じになるようにした))
            db.collection('users').doc(uid).set({
              // ドキュメント名 : 値
              user: this.state.name,
              email: this.state.email
            });

            Alert.alert("ようこそ、美女の世界へ");
            this.props.navigation.navigate("FooterBtn");
            console.log(this.state.name + "+" + this.state.email);
        })
        .catch(error => {
          console.log("firebase cred err:", error);
        });
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("err:", err);
    }
  }

	render(){
		return(
			<View>
        <ImageBackground source={require("../pictures/bijodrink.jpg")} style={styles.backgroundImage}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.signIn()} >
              <Image source={require('../pictures/google.png')} style={styles.login} />
            </TouchableOpacity>
            <Text style={styles.explainApp}>いざ、美女の世界へ</Text>
          </View>
        </ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%'
  }, 
  // Googleログインボタンの配置
  container: {
    // 横
    alignItems: 'center',
    // 縦
    flex: 1,
    justifyContent: 'center',
  },
  // Googleログインボタンの大きさ
  login: {
    height: 35,
    width: 200
  },
  explainApp: {
    paddingTop: 20,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    backgroundColor: 'pink',
    fontFamily: 'HiraMinProN-W3',
    width: '100%',
    textAlign: 'center',
    // 画面下部に配置
    position: 'absolute',
    bottom: 0,
  }
});
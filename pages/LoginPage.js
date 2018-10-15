import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Top from './Top';
// import { androidClientId } from 'superSecretKey';
import Expo from 'expo';
import firebase from '../firebase';

export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      signedIn: false,
      name: ''
    }
  }

  signIn = async () => {
      try {
        const result = await Expo.Google.logInAsync({
          iosClientId: "684500278423-i1okncu4ifvgiri9lmkjuj0g8td0e1up.apps.googleusercontent.com",
          scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(res => {
            this.setState({
              signedIn: true,
              name: result.user.name
            })
            Alert.alert("ようこそ、美女の世界へ");
            this.props.navigation.navigate("Top");
            console.log(this.state.name);
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
        <Button title="Sign in with Google" onPress={() => this.signIn()} />
        <Text style={styles.explainApp}>美女画像を追加しよう</Text>
				<Image source={require("../pictures/login.jpg")} style={styles.loginImage} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  explainApp: {
    color: 'white',
    fontSize: 30,
  },
  loginImage: {
    height: hp('90%'),
    width: null,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});
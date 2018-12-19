import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, TouchableOpacity, ImageBackground  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Top from './Top';
import Expo from 'expo';
import { Constants } from 'expo';
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

            const user = firebase.auth().currentUser;
            const uid = user.uid;
            const db = firebase.firestore();
            db.collection('users').doc(uid).set({
              user: this.state.name,
            });

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
        <ImageBackground source={require("../pictures/bijodrink.jpg")} style={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.signIn()} style={styles.loginBtn}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explainApp: {
    paddingTop: 20,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    position: 'absolute',
    backgroundColor: 'pink',
    fontFamily: 'HiraMinProN-W3',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
  loginImageBackground: {
    height: hp('90%'),
    width: null,
  },
  signInText: {
    color: '#333333',
    fontSize: 20,
    textAlign: 'center'
  },
  loginBtn: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    position: 'absolute',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    height: 45,
    width: 250
  }
});
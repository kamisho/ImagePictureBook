import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet,  
  Alert, 
  ImageBackground  
} from 'react-native';
import {
  Body,
  Button,
} from 'native-base';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import LoginForm from "./LoginForm";
import firebase from '../firebase';
import FooterBtn from './FooterBtn';
import Expo from 'expo';

export default class LaunchPage extends Component{

  // 自動ログイン機能
  // componentWillMount(){
  //   firebase.auth().onAuthStateChanged(user => {
  //     if(user){
  //       this.state = {
  //         signedIn: true,
  //         name: user.uid 
  //       };
  //       console.log(this.state.name);
  //       this.props.navigation.navigate("FooterBtn");
  //     }else{
  //       console.log("error");
  //     }
  //   })
  // }
  
  render(){
	  return(
		  <View>
        <ImageBackground source={require("../pictures/bijodrink.jpg")} style={styles.backgroundImage}>
          <Body style={styles.container}>
            <Button style={styles.loginDesign} onPress={Actions.LoginForm} >
              <Text style={styles.explainApp}>いざ、美女の世界へ</Text>
            </Button>

            <Button style={styles.loginDesign} onPress={Actions.SignInForm} >
              <Text style={styles.explainApp}>はじめての方はこちら</Text>
            </Button>
          </Body>
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
  nextLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30
  },
  loginDesign: {
    backgroundColor: 'pink',
    marginTop: 60
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
    paddingTop: 5,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    backgroundColor: 'pink',
    fontFamily: 'HiraMinProN-W3',
    width: '80%',
    textAlign: 'center',
    borderRadius: 50,
  }
});
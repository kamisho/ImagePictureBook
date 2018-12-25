import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import firebase from '../firebase';

export default class Settings extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      sex: '',
      year: ''
    }
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.state = {
          name: user.name,
          email: user.email
        }
      }else{
        console.log("error");
      }
    })
  }

  render(){
    return(
      <View style={styles.design}>
        <Text>{this.state.name}</Text>
        <Text>{this.state.email}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  design: {
    marginTop: 50
  }
})
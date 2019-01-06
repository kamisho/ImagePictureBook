import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import firebase from '../firebase';

export default class EditProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: "",
      gender: "",
      birthday: ""
    }
  }

  componentWillMount(){
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const uid = user.uid
    const userRef = db.collection('users').doc(uid);
    userRef.get().then(doc => {
      if(doc.exists){
        
        const _d = new Date(doc.data().birthDay["seconds"] * 1000);
        const Y = _d.getFullYear();
        const m = ("0" + (_d.getMonth() + 1)).slice(-2);
        const d = ("0" + _d.getDate()).slice(-2);

        this.setState({
          email: doc.data().email,
          gender: doc.data().gender,
          birthday: `${Y}年${m}月${d}日`
        }).bind(this)
      }else{
        console.log("No");
      }
    }).catch(error => {
      console.log(error)
    })
  }

  changeProfile = () => {
    // Firebaseのデータフィールドを変更または追加
  }

  render(){
    return(
      <View>
        <Text style={{ marginTop: 20 }}>{this.state.name}</Text>
        <Text>{"メールアドレス: " + this.state.email}</Text>
        <Text>{"性別 : " + this.state.gender}</Text>
        <Text>{"生年月日 : " + this.state.birthday}</Text>
      </View>
    );
  }
}
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
      name: "",
      email: "",
      sex: "",
      birthday: ""
    }
  }

  componentWillMount(){
    const user = firebase.auth().currentUser;
    const uid = user.uid
    console.log(user);
    this.setState({
      name: user.displayName,
      email: user.email,
    })

  }

  changeProfile = () => {
    // Firebaseのデータフィールドを変更または追加
  }

  render(){
    return(
      <View>
        <Text style={{ marginTop: 20 }}>{this.state.name}</Text>
        <Text>{this.state.email}</Text>

        {/* 性別 - Picker with Icon */}

        {/* 誕生日 - Date Picker */}

        {/* 保存ボタン - ChangeProfile */}
      </View>
    );
  }
}
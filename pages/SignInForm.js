import React, { Component} from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Button,
  Alert
} from 'react-native'
import {
  Container,
  Body,
  DatePicker
} from 'native-base';
import firebase from '../firebase'
import RadioForm from 'react-native-simple-radio-button';
import { moderateScale } from 'react-native-size-matters';

export default class SignInForm extends Component {
  constructor(props){
    super(props);
    this.state = { 
      email: '', 
      password: '', 
      gender: "", 
      birthDay: ""
    }
  }

  mailFormatCheck(mailAddress) {
    var mail_regex1 = new RegExp( '(?:[-!#-\'*+/-9=?A-Z^-~]+\.?(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*|"(?:[!#-\[\]-~]|\\\\[\x09 -~])*")@[-!#-\'*+/-9=?A-Z^-~]+(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*' );
    var mail_regex2 = new RegExp( '^[^\@]+\@[^\@]+$' );
    if( mailAddress.match( mail_regex1 ) && mailAddress.match( mail_regex2 ) ) {
        // 全角チェック
        if( mailAddress.match( /[^a-zA-Z0-9\!\"\#\$\%\&\'\(\)\=\~\|\-\^\\\@\[\;\:\]\,\.\/\\\<\>\?\_\`\{\+\*\} ]/ ) ) { return false; }
        // 末尾TLDチェック（〜.co,jpなどの末尾ミスチェック用）
        if( !mailAddress.match( /\.[a-z]+$/ ) ) { return false; }
        return true;
    } else {
        return false;
    }
  }

  handleSignUp = () => {
    if(this.state.birthDay == "" || this.state.email == "" || this.state.email == ""){
      Alert.alert("Please fill in all");
    }else if(this.state.password.length < 6){
      Alert.alert("Please enter using more 7 letters");
    }else if(!this.mailFormatCheck(this.state.email)){ 
      Alert.alert("Please enter correct email form")
    // メアドがすでに登録されていた場合ってコードが欲しい
    }else{
      const { email, password } = this.state
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        firebase.auth().onAuthStateChanged(user => {
          if(user){
            const uid = user.uid;
            const db = firebase.firestore();
            db.collection("users").doc(uid).set({
              email: this.state.email,
              gender: this.state.gender == 0 ? "男性" : "女性",
              birthDay: this.state.birthDay
            });
          }
        this.props.navigation.navigate('FooterBtn')
      })
      Alert.alert("Welcom to 美女図鑑")
    }
  }

  render() {
    const genders = [
      {label: "Man", value: 0},
      {label: "Woman", value: 1}
    ];

    return (
      <Container style={styles.allScreen}>
        <Body>
          <Text style={styles.titleText}>Sign up</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.textInput}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        
      
          <Body>
            <RadioForm
              style={styles.selectGender}
              initial={0}
              radio_props={genders}
              onPress={(value) => this.setState({ gender: value })}
              formHorizontal={true}
              buttonColor={'#50C900'}
            />

            <DatePicker
              defaultDate={new Date(2000,4, 1)}
              minimumDate={new Date(1900, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={"ja"}
              modalTransparent={false}
              animationType={"fade"}
              placeHolderText="Birthday"
              textStyle={{ color: "green"}}
              placeholderTextColor="black"
              onDateChange={value => this.setState({ birthDay: value })}
            />
            <Button title="Register" onPress={this.handleSignUp} />
          </Body>
        </Body>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  allScreen: {
    backgroundColor: "pink",
  },
  titleText: {
    color: "white",
    fontSize: 30,
    paddingTop: 50,
  },
  textInput: {
    backgroundColor: "white",
    height: 40,
    width: moderateScale(300),
    marginTop: 20
  },
  selectGender: {
    paddingTop: moderateScale(20),
  }
})

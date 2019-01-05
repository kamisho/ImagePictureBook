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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

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

  handleSignUp = () => {
    if(this.state.birthDay == "" || this.state.email == "" || this.state.email == ""){
      Alert.alert("すべての項目を入力してください")
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
        Alert.alert("ようこそ、美女の世界へ")
      })
    }
  }

  render() {
    const genders = [
      {label: "男性", value: 0},
      {label: "女性", value: 1}
    ];

    return (
      <Container style={styles.allScreen}>
        <Body>
          <Text style={styles.titleText}>新規会員登録</Text>
        </Body>

        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.textInput}
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <RadioForm
            style={styles.selectGender}
            initial={0}
            radio_props={genders}
            onPress={(value) => this.setState({ gender: value })}
            formHorizontal={true}
          />
          
          <DatePicker
            defaultDate={new Date(2018,4, 4)}
            minimumDate={new Date(1901, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"ja"}
            modalTransparent={false}
            animationType={"fade"}
            placeHolderText="生年月日"
            textStyle={{ color: "green"}}
            placeHolderTextStyle={{ color: "black" }}
            onDateChange={value => this.setState({ birthDay: value })}
          />
          <Button title="登録" onPress={this.handleSignUp} />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  allScreen: {
    backgroundColor: "pink"
  },
  titleText: {
    color: "white",
    fontSize: 30,
    paddingTop: 50,
    fontFamily: 'HiraMinProN-W3',
  },
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 30
  },
  selectGender: {
    paddingTop:15,
    justifyContent: "space-around"
  }
})

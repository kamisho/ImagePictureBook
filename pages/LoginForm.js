import React, { Component } from 'react'
import {
  Container,
  Body,
} from 'native-base';
import { 
  StyleSheet, 
  Text, 
  TextInput,
  View, 
  Button,
  Alert
} from 'react-native'
import firebase from '../firebase'
import { moderateScale } from 'react-native-size-matters';

export default class Login extends Component {
  constructor(props){
    super(props);
      this.state = { 
        email: '', 
        password: '', 
        errorMessage: null 
    }
  }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => 
        this.props.navigation.navigate('FooterBtn'),
      )
      .catch(error => 
        Alert.alert("Failed login")
      )
  }

  render() {
    return (
      <Container style={styles.allScreen}>
        <Body>
          <Text style={styles.titleText}>Login Form</Text>
      
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="email"
          placeholderTextColor="black"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          placeholderTextColor="black"
          autoCapitalize="none"
          placeholder="password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        </Body>
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
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 170
  },
  textInput: {
    backgroundColor: "white",
    height: 40,
    width: moderateScale(300),
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 50
  },
})

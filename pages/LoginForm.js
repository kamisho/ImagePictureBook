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
  Button 
} from 'react-native'
import firebase from '../firebase'

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
      .then(() => this.props.navigation.navigate('FooterBtn'))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <Container style={styles.allScreen}>
        <Body>
          <Text style={styles.titleText}>美女国への入国審査</Text>
        </Body>

      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="メールアドレス"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="パスワード"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="ログイン" onPress={this.handleLogin} />
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 250
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 50
  },
})

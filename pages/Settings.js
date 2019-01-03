import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Button,
} from 'native-base';
import {
  Alert,
  StyleSheet
} from 'react-native';
import firebase from '../firebase';
import LoginPage from "./LaunchPage";
import EditProfile from './EditProfile';
import Expo from 'expo';
import {
  Actions
} from 'react-native-router-flux';

export default class Settings extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: ""
    }
  }

  componentWillMount(){
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    this.setState({
      user: uid
    })
  }

  logout = () => {
    firebase.auth().signOut()
    .then(() => {
      Alert.alert("ログアウトしました")
      // this.props.navigation.navigate("FooterBtn");
      Actions.LoginPage()
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render(){
    return(
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem>
            <Button onPress={() => Actions.EditProfile()} style={styles.accountEdit}>
                <Text style={styles.accountLetter}>プロフィール編集</Text>
              </Button>
            </ListItem>

            <ListItem>
              <Button onPress={() => this.logout()} style={styles.accountEdit}>
                <Text style={styles.accountLetter}>ログアウト</Text>
              </Button>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  accountEdit: {
    backgroundColor: "transparent"
  },
  accountLetter: {
    color: 'black',
  }
})
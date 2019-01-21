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
import LaunchPage from "./LaunchPage";
import Tutorial from './Tutorial';
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
      Alert.alert("Logout")
      Actions.LaunchPage();
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
                <Text style={styles.accountLetter}>Profile</Text>
              </Button>
            </ListItem>

            <ListItem>
            <Button onPress={() => Actions.Tutorial()} style={styles.accountEdit}>
                <Text style={styles.accountLetter}>Tutorial</Text>
              </Button>
            </ListItem>

            <ListItem>
              <Button onPress={() => this.logout()} style={styles.accountEdit}>
                <Text style={styles.accountLetter}>Logout</Text>
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
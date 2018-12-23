import React, {Component} from 'react';
import { 
  StyleSheet, 
  Image,
  ImagePickerIOS, 
  View,
  Platform,
  Alert
} from 'react-native';
import { 
  Container, 
  Header, 
  Content, 
  Item, 
  Input, 
  Body, 
  Title, 
  CardItem, 
  Button, 
  Footer, 
  FooterTab, 
  Icon, 
  Text,
} from 'native-base';
import { Actions } from "react-native-router-flux";
import firebase from '../firebase';
import { ImagePicker, Permissions } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LoginPage from './LoginPage';
import FooterBtn from './FooterBtn';

const result = '';

export default class Top extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      image: ''
    }
  }

  pickImage() {
    ImagePicker.showImagePicker({}, (response) => {
      console.log('Response = ', response);
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let source = response.uri ;
        this.setState({
          image: source
        });
      }
    });
  }

  onChangeText(e){
    this.setState({
      name: this.state.name
    });
  }

  pickImage = async () => {

    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      if (permission.status !== 'granted') {
        const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (newPermission.status === 'granted') {
          console.log("granted")
        }
      } else {
        console.log("error")
    } 

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [30, 9]
    });

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }

  uploadImage = async(uri, imageName) => {
    const response = await fetch(uri)
    const blob = await response.blob();
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const ref = firebase.storage().ref().child("images/" + `${uid}/` + imageName);
    const db = firebase.firestore();
    
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    // const db = firebase.firestore();
    //   db.collection('posts').add({
    //     bijoname: this.state.name,
    //     bijoimage: uri.downl,
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //     userId: uid
    //   });

    ref.put(blob).then(snapshot => {
      ref.getDownloadURL().then(url => {
        const storagePlace = url
        
        db.collection('posts').add({
          bijoname: this.state.name,
          bijoimage: storagePlace,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userId: uid
        });
      })
    })
  }

  addImage = () => {
    if(!this.state.name || !this.state.image){
      Alert.alert(
        '美女の名は？',
        '美女だけを追加してください。',
      );
    }
    else{ 
      const random = Math.random();
      this.uploadImage(this.state.image, this.state.name + random)
        .then(() => {
          console.log("success")
        })
        .catch(() => {
          console.log("failed")
        })

      const groupDto = {
        name: this.state.name,
        image: this.state.image
      };

      // const user = firebase.auth().currentUser;
      // const uid = user.uid;
      // const db = firebase.firestore();
      // db.collection('posts').add({
      //   bijoname: this.state.name,
      //   bijoimage: this.state.image,
      //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //   userId: uid
      // });
        Alert.alert("美女を追加しました")
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: "#ffc0cb"}}>
        <Header>
          <Body>
            <Title style={{fontFamily: Platform.select({ios:'HiraMinProN-W3', android: 'serif'})}} >美女図鑑</Title>
          </Body>
        </Header>

        <Content>
          <Body>
            <Item rounded style={styles.inputName}>
              <Input placeholder="美女名を入力" style={styles.textName} value={this.state.name} onChangeText={(text) => this.setState({name: text})} />
            </Item>
          </Body>
          
          <CardItem cardBody style={ styles.cardSize }>
            {this.state.image ?
              <Image source={{uri: this.state.image }} style={ styles.imageSize } /> : <Image source={require("../pictures/bijyo.jpg")} style={ styles.imageSize } />
            }
            {console.log(this.props.name)}
          </CardItem>
        </Content>

        <View style={styles.selectBtn}>
          <Button style={styles.textBtn} transparent onPress={() => {this.pickImage() }}>
            <Text style={styles.textBtn} style={{fontFamily: Platform.select({ios:'HiraMinProN-W3', android: 'serif'})}}>美女を選ぶ</Text>
          </Button>

          {/* 投稿画面はデバックはActions.Posts() */}
          <Button style={styles.textBtn} transparent onPress={() => { this.addImage() }} >
            <Text style={styles.textBtn} style={{fontFamily: Platform.select({ios:'HiraMinProN-W3', android: 'serif'})}}>美女を追加する</Text>
          </Button>
        </View>

        
      </Container>     
    );
  }
}

const styles = StyleSheet.create({
  inputName: {
    height: hp('5%'),
    width: wp('80%'),
    marginTop: 25,
    backgroundColor: 'white',
  },
  textName: {
    textAlign: 'center',
  },
  cardSize: {
    marginTop: 35,
  },
  imageSize: {
    height: hp('52%'),
    width: null, 
    flex: 1
  },
  selectBtn:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  textBtn:{
    marginTop: 15,
  },
});
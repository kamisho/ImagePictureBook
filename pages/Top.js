import React, {Component} from 'react';
import { 
  StyleSheet, 
  Image,
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
  Text,
} from 'native-base';
import { 
  ImagePicker, 
  Permissions 
} from 'expo';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Actions } from "react-native-router-flux";
import firebase from '../firebase';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default class Top extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      image: ''
    }
  }

  componentDidMount = () => {
    Alert.alert("Welcom 美女図鑑")
  }

  onChangeText(e){
    this.setState({
      name: this.state.name
    });
  }

  pickImage = async () => {
    // カメラロールのパーミッション取得
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      if (permission.status !== 'granted') {
        // カメラロールの許可をユーザーに求める
        const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (newPermission.status === 'granted') {
          console.log("granted")
        }
      } else {
        console.log("error")
    } 

    // Image Pickerを起動する
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing : 画像を選択した後に編集するためのUIを表示するかどうか
      allowsEditing: true,
      // aspect : 編集時の縦横比・Androidのみ適用し、iPhoneは正方形にする
      aspect: [30, 30]
    });

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }

  addImage = () => {

    if(!this.state.name || !this.state.image){
      Alert.alert(
        'What"s woman"s name？',
        'Please add picture',
      );
    }else{ 
      const random = Math.random();
      this.uploadImage(this.state.image, this.state.name + random)
        .then(() => {
          console.log("success")
        })
        .catch(() => {
          console.log("failed")
        })
      Alert.alert("You add!")
    }
  }

  uploadImage = async(uri, imageName) => {
    const response = await fetch(uri)
    const blob = await response.blob();
    
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const ref = firebase.storage().ref().child("images/" + `${uid}/` + imageName);
    const db = firebase.firestore();
    
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

  render() {
    return (
      <Container style={{backgroundColor: "#ffc0cb"}}>
        <Header>
          <Body>
            <Title style={styles.appName}>美女図鑑</Title>
          </Body>
        </Header>

        <Content>
          <Body>
            <Item rounded style={styles.inputName}>
              <Input placeholder="Name" style={styles.textName} value={this.state.name} onChangeText={(text) => this.setState({name: text})} />
            </Item>
          </Body>
          
          <CardItem cardBody style={ styles.cardSize }>
            {this.state.image ?
              <Image source={{uri: this.state.image }} style={ styles.imageSize } /> : <Image source={require("../pictures/bijyo.png")} style={ styles.imageSize } />
            }
            {console.log(this.props.name)}
          </CardItem>
        </Content>

        <View style={styles.selectBtn}>
          <Button transparent onPress={() => {this.pickImage() }}>
            <Text style={styles.underBtn}>Select picture</Text>
          </Button>

          {/* 投稿画面はデバックはActions.Posts() */}
          <Button transparent onPress={() => { this.addImage() }} >
            <Text style={styles.underBtn}>add picture</Text>
          </Button>
        </View>
      </Container>     
    );
  }
}

const styles = StyleSheet.create({
  appName: {
    fontFamily: Platform.select({android: 'serif'}), 
    marginTop: scale(15),
    alignItems: "center"
  },
  inputName: {
    height: hp('5%'),
    width: wp('80%'),
    marginTop: scale(45),
    backgroundColor: 'white',
  },
  textName: {
    textAlign: 'center',
  },
  cardSize: {
    marginTop: "12%",
  },
  imageSize: {
    height: hp('48%'),
    width: null, 
    flex: 1,
  },
  selectBtn:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: moderateScale(30)
  },
  underBtn: {
    fontSize: moderateScale(22)
  }
});
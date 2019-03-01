import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableWithoutFeedback, 
  Dimensions, 
  Modal, 
  ScrollView,
  Alert,
  Share
} from 'react-native';
import ImageElement from './ImageElement';
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
} from 'native-base';
import {Platform } from 'react-native'
import { Actions } from "react-native-router-flux";
import firebase from '../firebase';
import FooterBtn from './FooterBtn';
import {
  AdMobBanner,
} from 'expo';
import axios from 'axios';
import { Buffer } from 'buffer/';

const adUnitID = Platform.OS == "android" ? "ca-app-pub-8344544670768968/3309132385" : "ca-app-pub-8344544670768968/3345815500"
export default class Posts extends Component{
  constructor(props){
    super(props);

    this.state = {
      modalVisible: false,
      modalImage: require('../pictures/bijyo.png'),
      name: '',
      image: '',
      items: [],
    };
  }

  componentWillMount(){

    const user = firebase.auth().currentUser;
    const uid = user.uid;
    
    // Initialize cloud firestore through Firebase
    const db = firebase.firestore();

    // postsコレクションからデータを取得
    db.collection("posts").orderBy("timestamp", "desc").get().then((querySnapshot) => {
      
      const posts = [];

      // forEachでドキュメントの配列が取れる
      querySnapshot.forEach((doc) => {
        
        // data()でドキュメントが取れる
        const document = doc.data();
          if(document.userId === "lwd1rWWSZca9qFeOKdP7uIB46pA3"){
            posts.push({
              name: document.bijoname,
              image: document.bijoimage,
              user: document.userId
            });
          }

          this.setState({
            items: posts,
            user: document.userId
          });
        })
      })
    }

  setModalVisible(visible, imageKey){
    this.setState({ modalImage: this.state.items[imageKey] });
    this.setState({ modalVisible: visible });
  }

  closeModal(visible, imageKey){
    this.setState({ modalVisible: visible });
  }

  deleteAlert = () => {
    Alert.alert(
      "本当に削除しますか？",
      "あなたの美女が削除されます",
      [
        {text: "Yes", onPress: () => this.deleteImage() },
        {text: "NO",  onPress: () => this.closeModal(false) },
      ],
      {cancelable: false}
    )
  }

  deleteImage = () => {
    const db = firebase.firestore();
    const modalImage = this.state.modalImage["image"].replace("/");
    db.collection("posts").doc(modalImage).delete().then(() => {
      // modalImage -> 投稿のURLというフィールドが取れてしまう
      console.log(modalImage)
    }).catch((error) => {
      console.log("error")
    })
  }

  shareSns = () => {
    // const image = {uri: this.state.modalImage}
    // Share.share({
    //   message: "Bijostagramから投稿",
    //   url: {uri: this.state.modalImage}
    // })

    const img = this.state.modalImage["image"]
    
    axios
      .get(img, {
        responseType: 'arraybuffer'
      })
      .then(response => {
        const image = Buffer.from(response.data).toString('base64');
        Share.share({
          title: "#美女図鑑",
          message: `Bijostagramから投稿\n\n美女画像 : ${img}`,
        },
        {
          dialogTitle: 'Share',
          excludedActivityTypes: [],
          tintColor: 'green'
        }
      );
    })
  }
  
  render(){

    const images = this.state.items.map((val, key) => {
      return <TouchableWithoutFeedback key={key} 
                onPress={() => { this.setModalVisible(true, key)} }>
                <View style={styles.imagewrap}>
                  <ImageElement imgsource={{uri: val.image}}></ImageElement>
                  <Text style={styles.bijyoName}>{val.name}</Text>
                </View>
              </TouchableWithoutFeedback>
      }
    );

    return(
      <Container>
      <Header />
        <Text style={styles.explanationApp}>あなたへの美女図鑑</Text>
        <ScrollView style={{ marginTop: 5 }}>
          <View style={styles.container}>
            <Modal style={styles.modal} animationType={'fade'}
                   transparent={true} visible={this.state.modalVisible}
                   onRequestClose={() => {}}>

            <View style={styles.modal}>
              <Text style={styles.text}
                onPress={() => {this.closeModal(false)}}>
                  Close
              </Text>
              {/* <Text style={styles.text}
                onPress={() => this.deleteAlert() }>
                  Delete
              </Text>   */}
                <ImageElement imgsource={{uri: this.state.modalImage["image"]}}></ImageElement>
                <Button style={styles.shareBtn} onPress={() => this.shareSns()}>
                  <Text style={styles.shareBtnText}>Let's share your 美女</Text>
                </Button>
            </View>
          </Modal>
        {images}
      </View> 
      </ScrollView>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={adUnitID}
        testDeviceID="EMULATOR"
      />
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  explanationApp: {
    marginTop: 3,
    backgroundColor: "pink",
    fontSize: 25,
    color: "white",
    height: 40,
    paddingTop: 5,
    width: '100%',
    justifyContent: 'center',
    textAlign: "center",
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eee', 
  },
  imagewrap: {
    margin: 2,
    padding: 2,
    height: (Dimensions.get('window').height/3.5) - 12,
    width: (Dimensions.get('window').width/2) - 4,
    backgroundColor: '#fff'
  },
  modal: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
  bijyoName: {
    textAlign: 'center',
  },
  shareBtn: {
    backgroundColor: "pink",
    width: '100%',
    justifyContent: 'center',
    textAlign: "center",
    marginBottom: 15
  },
  shareBtnText: {
    color: "white",
    fontSize: 20,
  }
});
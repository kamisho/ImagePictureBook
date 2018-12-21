import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, Modal, ScrollView  } from 'react-native';
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
import { Actions } from "react-native-router-flux";
import firebase from '../firebase';
import FooterBtn from './FooterBtn';

const database = firebase.database();

export default class Posts extends Component{
  constructor(props){
    super(props);

    this.state = {
      modalVisible: false,
      modalImage: require('../pictures/bijyo.jpg'),
      name: '',
      image: '',
      items: [],
    };
  }

  componentWillMount(){

    // Initialize cloud firestore through Firebase
    const db = firebase.firestore();

    // postsコレクションからデータを取得
    db.collection("posts").orderBy("timestamp", "desc").get().then((querySnapshot) => {
      
      const posts = [];

      // forEachでドキュメントの配列が取れる
      querySnapshot.forEach((doc) => {
        
        // data()でドキュメントが取れる
        const document = doc.data();
          posts.push({
            name: document.bijoname,
            image: document.bijoimage,
          });
          
          this.setState({
            items: posts
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

  getImage(){
    return this.state.modalImage;
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
      <ScrollView>
        <View style={styles.container}>
          <Modal style={styles.modal} animationType={'fade'}
                 transparent={true} visible={this.state.modalVisible}
                 onRequestClose={() => {}}>

            <View style={styles.modal}>
              <Text style={styles.text}
                onPress={() => {this.closeModal(false)}}>
                  Close
              </Text>
                { console.log(this.state.modalImage["image"]) }
                <ImageElement imgsource={{uri: this.state.modalImage["image"]}}></ImageElement>   
            </View>   
          </Modal>
        {images}
      </View> 
      </ScrollView>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});
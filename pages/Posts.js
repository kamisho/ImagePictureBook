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

  componentDidMount() {

  // Realtime Databseから値を持ってくるときのやり方
    // const itemsRef = firebase.database().ref('users');
    // itemsRef.on('value', (snapshot) => {
    //   let items = snapshot.val();
    //   let newState = [];
    //   for (let item in items) {
    //     newState.push({
    //       name: items[item].bijoname,
    //       image: items[item].bijoimage
    //     });
    //   }
    //   this.setState({
    //     items: newState
    //   });
    // });
  }

  setModalVisible(visible, imageKey){
    this.setState({ modalImage: this.state.image[imageKey] });
    this.setState({ modalVisible: visible });
  }

  getImage(){
    return this.state.modalImage;
  }

  render(){
    const images = this.state.items.map((val, key) => {
      console.log(val.image)
      return <TouchableWithoutFeedback key={key} 
                onPress={() => { this.setModalVisible(true, key)}}>
                <View style={styles.imagewrap}>
                  <ImageElement imgsource={{uri: val.image}}></ImageElement>
                  <Text style={styles.bijyoName}>{val.name}</Text>
                </View>
              </TouchableWithoutFeedback>
    });

    return(
      <Container>
      <ScrollView>
        <View style={styles.container}>
          <Modal style={styles.modal} animationType={'fade'}
                 transparent={true} visible={this.state.modalVisible}
                 onRequestClose={() => {}}>

            <View style={styles.modal}>
              <Text style={styles.text}
                onPress={() => {this.setModalVisible(false)}}>
                  Close
              </Text>
                <ImageElement imgsource={this.state.modalImage}></ImageElement>   
            </View>   
          </Modal>
        {images}
      </View> 
      </ScrollView>

      <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" onPress={Actions.Top} />
            </Button>
            <Button vertical onPress={Actions.Posts}>
              <Icon name="camera" />
            </Button>
          </FooterTab>
        </Footer>
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
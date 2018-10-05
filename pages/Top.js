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

export default class Top extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      image: '',
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
      aspect: [16, 9]
    });

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }

  addImage = () => {
    if(!this.state.name || !this.state.image){
      Alert.alert(
        '美女の名は？',
        '美女だけを追加してください。',
      );
    }else{
      const groupDto = {
        name: this.state.name,
        image: this.state.image
      };

      const db = firebase.firestore();
      db.collection('posts').add({
        bijoname: this.state.name,
        bijoimage: this.state.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
        Alert.alert("美女を追加しました")
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: "#ffc0cb"}}>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.headerTitle}>Bijyostagram</Title>
          </Body>
        </Header>

        <Content>
          <Body>
            <Item rounded style={styles.inputName}>
              <Input placeholder="美女名を入力" style={styles.textName} value={this.state.name} onChangeText={(text) => this.setState({name: text})} />
            </Item>
          </Body>
          
          <CardItem cardBody style={{ marginTop: 20}}>
           {this.state.image?
            <Image source={{uri: this.state.image }} style={{ height: 330, width: null, flex: 1}} /> : <Image source={require("../pictures/bijyo.jpg")} style={{ height: 330, width: null, flex: 1}} />
            }
            {console.log(this.props.name)}
          </CardItem>
        </Content>

        <View style={styles.selectBtn}>
          <Button transparent onPress={() => {this.pickImage() }}>
            <Text style={styles.textBtn}>美女を選ぶ</Text>
          </Button>

          {/* 投稿画面はデバックはActions.Posts() */}
          <Button transparent onPress={() => { this.addImage() }} >
            <Text style={styles.textBtn}>美女を追加する</Text>
          </Button>
        </View>

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
  headerTitle: {
    marginBottom: 10,
  },
  header: {
    height: 50,
  },
  inputName: {
    height: 35,
    width: 300,
    marginTop: 25,
    backgroundColor: 'white',
  },
  textName: {
    textAlign: 'center',
  },
  selectBtn:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  textBtn: {
    fontSize: 18,
    color: '#4169e1'
  }
});

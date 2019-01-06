import React, { Component } from 'react';
import { 
  View,
  Text,
  Linking
 } from 'react-native';

export default class Tutorial extends Component{
  render(){
    return(
      <View>
        <Text>↓使い方 ※Youtubeに移動します</Text>
        <Text style={{ color: "blue"}} onPress={() => Linking.openURL("https://www.youtube.com/watch?v=PYVFts0f7z4")}>Bijostagramの使い方</Text>
      </View>
    );
  }
}
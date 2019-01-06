import React, { Component } from 'react';
import { 
  View,
  Text,
  Linking
 } from 'react-native';
import Video from 'react-native-video';

export default class Tutorial extends Component{
  render(){
    return(
      <View>
        <Text style={{ color: "blue"}} onPress={() => Linking.openURL("https://www.youtube.com/watch?v=PYVFts0f7z4")}>使い方 ※Youtubeに移動します</Text>
      </View>
    );
  }
}
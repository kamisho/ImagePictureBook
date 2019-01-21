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
        <Text>↓How to user ※oepn youtube</Text>
        <Text style={{ color: "blue"}} onPress={() => Linking.openURL("https://www.youtube.com/watch?v=PYVFts0f7z4")}>How to use 美女図鑑</Text>
      </View>
    );
  }
}
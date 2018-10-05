import React, { Component } from 'react';
import {
  Container,  
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';
import {
    Actions,
} from 'react-native-router-flux';
import Posts from './Posts.js';
import Top from './Top.js';

export default class FooterBtn extends Component {
  constructor(props){
    super(props);

    this.state = {
      viewPageNum: 0,
    };
  }

  render(){
    <Container>
      {(() => {
        if(this.state.viewPageNum == 0){
          return(
            <Top />
          );
        }else{
          return(
            <Posts />
          );
        }
      })()}
      <Footer>
        <FooterTab>
          <Button
            vertical
            active={this.state.viewPageNum == 0}
            onPress={() => this.setState({
              viewPageNum: 0,
            })}
          >
            <Icon active={this.state.viewPageNum == 0} name='home'/>
          </Button>
          <Button
            vertical
            active={this.state.viewPageNum == 1}
            onPress={() => this.setState({
              viewPageNum: 1,
            })}
          >
            <Icon active={this.state.viewPageNum == 1} name='apps'/>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  }
}
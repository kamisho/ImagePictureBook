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
import Top from './Top';
import Posts from './Posts';

export default class FooterTabs extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewPageNum: 0,
    };
  }

  render(){
    return(
      // viewPageNumから画面選択する
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

        {/* 画面選択の下部にFooterボタンを置く */}
        {/* ボタンが押されるとviewPageNumが変化して、画面を変化させる */}
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
              <Icon active={this.state.viewPageNum == 1} name='star'/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
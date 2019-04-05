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
import Settings from './Settings';
import LaunchPage from './LaunchPage';
import OperatorPosts from "./OperatorPosts";
import TimeLine from "./TimeLine";

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
          }else if(this.state.viewPageNum == 1){
            return(
              <Posts />
            );
          }else if(this.state.viewPageNum == 2){
            return(
              <OperatorPosts />
            );
          }else if(this.state.viewPageNum == 3){
            return(
              <TimeLine />
            );
          }else if(this.state.viewPageNum == 4){
            return(
              <Settings />
            );
          }else{
            return(
              <LaunchPage />
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

            <Button
              vertical
              active={this.state.viewPageNum == 2}
              onPress={() => this.setState({
                viewPageNum: 2,
              })}
            >
              <Icon active={this.state.viewPageNum == 2} name='menu'/>
            </Button>

            <Button
              vertical
              active={this.state.viewPageNum == 3}
              onPress={() => this.setState({
                viewPageNum: 3
              })}
            >
              <Icon active={this.state.viewPageNum == 3} name="time" />
            </Button>

            <Button
              vertical
              active={this.state.viewPageNum == 4}
              onPress={() => this.setState({
                viewPageNum: 4
              })}
            >
              <Icon active={this.state.viewPageNum == 4} name="settings" />
            </Button>
            
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
import React, { Component } from 'react';
import {
  Scene,
  Router,
} from 'react-native-router-flux';
import FooterBtn from './pages/FooterBtn';
import Top from './pages/Top';
import Posts from './pages/Posts';
import LoginPage from './pages/LoginPage';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key='root' hideNavBar={true} >
          <Scene key="FooterBtn" component={FooterBtn} />
          <Scene key="LoginPage" component={LoginPage} initial={true} />
          <Scene key='Top' component={Top} />
          <Scene key='Posts' component={Posts}  />
        </Scene>
      </Router>
    );
  }
}
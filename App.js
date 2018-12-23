import React, { Component } from 'react';
import {
  Router,
  Scene
} from 'react-native-router-flux';
import FooterBtn from './pages/FooterBtn';
import LoginPage from './pages/LoginPage';
import Top from './pages/Top';
import Posts from './pages/Posts';

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* keyがシーンの識別子になる(別ページでAction.識別子 となる) */}
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
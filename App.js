import React, { Component } from 'react';
import {
  Scene,
  Router,
  Button,
} from 'react-native-router-flux';
import Top from './pages/Top';
import Posts from './pages/Posts';
import LoginPage from './pages/LoginPage';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key="LoginPage" component={LoginPage} initial={true} />
          <Scene key='Top' component={Top} />
          <Scene key='Posts' component={Posts}  />
        </Scene>
      </Router>
    );
  }
}
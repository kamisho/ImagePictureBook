import React, { Component } from 'react';
import {
  Scene,
  Router,
  Button,
} from 'react-native-router-flux';
import Top from './pages/Top';
import Posts from './pages/Posts';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='Top' component={Top} initial={true} />
          <Scene key='Posts' component={Posts}  />
        </Scene>
      </Router>
    );
  }
}
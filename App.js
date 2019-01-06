import React, { Component } from 'react';
import {
  Router,
  Scene
} from 'react-native-router-flux';
import FooterBtn from './pages/FooterBtn';
import LaunchPage from './pages/LaunchPage';
import Top from './pages/Top';
import Posts from './pages/Posts';
import LoginForm from './pages/LoginForm';
import SignInForm from './pages/SignInForm';
import EditProfile from './pages/EditProfile';
import Settings from "./pages/Settings";
import Tutorial from './pages/Tutorial';

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* keyがシーンの識別子になる(別ページでAction.識別子 となる) */}
        <Scene key='root' hideNavBar={true} >
          <Scene key="FooterBtn" component={FooterBtn} />
          <Scene key="LaunchPage" component={LaunchPage} initial={true} />
          <Scene key='Top' component={Top} />
          <Scene key='Posts' component={Posts} />
          <Scene key="LoginForm" component={LoginForm} hideNavBar={false} />
          <Scene key="SignInForm" component={SignInForm} hideNavBar={false} />
          <Scene key="Settings" component={Settings} />
          <Scene key="EditProfile" component={EditProfile} hideNavBar={false} />
          <Scene key="Tutorial" component={Tutorial} hideNavBar={false} />
        </Scene>
      </Router>
    );
  }
}
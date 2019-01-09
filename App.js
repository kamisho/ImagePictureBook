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
  constructor(props){
    super(props);
    this.state = {
      isReady: false
    }
  }
  // You started loading 'Roboto_medium', but used it before it finished loading対策
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

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
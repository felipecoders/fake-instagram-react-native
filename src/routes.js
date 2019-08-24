import React from 'react';
import {Image} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import Home from './pages/Home';
import Post from './pages/Post';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import logo from './assets/logo.png';

export default createAppContainer(
  createStackNavigator(
    {
      Home,
      Post,
      SignIn,
      SignUp,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerTintColor: '#000',
        headerTitle: <Image style={{marginHorizontal: 20}} source={logo} />,
        // headerTitle: 'Instagram',
        headerBackTitle: null,
      },
      mode: 'modal',
    },
  ),
);

'use strict';

import React, { AppRegistry } from 'react-native';
import Router from 'react-native-router';

import { MainPage } from './pages';

class Furtive extends React.Component {

  render () {
    return (
      <Router firstRoute={{name: 'Furtive', component: MainPage}} />
    );
  }

}

AppRegistry.registerComponent('furtive', () => Furtive);

'use strict';

import React, { AppRegistry, Navigator, View, Text } from 'react-native';
import NavBar from 'react-native-navbar';

import colors from './components/colors';
import { Toast } from './components/ui';
import { MainPage } from './pages';

class Furtive extends React.Component {

  renderScene (route, navigator) {
    const Component = route.component;

    if (route.param) { route.param = route.param.replace(/ /g, '-'); }

    return (
      <View style={{flex: 1}}>
        <NavBar title={route.title || 'Furtive'}
          route={route}
          navigator={navigator}
          backgroundStyle={{backgroundColor:colors.base02}}
          titleColor={colors.base0}/>
        <Component navigator={navigator} route={route} />
      </View>
    );
  }

  render () {
    return (
      <View style={{flex:1}}>
        <Navigator
          style={{backgroundColor:colors.base03}}
          renderScene={this.renderScene}
          initialRoute={{component: MainPage}}>
        </Navigator>
        <Toast />
      </View>
    );
  }

}

AppRegistry.registerComponent('furtive', () => Furtive);

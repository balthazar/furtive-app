'use strict';

import React, { AppRegistry, Navigator, View, Text } from 'react-native';

import { MainPage } from './pages';
import { NavBar } from './components/ui';

class Furtive extends React.Component {

  renderScene (route, navigator) {
    const Component = route.component;
    let nav = route.navigationBar;

    if (nav) {
      nav = React.addons.cloneWithProps(nav, {
        navigator, route
      });
    }

    return (
      <View style={{ flex: 1 }}>
        {nav}
        <Component navigator={navigator} route={route} />
      </View>
    );
  }

  render () {
    return (
      <Navigator
        renderScene={this.renderScene}
        initialRoute={{component: MainPage, navigationBar: NavBar}}>
      </Navigator>
    );
  }

}

AppRegistry.registerComponent('furtive', () => Furtive);

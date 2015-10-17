'use strict';

import React from 'react-native';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Furtive extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>
          Furtive is not supported on Android, Yet.
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
 },
});

AppRegistry.registerComponent('furtive', () => Furtive);

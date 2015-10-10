'use strict';

import React from 'react-native';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from './components/button';

class Furtive extends React.Component {

  render () {

    return (
      <View style={ styles.container }>

        <View>
          <Text style={ styles.welcome }>
            Hello. { '\n' }
          </Text>
          <TextInput
            style={ [styles.input] }
            onChangeText={ (username) => this.setState({ username }) }
            placeholder="username [a-Z0-9]"
            value={ this.state.username }
          />
          <TextInput
            style={ [styles.input, styles.margedTop] }
            secureTextEntry={ true }
            placeholder="password [a-Z0-9]"
            onChangeText={ (password) => this.setState({ password }) }
            value={ this.state.password }
          />
          <Button onPress={ this.connect } style={ [styles.xlMargedTop] }>
            Submit
          </Button>
        </View>

      </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  margedTop: {
    marginTop: 10
  },
  xlMargedTop: {
    marginTop: 20
  },
  input: {
    height: 40,
    width: 200
  },
  welcome: {
    fontSize: 25
  }
});

AppRegistry.registerComponent('furtive', () => Furtive);

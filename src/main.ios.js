'use strict';

import React from 'react-native';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import Router from 'react-native-router';

import Button from './components/ui/Button';

class ListPage extends React.Component {
  render () {
    return (
      <View><Text>coucou</Text></View>
    );
  }
}

class MainPage extends React.Component {

  componentWillMount () {
    this.setState({
      username: ''
    });
  }

  next () {
    this.props.toRoute({
      name: 'TEST',
      component: ListPage
    });
  }

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
            placeholder="username"
            value={ this.state.username }
          />
          <Button onPress={ ::this.next } style={ [styles.xlMargedTop] }>
            Submit
          </Button>
        </View>

      </View>
    );
  }

}

class Furtive extends React.Component {

  render () {
    return (
      <Router firstRoute={{name: 'Furtive', component: MainPage}} />
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

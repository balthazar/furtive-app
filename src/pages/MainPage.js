'use strict';

import React, { View, Text, TextInput, StyleSheet } from 'react-native';

import ListPage from './ListPage';
import Button from '../components/ui/Button';

export default class MainPage extends React.Component {

  componentWillMount () {
    this.setState({ username: '' });
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

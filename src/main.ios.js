'use strict';

var React = require('react-native');
var Button = require('./components/button');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text, TextInput
} = React;

var furtive = React.createClass({

  getInitialState () {
    return {
      username: '',
      password: ''
    };
  },

  connect () {

    fetch('http://localhost:3000/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ name: this.state.username, pass: this.state.password })
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.warn(error);
    });

  },

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

});

var styles = StyleSheet.create({
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

AppRegistry.registerComponent('furtive', () => furtive);

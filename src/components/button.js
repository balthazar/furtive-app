'use strict';

var React = require('react-native');
var { StyleSheet, Text, TouchableHighlight } = React;

var colors = require('./colors');

var Button = React.createClass({

  getInitialState () {
    return { active: false };
  },

  _onHighlight () {
    this.setState({ active: true });
  },

  _onUnhighlight () {
    this.setState({ active: false });
  },

  render () {

    var colorStyle = {
      color: this.state.active ? colors.cyan : colors.blue,
    };

    return (
      <TouchableHighlight
        onHideUnderlay={ this._onUnhighlight }
        onPress={ this.props.onPress }
        onShowUnderlay={ this._onHighlight }
        style={ [styles.button, this.props.style] }
        underlayColor="transparent">
          <Text style={ [styles.buttonText, colorStyle] }>{ this.props.children }</Text>
      </TouchableHighlight>
    );
  }

});

var styles = StyleSheet.create({
  button: {
    height: 40
  },
  buttonText: {
    fontSize: 18
  }
});

module.exports = Button;

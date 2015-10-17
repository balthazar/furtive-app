'use strict';

import React from 'react-native';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import colors from '../colors';

export default class HostItem extends React.Component {

  render () {
    return (
      <View style={style.container}>
        <Text style={style.data}>{this.props.data}</Text>
      </View>
    );
  }

};

const style = StyleSheet.create({

  container: {
    padding: 10,
    borderBottomColor: colors.base02,
    borderBottomWidth: 0.5
  },

  data: {
    color: colors.base0
  }

});

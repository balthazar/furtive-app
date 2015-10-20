'use strict';

import React from 'react-native';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import HostPage from '../../pages/HostPage';
import colors from '../colors';

export default class HostItem extends React.Component {

  open () {
    this.props.navigator.push({
      title: this.props.hostname,
      param: this.props.hostname,
      component: HostPage
    });
  }

  render () {
    return (
      <View style={style.container}>

        <TouchableHighlight
          onPress={::this.open}
          style={style.clickable}
          underlayColor='transparent'>
          <Text style={style.hostname}>{this.props.hostname}</Text>
        </TouchableHighlight>

      </View>
    );
  }

};

const style = StyleSheet.create({

  container: {
    borderBottomColor: colors.base02,
    borderBottomWidth: 0.5
  },

  clickable: {
    padding: 10
  },

  buttons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },

  hostname: {
    color: colors.base0
  }

});

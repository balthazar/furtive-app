'use strict';

import React from 'react-native';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../colors';

export default class HostItem extends React.Component {

  componentWillMount () {
    this.setState({ open: false });
  }

  toggle () {
    this.setState({ open: !this.state.open });
  }

  render () {
    return (
      <View style={style.container}>

        {this.state.open && (
          <TouchableHighlight
            onPress={::this.toggle}
            style={style.clickable}
            underlayColor={colors.base02}>
            <View>
              <Text style={style.data}>{this.props.data}</Text>
              <View style={style.buttons}>
                <Icon name='flash-off' style={{marginRight:10}} size={15} color={colors.base1} />
                <Icon name='play' size={15} color={colors.base1} />
              </View>
            </View>
          </TouchableHighlight>
        )}

        {!this.state.open && (
          <TouchableHighlight
            onPress={::this.toggle}
            style={style.clickable}
            underlayColor={colors.base02}>
            <Text style={style.data}>{this.props.data}</Text>
          </TouchableHighlight>
        )}

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

  data: {
    color: colors.base0
  }

});

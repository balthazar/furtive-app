'use strict';

import React, { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ErrorActions } from '../../actions';
import { ErrorStore } from '../../stores';
import colors from '../colors';

export default class Toast extends React.Component {

  constructor (props) {
    super(props);
    this.state = { msg: null };
    this.errorStoreChange = this.onChange.bind(this);
    this.timer = null;
  }

  componentDidMount () {
    ErrorStore.listen(this.errorStoreChange);
  }

  componentWillUnmount () {
    ErrorStore.unlisten(this.errorStoreChange);
  }

  onChange (state) {
    if (state.errorMessage) {
      if (this.timer) { clearTimeout(this.timer); }
      this.timer = setTimeout(() => { ErrorActions.clean(); }, 5e3);
    }
    this.setState({ msg: state.errorMessage });
  }

  onClose () {
    ErrorActions.clean();
  }

  render () {

    if (!this.state.msg) { return (<View></View>); }

    return (
      <View style={style.container}>
        <Text style={style.text}>{this.state.msg}</Text>
        <TouchableHighlight onPress={this.onClose} underlayColor='transparent'>
          <Icon name='close-circled' color={colors.base2}/>
        </TouchableHighlight>
      </View>
    );

  }

}

const style = StyleSheet.create({

  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.red
  },

  text: {
    flex: 9,
    color: colors.base2
  }

});

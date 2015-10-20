'use strict';

import React, { View, Text, StyleSheet } from 'react-native';

import { HostStore } from '../stores';
import { HostActions } from '../actions';
import colors from '../components/colors';

export default class HostPage extends React.Component {

  componentWillMount () {
    this.setState({ hostname: this.props.route.param });
    HostActions.getInfos(this.props.route.param);
  }

  componentDidMount () {
    HostStore.listen(this.onChange.bind(this));
  }

  componentWillUnMount () {
    HostStore.unlisten(this.onChange.bind(this));
  }

  onChange (state) {
    this.setState({ host: state.currentHost });
  }

  render () {
    return (
      <View style={style.container}>
        {this.state.host && (
          <Text style={{color:colors.base2}}>System: {this.state.host.data.system}</Text>
        )}
      </View>
    );
  }

}
const style = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15
  }

});

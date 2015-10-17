'use strict';

import { Text, View, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';

import colors from '../colors';

export default class RefreshIndicator extends React.Component {

  render () {

    return (
      <View style={style.content}>
        <Spinner type='Pulse' color={colors.base01}/>
      </View>
    );

  }

};

const style = StyleSheet.create({

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    marginTop: 10,
    marginBottom: 10
  }

});

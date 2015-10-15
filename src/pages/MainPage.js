'use strict';

import React, {
  View,
  ListView,
  Text,
  StyleSheet
} from 'react-native';

import { HostStore } from '../stores';
import { ReloadButton, Button } from '../components/ui';

export default class MainPage extends React.Component {

  constructor () {
    super();

    this.state = HostStore.getState();

    let lv = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state.dataSource = lv.cloneWithRows(this.state.hosts);
  }

  componentDidMount () {
    HostStore.listen(this.onChange.bind(this));
  }

  componentWillUnMount () {
    HostStore.unlisten(this.onChange.bind(this));
  }

  onChange (state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.hosts),
      hosts: state.hosts
    });
  }

  render () {
    return (
      <View style={styles.container}>

        <ReloadButton/>

        <ListView renderRow={(data) => <Text>{data}</Text>} dataSource={this.state.dataSource}></ListView>

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

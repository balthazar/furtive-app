'use strict';

import React, {
  View,
  ListView,
  Text,
  StyleSheet
} from 'react-native';

import q from 'q';
import Refreshable from 'react-native-refreshable-listview';
import Bonjour from 'react-native-bonjour';

import { HostStore } from '../stores';
import { HostActions } from '../actions';
import colors from '../components/colors';
import { RefreshIndicator, HostItem } from '../components/ui';

export default class MainPage extends React.Component {

  constructor () {
    super();

    this.state = HostStore.getState();

    let lv = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this._bonjour = new Bonjour();
    this._bonjour.scan('furtive');

    this._bonjour.on('update', () => {
      HostActions.updateHosts(this._bonjour.getServices());
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

  reloadHosts () {
    HostActions.updateHosts(this._bonjour.getServices());
  }

  render () {
    return (
      <View style={styles.container}>

        <Refreshable
          dataSource={this.state.dataSource}
          renderRow={(data) => <HostItem data={data}/>}
          loadData={::this.reloadHosts}
          refreshingIndictatorComponent={RefreshIndicator}/>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: colors.base03
  }
});

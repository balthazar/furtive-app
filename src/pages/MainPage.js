'use strict';

import React, {
  View,
  ListView,
  Text,
  StyleSheet
} from 'react-native';

import Refreshable from 'react-native-refreshable-listview';
import Bonjour from 'react-native-bonjour';

import colors from '../components/colors';
import { HostStore } from '../stores';
import { HostActions } from '../actions';
import { RefreshIndicator, HostItem } from '../components/ui';

export default class MainPage extends React.Component {

  constructor () {
    super();

    this.state = HostStore.getState();

    const lv = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this._bonjour = new Bonjour();
    this._bonjour.scan('furtive');

    // Start the bonjour scan using the furtive protocol
    this._bonjour.on('update', () => {
      HostActions.updateHosts(this._bonjour.getServices());
    });

    // Might have to be changed
    this.state = {
      dataSource: lv.cloneWithRows(this.state.hosts),
      hosts: this.state.hosts
    };
  }

  componentDidMount () {
    HostStore.listen(this.onChange.bind(this));
  }

  componentWillUnMount () {
    HostStore.unlisten(this.onChange.bind(this));
  }

  /**
   * When the list gets changed
   */
  onChange (state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.hosts),
      hosts: state.hosts
    });
  }

  /**
   * Reload the list manually
   */
  reloadHosts () {
    HostActions.updateHosts(this._bonjour.getServices());
  }

  render () {

    const hasHost = !!this.state.dataSource._cachedRowCount;

    return (
      <View style={styles.container}>

        {!hasHost && (
          <Text style={styles.text}>No host found.</Text>
        )}

        <Refreshable
          dataSource={this.state.dataSource}
          renderRow={data => <HostItem navigator={this.props.navigator} hostname={data}/>}
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
    alignItems: 'stretch'
  },
  text: {
    color: colors.base2,
    textAlign: 'center',
    marginTop: 10
  }
});

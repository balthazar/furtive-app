'use strict';

import React, {
  View,
  ListView,
  Text,
  StyleSheet,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

import Refreshable from 'react-native-refreshable-listview';
import Zeroconf from 'react-native-zeroconf';
import Icon from 'react-native-vector-icons/Ionicons';

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

    this._zeroconf = new Zeroconf();
    this._zeroconf.scan('furtive');

    // Start the zeroconf scan using the furtive protocol
    this._zeroconf.on('update', () => {
      HostActions.updateHosts(this._zeroconf.getServices());
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
    this._zeroconf.scan('furtive');
  }

  /**
   * Send the shutdown command to all hosts after prompt confirm
   */
  shutdown () {
    AlertIOS.alert('Are you sure?', '', [
      { text: 'Cancel', },
      { text: 'Yes', onPress: () => { HostActions.shutdownAll(this.state.hosts); } }
    ]);
  }

  render () {

    const hasHost = !!this.state.dataSource._cachedRowCount;

    return (
      <View style={style.container}>

        {!hasHost && (
          <Text style={[style.text, { marginTop: 10 }]}>No host found.</Text>
        )}

        {hasHost && (
          <TouchableHighlight onPress={::this.shutdown} underlayColor='transparent'>
            <View style={style.shutdown}>
              <Text style={[style.text, { marginRight: 5, color: colors.base02 }]}>Shutdown all</Text>
              <Icon name='flash-off'
                size={20}
                color={colors.base02}/>
            </View>
          </TouchableHighlight>
        )}

        <Refreshable
          minBetweenTime={1e3}
          dataSource={this.state.dataSource}
          renderRow={data => <HostItem navigator={this.props.navigator} hostname={data}/>}
          loadData={::this.reloadHosts}
          refreshingIndictatorComponent={RefreshIndicator}/>

      </View>
    );
  }

}

const style = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },

  shutdown: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.red
  },

  text: {
    color: colors.base2,
    textAlign: 'center'
  }

});

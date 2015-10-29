'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

import { HostStore } from '../stores';
import { HostActions } from '../actions';
import colors from '../components/colors';

export default class HostPage extends React.Component {

  constructor (props) {
    super(props);
    this.hostStoreChange = this.onChange.bind(this);
  }

  componentWillMount () {
    const hostname = this.props.route.param.replace(/ /g, '-');
    this.setState({ hostname, route: this.props.route.param });
    HostActions.getInfos(hostname);
  }

  componentDidMount () {
    HostStore.listen(this.hostStoreChange);
  }

  componentWillUnmount () {
    HostActions.cleanCurrent();
    HostStore.unlisten(this.hostStoreChange);
  }

  onChange (state) {
    if (!_.includes(state.hosts, this.state.route)) {
      this.props.navigator.pop();
    }
    this.setState({ host: state.currentHost });
  }

  /**
   * Shutdown the host
   */
  shutdown () {
    HostActions.shutdown(this.state.hostname);
  }

  /**
   * Mute the host
   */
  mute () {
    HostActions.mute(this.state.hostname);
  }

  /**
   * Prompt for the say command
   * Say str using OSX speech analysis
   */
  say () {
    AlertIOS.prompt('Say something', '', [
      { text: 'Cancel', },
      { text: 'Say', onPress: (str) => { HostActions.say(this.state.hostname, str); } }
    ]);
  }

  render () {
    return (
      <View style={style.container}>
        {this.state.host && (
          <View>
            <Text style={style.text}>System: {this.state.host.system}</Text>
            <View style={style.buttons}>

              {_.includes(['Darwin', 'Linux'], this.state.host.system) && (
                <TouchableHighlight onPress={::this.mute}
                  underlayColor='transparent'>
                  <View style={style.button}>
                    <Icon name='volume-mute'
                      size={20}
                      color={colors.base2}
                      style={{marginRight: 5}}/>
                    <Text style={{color: colors.base2}}>Mute volume</Text>
                  </View>
                </TouchableHighlight>
              )}

              {this.state.host.system === 'Darwin' && (
                <TouchableHighlight onPress={::this.say}
                  underlayColor='transparent'>
                  <View style={style.button}>
                    <Icon name='mic-c'
                      size={20}
                      color={colors.base2}
                      style={{marginRight: 5}}/>
                    <Text style={{color: colors.base2}}>Speech Synthesis</Text>
                  </View>
                </TouchableHighlight>
              )}

              <TouchableHighlight onPress={::this.shutdown}
                underlayColor='transparent'>
                <View style={style.button}>
                  <Icon name='flash-off'
                    size={20}
                    color={colors.base2}
                    style={{marginRight: 5}}/>
                  <Text style={{color: colors.base2}}>Shutdown</Text>
                </View>
              </TouchableHighlight>

            </View>
          </View>
        )}
      </View>
    );
  }

}
const style = StyleSheet.create({

  text: {
    color: colors.base2
  },

  buttons: {
    flex: 1,
    flexDirection: 'column',
  },

  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.base02,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  container: {
    flex: 1,
    padding: 15
  }

});

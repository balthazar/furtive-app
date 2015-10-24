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
   * Say str using OSX speech analysis
   */
  say (str) {
    HostActions.say(this.state.hostname, str);
  }

  /**
   * Mute the host
   */
  mute () {
    HostActions.mute(this.state.hostname);
  }

  /**
   * Prompt for the say command
   */
  promptSay () {
    AlertIOS.prompt('Say something', '', [
      { text: 'Cancel', },
      { text: 'Say', onPress: this.say.bind(this) }
    ]);
  }

  render () {
    return (
      <View style={style.container}>
        {this.state.host && (
          <View>
            <Text style={style.text}>System: {this.state.host.system}</Text>
            <View style={style.buttons}>

              <TouchableHighlight onPress={::this.shutdown}
                underlayColor='transparent'
                style={style.button}>
                <Icon name='flash-off'
                  size={20}
                  color={colors.base2}/>
              </TouchableHighlight>

              {_.includes(['Darwin', 'Linux'], this.state.host.system) && (
                <TouchableHighlight onPress={::this.mute}
                  underlayColor='transparent'
                  style={style.button}>
                  <Icon name='volume-mute'
                    size={20}
                    color={colors.base2}/>
                </TouchableHighlight>
              )}

              {this.state.host.system === 'Darwin' && (
                <TouchableHighlight onPress={::this.promptSay}
                  underlayColor='transparent'
                  style={style.button}>
                  <Icon name='mic-c'
                    size={20}
                    color={colors.base2}/>
                </TouchableHighlight>
              )}

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
    flexDirection: 'row',
  },

  button: {
    margin: 10
  },

  container: {
    flex: 1,
    padding: 15
  }

});

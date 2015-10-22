'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

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
    this.setState({ hostname: this.props.route.param });
    HostActions.getInfos(this.props.route.param);
  }

  componentDidMount () {
    HostStore.listen(this.hostStoreChange);
  }

  componentWillUnmount () {
    HostStore.unlisten(this.hostStoreChange);
  }

  onChange (state) {
    this.setState({ host: state.currentHost });
  }

  shutdown () {
    HostActions.shutdown(this.state.hostname);
  }

  say (str) {
    HostActions.say(this.state.hostname, str);
  }

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

              <TouchableHighlight onPress={::this.shutdown} underlayColor='transparent' style={style.button}>
                <Icon name='flash-off' size={20} color={colors.base2}/>
              </TouchableHighlight>

              {this.state.host.system === 'Darwin' && (
                <TouchableHighlight onPress={::this.promptSay} underlayColor='transparent' style={style.button}>
                  <Icon name='mic-c' size={20} color={colors.base2}/>
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

'use strict';

import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicatorIOS, TouchableHighlight } from 'react-native';
import Spinner from 'react-native-spinkit';

import colors from '../colors';

export default class ReloadButton extends React.Component {

  componentWillMount () {
    this.setState({ active: false });
  }

  _onHighlight () {
    this.setState({ active: true });
  }

  _noop () {}

  render () {

    if (!this.state.active) {
      return (
        <TouchableHighlight
          onPress={ this.props.onPress ? ::this.props.onPress : ::this._noop }
          onShowUnderlay={ ::this._onHighlight }
          underlayColor="transparent">
            <Icon name='ios-loop' size={30} />
        </TouchableHighlight>
      );
    }

    return (
      <Spinner type='Pulse' color={colors.base02}/>
    );
  }

};

'use strict';

import alt from '../alt';
import { HostActions } from '../actions';

class HostStore {

  constructor () {
    this.bindListeners({
      updateHosts: HostActions.updateHosts
    });

    this.state = {
      hosts: ['10.0.0.0']
    };
  }

  updateHosts (hosts) {
    this.setState({ hosts });
  }

}

export default alt.createStore(HostStore, 'HostStore');

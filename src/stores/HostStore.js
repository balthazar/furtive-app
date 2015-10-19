'use strict';

import alt from '../alt';
import { HostActions } from '../actions';

class HostStore {

  constructor () {
    this.state = { hosts: [] };

    this.bindListeners({
      updateHosts: HostActions.updateHosts
    });
  }

  updateHosts (hosts) {
    this.setState({ hosts });
  }

}

export default alt.createStore(HostStore, 'HostStore');

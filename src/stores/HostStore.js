'use strict';

import alt from '../alt';
import { HostActions } from '../actions';
import { HostSource } from '../sources';

class HostStore {

  constructor () {
    this.state = { hosts: [] };
    this.registerAsync(HostSource);

    this.bindListeners({
      updateHosts: HostActions.successGetHosts
    });
  }

  updateHosts (hosts) {
    this.setState({ hosts: hosts ? hosts : [] });
  }

}

export default alt.createStore(HostStore, 'HostStore');

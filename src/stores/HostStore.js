'use strict';

import alt from '../alt';
import { HostActions } from '../actions';

class HostStore {

  constructor () {
    this.state = {
      hosts: [],
      currentHost: null
    };

    this.bindListeners({
      updateHosts: HostActions.updateHosts,
      getInfos: HostActions.getInfos
    });
  }

  updateHosts (hosts) {
    this.setState({ hosts });
  }

  getInfos ({ name, data }) {
    this.setState({ currentHost: { name, data } });
  }

}

export default alt.createStore(HostStore, 'HostStore');

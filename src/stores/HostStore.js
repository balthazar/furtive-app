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
      getInfos: HostActions.getInfos,
      cleanCurrent: HostActions.cleanCurrent
    });
  }

  updateHosts (hosts) {
    this.setState({ hosts });
  }

  getInfos ({ name, data }) {
    data.name = name;
    this.setState({ currentHost: data });
  }

  cleanCurrent () {
    this.setState({ currentHost: null });
  }

}

export default alt.createStore(HostStore, 'HostStore');

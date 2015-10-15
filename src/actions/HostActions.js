'use strict';

import alt from '../alt';

class HostActions {

  updateHosts (hosts) {
    this.dispatch(hosts);
  }

}

export default alt.createActions(HostActions);

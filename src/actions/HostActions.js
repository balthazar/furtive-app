'use strict';

import alt from '../alt';

class HostActions {

  loadingHosts () {
    this.dispatch();
  }

  successGetHosts (hosts) {
    this.dispatch(hosts);
  }

  errorGetHosts (err) {
    this.dispatch(err);
  }

  successGetKnownHosts (knownHosts) {
    this.dispatch(knownHosts);
  }

  errorEgtKnownHosts (err) {
    this.dipatch(err);
  }

}

export default alt.createActions(HostActions);

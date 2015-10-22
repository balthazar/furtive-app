'use strict';

import alt from '../alt';

class ErrorActions {

  new (errorMessage) {
    return errorMessage;
  }

  clean () {
    return null;
  }

}

export default alt.createActions(ErrorActions);

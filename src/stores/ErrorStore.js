'use strict';

import alt from '../alt';
import { ErrorActions } from '../actions';

class ErrorStore {

  constructor () {
    this.state = {
      errorMessage: null
    };

    this.bindListeners({
      new: ErrorActions.new,
      clean: ErrorActions.clean
    });
  }

  new (errorMessage) {
    this.setState({ errorMessage });
  }

  clean () {
    this.setState({ errorMessage: null });
  }

}

export default alt.createStore(ErrorStore, 'ErrorStore');

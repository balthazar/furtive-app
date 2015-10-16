'use strict';

import q from 'q';
import async from 'async';
import { AsyncStorage } from 'react-native';
import Scanner from 'react-native-network-scan';

import { HostActions } from '../actions';

export default {

  getHosts: {

    remote () {
      Scanner.scan(function (res) {
        console.log(res);
      });
      return q();
    },

    loading: HostActions.loadingHosts,
    success: HostActions.successGetHosts,
    error: HostActions.errorGetHosts

  },

  getKnownHosts: {

    remote () {
      return AsyncStorage.getItem('hosts');
    },

    local (state) {
      console.log(state);
      return null;
    },

    success: HostActions.successGetKnownHosts,
    error: HostActions.errorGetKnownHosts

  }

};

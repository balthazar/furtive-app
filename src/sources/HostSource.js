'use strict';

import q from 'q';
import async from 'async';
import { AsyncStorage } from 'react-native';
import Scanner from 'react-native-network-scan';

import { HostActions } from '../actions';

const scan = new Scanner();

export default {

  getHosts: {

    remote () {
      scan.scan();

      scan.on('start', function () {
        console.log('Scanning started.');
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

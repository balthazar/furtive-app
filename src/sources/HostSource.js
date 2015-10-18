'use strict';

import q from 'q';
import async from 'async';
import { AsyncStorage } from 'react-native';
import Scanner from 'react-native-bonjour';

import { HostActions } from '../actions';

const scan = new Scanner();

export default {

  getHosts: {

    remote () {

      scan.scan();

      scan.on('start', () => { console.log('[Scanning] started.'); });
      scan.on('stop', () => { console.log('[Scanning] stopped.'); });

      // Mocking data.
      return q([
        '192.168.0.3',
        '192.168.0.4',
        '192.168.0.5',
        '192.168.0.7'
      ]);
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

'use strict';

import superagent from 'superagent';
import alt from '../alt';

import ErrorActions from './ErrorActions';

class HostActions {

  getInfos (name) {
    return (dispatch) => {
      superagent.get(`http://${name}.local:3000/api/system/infos`)
        .accept('json')
        .end((err, res) => {
          if (err) { return ErrorActions.new(res.body.message); }
          dispatch({ name, data: res.body });
        });
    };
  }

  say (name, str) {
    return (dispatch) => {
      superagent.put(`http://${name}.local:3000/api/system/say`)
        .send({ str })
        .accept('json')
        .end((err, res) => {
          if (err) { return ErrorActions.new(res.body.message); }
          dispatch({ name, data: res.body });
        });
    };
  }

  shutdown (name) {
    return (dispatch) => {
      superagent.put(`http://${name}.local:3000/api/system/shutdown`)
        .accept('json')
        .end((err, res) => {
          if (err) { return ErrorActions.new(res.body.message); }
          dispatch({ name, data: res.body });
        });
    };
  }

  fetchMpvInfos (name) {
    superagent.get(`http://${name}.local:3000/api/mpv/infos`)
      .accept('json')
      .end((err, res) => { console.log(err, res); });
  }

  playMpv (name) {
    superagent.put(`http://${name}.local:3000/api/mpv/play`)
      .accept('json')
      .end((err, res) => { console.log(err, res); });
  }

  pauseMpv (name) {
    superagent.put(`http://${name}.local:3000/api/mpv/pause`)
      .accept('json')
      .end((err, res) => { console.log(err, res); });
  }

  updateHosts (hosts) {
    return hosts;
  }

}

export default alt.createActions(HostActions);

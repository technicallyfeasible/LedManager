import ActionTypes from '../constants/ActionTypes';
import { CALL_API, Methods } from '../middleware/api';

/**
 * Adds a new timeline to the program
 * @returns {{type: *, appId: *, instance: *}}
 */
function addTimeline() {
  return {
    type: ActionTypes.Program.ADD_TIMELINE,
    instance: {},
  };
}

/**
 * Upload the program to the device
 */
function upload(device, program) {
  // device: 54ff74066678574930510867
  return {
    [CALL_API]: {
      endpoint: '/setProgram',
      method: Methods.POST,
      config: {
        url: {
          urlBase: 'https://api.particle.io/v1/devices/' + device,
        },
        headers: {
          access_token: '',
        },
      },
      params: {},
    },
  };
}

export default {
  addTimeline,
};

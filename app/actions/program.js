import ActionTypes from '../constants/ActionTypes';
import { CALL_API, Methods } from '../middleware/api';

/**
 * Adds a new timeline to the program
 */
function addTimeline() {
  return {
    type: ActionTypes.Program.ADD_TIMELINE,
    instance: [],
  };
}

/**
 * Adds a new block to the program
 */
function addBlock() {
  return {
    type: ActionTypes.Program.ADD_BLOCK,
    instance: {},
  };
}

/**
 * Add a new anchor in the specified location
 */
function addAnchor(blockId, location) {
  return {
    type: ActionTypes.Program.Block.ADD_ANCHOR,
    params: {
      blockId,
      location,
    },
  };
}

/**
 * Select an anchor for editing
 */
function selectAnchor(blockId, index) {
  return {
    type: ActionTypes.Program.Block.SELECT_ANCHOR,
    params: {
      blockId,
      index,
    },
  };
}

/**
 * Set the location of a color in a block
 */
function setColorLocation(blockId, index, location) {
  return {
    type: ActionTypes.Program.Block.SET_COLOR_LOCATION,
    params: {
      blockId,
      index,
      location,
    },
  };
}

/**
 * Set the color at a location in a block
 */
function setBlockColor(blockId, index, color) {
  return {
    type: ActionTypes.Program.Block.SET_COLOR,
    params: {
      blockId,
      index,
      color,
    },
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
  addBlock,
  addAnchor,
  selectAnchor,
  setColorLocation,
  setBlockColor,
  upload,
};

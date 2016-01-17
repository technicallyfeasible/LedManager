import ActionTypes from '../constants/ActionTypes';

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

export default {
  addTimeline,
};

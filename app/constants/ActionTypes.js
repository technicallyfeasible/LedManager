import mkconstants from 'mkconstants';

export default mkconstants('ActionTypes', {
  API: {
    REQUEST: null,
    SUCCESS: null,
    FAILURE: null,
  },
  Program: {
    ADD_TIMELINE: null,
    ADD_BLOCK: null,
    Block: {
      ADD_ANCHOR: null,
      SET_COLOR_LOCATION: null,
    },
  },
});

const I = require('immutable');

const initialState = I.fromJS({
  timeline: [],
  blocks: [],
});

function program(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default program;

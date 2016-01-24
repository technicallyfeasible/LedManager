import I from 'immutable';
import ActionTypes from '../constants/ActionTypes';

/*
  timelines: [
    [
      // time offset in ms
      time: number,
      blockId: number,
      duration: number,
      colors: [string],
    ]
  ],
  blocks: [
    // id of the block
    id: number,
    // length in ms
    duration: number,
    // list of colors and locations
    colors: {
      id: number,
      color: string,
      location: number,
    },
  ],
*/

const initialState = I.fromJS({
  timelines: [
    [
      // uses defaults for duration
      { time: 0, blockId: '1', colors: ['#000', '#00f', '#000'] },
      // uses defaults for colors
      { time: 500, blockId: '1', duration: 200 },
    ],
  ],
  blocks: {
    '1': {
      id: '1',
      duration: 100,
      colors: [
        { id: 0, color: '#000', location: 0.0 },
        { id: 0, color: '#0f0', location: 0.5 },
        { id: 0, color: '#000', location: 1.0 },
      ],
    },
  },
});

function program(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.Program.ADD_TIMELINE:
      const timelines = state.get('timelines');
      return state.set('timelines', timelines.push(I.fromJS(action.instance || [])));
    case ActionTypes.Program.ADD_BLOCK:
      // find a free blockId starting at 1
      let blockId = 1;
      for (; blockId < 256 && state.getIn(['blocks', blockId.toString()]); blockId++);
      // add the new block with some defaults and the new id
      const block = Object.assign({
        duration: 100,
        colors: [],
      }, action.instance || {}, {
        id: blockId,
      });
      const newState = state.setIn(['blocks', blockId], I.fromJS(block));
      console.log(newState.toJS());
      return newState;
    case ActionTypes.Program.Block.SET_COLOR_LOCATION:
      const params = action.params;
      return state.setIn(['blocks', params.blockId, 'colors', params.index, 'location'], params.location);
    default:
      return state;
  }
}

export default program;

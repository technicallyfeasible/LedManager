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
        { id: 0, color: '#00f', location: 0.69 },
        { id: 0, color: '#000', location: 1.0 },
      ],
    },
  },
  editor: {
    block: {
      id: null,
      index: -1,
      color: null,
    },
  },
});

function program(state = initialState, action) {
  const params = action.params;
  let newState = state;

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
        id: blockId.toString(),
      });
      return state.setIn(['blocks', blockId.toString()], I.fromJS(block));

    case ActionTypes.Program.Block.ADD_ANCHOR:
      const newColor = I.fromJS({
        id: 0, color: '#000', location: params.location,
      });
      const colors = state.getIn(['blocks', params.blockId, 'colors']).push(newColor).sort((a, b) => {
        return a.get('location') - b.get('location');
      });
      if (newState.getIn(['editor', 'block', 'id']) === params.blockId) {
        newState = newState.setIn(['editor', 'block', 'color'], newColor).setIn(['editor', 'block', 'index'], colors.indexOf(newColor));
      }
      return newState.setIn(['blocks', params.blockId, 'colors'], colors);

    case ActionTypes.Program.Block.SELECT_ANCHOR:
      const color = state.getIn(['blocks', params.blockId, 'colors', params.index]);
      return state.setIn(['editor', 'block', 'id'], params.blockId).setIn(['editor', 'block', 'index'], params.index).setIn(['editor', 'block', 'color'], color);

    case ActionTypes.Program.Block.SET_COLOR_LOCATION:
      return state.setIn(['blocks', params.blockId, 'colors', params.index, 'location'], params.location);

    case ActionTypes.Program.Block.SET_COLOR:
      // if we are changing the currently edited block and color then update there as well
      if (newState.getIn(['editor', 'block', 'id']) === params.blockId && newState.getIn(['editor', 'block', 'index']) === params.index) {
        newState = newState.setIn(['editor', 'block', 'color', 'color'], params.color);
      }
      return newState.setIn(['blocks', params.blockId, 'colors', params.index, 'color'], params.color);

    default:
      return state;
  }
}

export default program;

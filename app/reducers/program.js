const I = require('immutable');

/*
  timelines: [
    [
      // time offset in ms
      time: number,
      blockId: number,
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
      { time: 0, blockId: 1, colors: ['#000', '#0f0', '#000'] },
    ],
  ],
  blocks: [
    {
      id: 1,
      duration: 100,
      colors: [
        { id: 0, color: '#000', location: 0.0 },
        { id: 0, color: '#0f0', location: 0.5 },
        { id: 0, color: '#000', location: 1.0 },
      ],
    },
  ],
});

function program(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default program;

import {
  MainPage,
  ProgramEditor,
  BlockList,
  BlockEditor,
} from '../components';

/**
 * Predefined routes for the application
 */
export default {
  root() {
    return {
      name: 'LED Explorer',
      component: MainPage,
    };
  },
  editProgram(id) {
    return {
      name: 'Edit Program',
      component: ProgramEditor,
      id,
    };
  },
  blocks() {
    return {
      name: 'Blocks',
      component: BlockList,
    };
  },
  editBlock(id) {
    return {
      name: 'Edit Block',
      component: BlockEditor,
      id,
    };
  },
};

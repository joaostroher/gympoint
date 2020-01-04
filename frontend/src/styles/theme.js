import { darken } from 'polished';

const primary = '#FF0061';
const secondary = '#CCC';

export default {
  primary,
  secondary,
  dark: {
    primary: darken(0.08, primary),
  },
};

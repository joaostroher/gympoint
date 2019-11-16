import { darken } from 'polished';

const primary = '#FF0061';
export default {
  primary,
  dark: {
    primary: darken(0.08, primary),
  },
};

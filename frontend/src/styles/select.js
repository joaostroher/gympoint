import { transparentize } from 'polished';

import theme from './theme';

export default t => ({
  ...t,
  spacing: {
    ...t.spacing,
    controlHeight: 44,
  },
  colors: {
    ...t.colors,
    primary: theme.primary,
    primary25: transparentize(0.75, theme.primary),
    primary50: transparentize(0.5, theme.primary),
    primary75: transparentize(0.25, theme.primary),
  },
});

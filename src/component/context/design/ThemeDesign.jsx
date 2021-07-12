/* eslint-disable import/no-unresolved */
import {
  amber, indigo, grey,
} from '@material-ui/core/colors';

const green = {
  50: '#F0F8EB',
  100: '#D9EBCF',
  200: '#C0DEB0',
  300: '#A8D190',
  400: '#95C779',
  500: '#83BE64',
  600: '#76AE5A',
  700: '#639A4F',
  800: '#528644',
  900: '#336330',
};

export default {
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: amber[500],
    },
    info: indigo,
    action: indigo,
  },
  custom: {
    muted: {
      grey: grey[500],
    },
    facebook: { color: '#4267B2', background: 'transparent' },
    google: {
      background: 'conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      WebkitTextFillColor: 'transparent',
      // color: '#34a853',
    },
    twitter: { color: '#1DA1F2', background: 'transparent' },
  },
};

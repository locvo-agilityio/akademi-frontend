import { extendTheme } from '@chakra-ui/react';
import { bases } from './bases';
import { components } from './components';

export const theme = extendTheme({
  ...bases,
  components,
});

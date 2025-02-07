import { ThemeOverride } from '@chakra-ui/react';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

export const fonts = {
  body: 'Poppins, sans-serif',
  heading: 'Poppins, sans-serif',
};

export const fontSizes: ThemeOverride['fontSizes'] = {
  base: '14px',
  md: '18px',
  lg: '24px',
  xl: '36px',
};

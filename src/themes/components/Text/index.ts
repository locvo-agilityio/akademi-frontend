import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  baseStyle: {
    color: 'primary',
  },

  sizes: {
    base: {
      fontSize: 'sm',
      lineHeight: 5,
      color: 'smokeWhite',
    },
    md: {
      fontSize: 'md',
      lineHeight: 7,
    },
    lg: {
      fontSize: 'lg',
      lineHeight: 9,
    },
    xl: {
      fontSize: 'xl',
      lineHeight: '54px',
      color: 'darkBlue',
      fontWeight: 'bold',
    },
  },

  defaultProps: {
    size: 'base',
  },
});

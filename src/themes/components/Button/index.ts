import { defineStyleConfig } from '@chakra-ui/react';
import { fonts } from '@/themes/bases/typography';

const hoverDefault = {
  bg: 'primary',
  color: 'white',
};

export const Button = defineStyleConfig({
  baseStyle: {
    fontFamily: fonts.body,
    fontWeight: 'normal',
    borderRadius: '2xl',
    fontSize: 'md',
  },

  variants: {
    primary: {
      py: 4,
      border: '1px solid',
      borderColor: 'primary',
      bg: 'primary',
      color: 'white',
      _hover: {
        bg: 'white',
        color: 'primary',
      },
    },

    secondary: {
      py: 4,
      border: '1px solid',
      borderColor: 'primary',
      bg: 'white',
      color: 'primary',
      _hover: hoverDefault,
    },

    tertiary: {
      bg: 'coolGray',
      py: 4,
      color: 'primary',
      fontWeight: 'semibold',
      _hover: hoverDefault,
    },

    rounded: {
      border: '1px solid',
      color: 'smokeWhite',
      borderRadius: 'full',
      _hover: hoverDefault,
    },

    icon: {
      border: '1px solid',
      borderColor: 'lightPurple',
      bg: 'lightPurple',
      color: 'primary',
      borderRadius: 'full',
    },
  },

  defaultProps: {
    variant: 'primary',
  },
});

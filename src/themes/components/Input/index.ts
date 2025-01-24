import { defineStyleConfig } from '@chakra-ui/react';

export const Input = defineStyleConfig({
  baseStyle: {
    field: {
      fontSize: 'base',

      _placeholder: {
        color: 'smokeWhite',
      },
      _invalid: {
        borderColor: 'red',
        _focus: {
          borderColor: 'red',
        },
      },
    },
  },

  variants: {
    primary: {
      field: {
        color: 'primary',
        border: '1px solid',
        borderColor: 'primary',
      },
    },

    secondary: {
      field: {
        h: 14,
        pl: 14,
        bgColor: 'white',
        borderRadius: 'full',
        color: 'primary',
        fontSize: 'md',
        _focus: {
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'gray.200',
        },
        boxShadow: 'lg',
      },
    },
  },
});

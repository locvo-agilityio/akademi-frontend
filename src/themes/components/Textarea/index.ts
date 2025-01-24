import { defineStyleConfig } from '@chakra-ui/react';

export const Textarea = defineStyleConfig({
  baseStyle: {
    fontSize: 'base',
    color: 'primary',
    border: '1px solid',
    borderColor: 'primary',

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
});

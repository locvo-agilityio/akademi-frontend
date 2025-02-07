'use client';

import { ChangeEvent, memo } from 'react';
import {
  Input,
  InputProps,
  FormLabel,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react';

type TInputFieldProps = Omit<InputProps, 'onChange'> & {
  isError?: boolean;
  errorMessages?: string;
  label?: string;
  onChange: (value: string) => void;
};

const InputField = ({
  isError = false,
  errorMessages = 'Default error',
  label,
  onChange,
  ...rest
}: TInputFieldProps) => {
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void =>
    onChange(e.target.value);

  return (
    <FormControl isInvalid={isError}>
      {label && (
        <FormLabel
          fontSize="md"
          fontWeight="semibold"
          marginInlineEnd={0}
          minW="max-content"
          color={isError ? 'red' : 'darkBlue'}
        >
          {label}
        </FormLabel>
      )}

      <Input
        py={5}
        variant="primary"
        onChange={handleChangeValue}
        {...rest}
        isInvalid={isError}
      />
      {isError && (
        <FormErrorMessage color="red" fontSize="2xs">
          {errorMessages}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default memo(InputField);

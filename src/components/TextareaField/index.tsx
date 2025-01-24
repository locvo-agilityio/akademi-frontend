'use client';

import { ChangeEvent, memo } from 'react';
import {
  FormLabel,
  FormErrorMessage,
  FormControl,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';

type TTextareaFieldProps = Omit<TextareaProps, 'onChange'> & {
  isError?: boolean;
  errorMessages?: string;
  label?: string;
  onChange: (value: string) => void;
};

const TextareaField = ({
  isError = false,
  errorMessages = 'Default error',
  label = '',
  onChange,
  ...rest
}: TTextareaFieldProps) => {
  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>): void =>
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
          {label} *
        </FormLabel>
      )}

      <Textarea
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

export default memo(TextareaField);

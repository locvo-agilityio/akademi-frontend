'use client';

import { ChangeEvent, memo, useCallback } from 'react';
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react';

// Icons
import { SearchIcon } from '@/components/icons';

type TSearchBoxProps = Omit<InputProps, 'onChange'> & {
  onChange: (value: string) => void;
};

const SearchBox = ({ onChange, ...rest }: TSearchBoxProps) => {
  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => onChange(e.target.value),
    [onChange],
  );

  return (
    <InputGroup maxW={350}>
      <Input
        type="text"
        variant="secondary"
        placeholder="Search here..."
        onChange={handleChangeValue}
        {...rest}
      />
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={SearchIcon} boxSize={5} />}
        top={2}
        left={2}
      />
    </InputGroup>
  );
};

export default memo(SearchBox);

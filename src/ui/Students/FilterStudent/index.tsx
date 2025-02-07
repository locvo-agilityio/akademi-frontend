'use client';

import { Button, Flex, HStack, Icon, Select } from '@chakra-ui/react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEvent, useDeferredValue } from 'react';

// Components
import { SearchBox } from '@/components';

// Icons
import { ArrowIcon, PlusIcon } from '@/components/icons';

// Types
import { IFilter } from '@/types';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

interface IFilterStudentProps {
  filterOptions: IFilter[];
}

const FilterStudent = ({ filterOptions }: IFilterStudentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const deferredQuery = useDeferredValue(searchParams.get('search'), '');

  const handleSearch = (value: string) => {
    if (value) {
      searchParams.set('search', value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value) {
      searchParams.set('sort', value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('sort');
      setSearchParams(searchParams);
    }
  };

  return (
    <HStack w="full" justifyContent="space-between" mt={10}>
      <SearchBox defaultValue={deferredQuery || ''} onChange={handleSearch} />

      <Flex gap={6}>
        <Select
          aria-label="Sort"
          defaultValue={searchParams.get('sort') || filterOptions[0].value}
          variant="primary"
          icon={
            <Flex alignItems="center" mr={10}>
              <Icon as={ArrowIcon} boxSize={4} color="primary" />
            </Flex>
          }
          w={207}
          h="56px"
          borderRadius="full"
          cursor="pointer"
          pl={6}
          onChange={handleSort}
        >
          {filterOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Button
          as={Link}
          to={PUBLIC_ROUTERS.STUDENT_ADD}
          variant="primary"
          gap={2}
          w={210}
          h={14}
          borderRadius="full"
          title="New Student"
        >
          <PlusIcon /> New Student
        </Button>
      </Flex>
    </HStack>
  );
};

export default FilterStudent;

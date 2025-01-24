'use client';

import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEvent, useDeferredValue } from 'react';
import { Button, Flex, HStack, Icon, Select } from '@chakra-ui/react';

// Components
import { SearchBox } from '@/components';

// Icons
import { ArrowIcon, PlusIcon } from '@/components/icons';

// Types
import { IFilter } from '@/types';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

interface IFilterTeacherProps {
  filterOptions: IFilter[];
}

const FilterTeacher = ({ filterOptions }: IFilterTeacherProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const deferredQuery = useDeferredValue(searchParams.get('search') || '');

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
      <SearchBox defaultValue={deferredQuery} onChange={handleSearch} />

      <Flex gap={6}>
        <Select
          title="Sort"
          defaultValue={searchParams.get('sort') || filterOptions[0].value}
          onChange={handleSort}
          variant="primary"
          icon={
            <Flex alignItems="center" mr={10}>
              <Icon as={ArrowIcon} boxSize={4} color="primary" />
            </Flex>
          }
          w={207}
          h="56px"
          borderRadius="full"
          pl={6}
        >
          {filterOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Button
          title="New Teacher"
          as={Link}
          to={PUBLIC_ROUTERS.TEACHER_ADD}
          variant="primary"
          gap={2}
          w={210}
          h={14}
          borderRadius="full"
        >
          <PlusIcon /> New Teacher
        </Button>
      </Flex>
    </HStack>
  );
};

export default FilterTeacher;

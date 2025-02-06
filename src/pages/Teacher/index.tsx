import { VStack } from '@chakra-ui/react';

// Constants
import { FILTER_OPTIONS } from '@/constants';

// UI
import { FilterTeacher, ListTeachers } from '@/ui';

const Teacher = () => (
  <VStack>
    <FilterTeacher filterOptions={FILTER_OPTIONS} />

    <ListTeachers />
  </VStack>
);

export default Teacher;

import { VStack } from '@chakra-ui/react';

// UI
import { FilterStudent, TableStudents } from '@/ui';

// Constants
import { FILTER_OPTIONS } from '@/constants';

const Student = () => (
  <VStack>
    <FilterStudent filterOptions={FILTER_OPTIONS} />

    <TableStudents />
  </VStack>
);

export default Student;

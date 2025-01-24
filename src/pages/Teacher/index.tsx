import { lazy, Suspense } from 'react';
import { VStack } from '@chakra-ui/react';

// Constants
import { FILTER_OPTIONS } from '@/constants';

// UI
import { FilterTeacher } from '@/ui';

// Components
import { Fallback } from '@/components';

const ListTeachers = lazy(() => import('@/ui/Teachers/ListTeachers'));

const Teacher = () => (
  <VStack>
    <FilterTeacher filterOptions={FILTER_OPTIONS} />

    <Suspense fallback={<Fallback />}>
      <ListTeachers />
    </Suspense>
  </VStack>
);

export default Teacher;

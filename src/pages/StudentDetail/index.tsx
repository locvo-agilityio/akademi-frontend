'use client';

import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Box, HStack } from '@chakra-ui/react';

// Hooks
import { useGetStudent } from '@/hooks';

// UI
import { TablePayment } from '@/ui';

// Components
import { Fallback } from '@/components';

const Profile = lazy(() => import('@/ui/StudentDetail/Profile'));
const Schedule = lazy(() => import('@/ui/StudentDetail/Schedule'));

const StudentDetail = () => {
  const id = useParams().id || '';
  const { student } = useGetStudent(id);
  const { parentName, address, email, phone, schedule, avatar } =
    student?.data || {};

  return (
    <HStack
      gap={10}
      mt={5}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Box w="full">
        <Suspense fallback={<Fallback />}>
          <Profile
            parentName={parentName}
            address={address}
            email={email}
            phone={phone}
            avatar={avatar}
          />
        </Suspense>

        <TablePayment />
      </Box>

      <Suspense fallback={<Fallback />}>
        <Schedule schedules={schedule} />
      </Suspense>
    </HStack>
  );
};

export default StudentDetail;

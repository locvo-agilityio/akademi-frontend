'use client';

import { HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Hooks
import { useGetTeacher } from '@/hooks';

// Components
import { Fallback } from '@/components';

const ProfileTeacher = lazy(() => import('@/ui/TeacherDetail/Profile'));
const ScheduleTeacher = lazy(() => import('@/ui/TeacherDetail/Schedule'));

const TeacherDetail = () => {
  const id = useParams().id || '';
  const { teacher } = useGetTeacher(id);
  const {
    address = '',
    phone = '',
    email = '',
    photo = '',
    firstName = '',
    lastName = '',
    subject = '',
    degree = '',
    description = '',
    startEducation = '',
    endEducation = '',
    university = '',
    schedule = [],
    expertise = '',
  } = teacher?.data || {};

  return (
    <HStack
      gap={10}
      mt={5}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Suspense fallback={<Fallback />}>
        <ProfileTeacher
          address={address}
          phone={phone}
          email={email}
          avatar={photo}
          name={`${firstName} ${lastName}`}
          subject={subject}
          degree={degree}
          description={description}
          startEducation={startEducation}
          endEducation={endEducation}
          university={university}
          expertise={expertise}
        />

        <ScheduleTeacher schedules={schedule} />
      </Suspense>
    </HStack>
  );
};

export default TeacherDetail;

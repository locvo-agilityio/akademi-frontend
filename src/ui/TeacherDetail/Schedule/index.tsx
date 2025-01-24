import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Button, Flex, Text, VStack } from '@chakra-ui/react';

// Components
import { CardSchedule } from '@/components';

// Utils
import { formatDate } from '@/utils';

// Types
import { ISchedule } from '@/types';

interface IScheduleProps {
  schedules?: ISchedule[];
}

const ScheduleTeacher = ({ schedules = [] }: IScheduleProps) => (
  <VStack display={{ base: 'none', xl: 'flex' }} w={418} gap={6}>
    <Flex
      w="full"
      direction="column"
      borderRadius="2xl"
      bgColor="white"
      gap={2}
      p={8}
    >
      <Text as="h3" size="lg" fontWeight="bold" color="darkBlue">
        Schedule Details
      </Text>
      <Text as="p" color="whiteSmoke">
        {formatDate(String(new Date()))}
      </Text>
    </Flex>

    {schedules.map((item) => (
      <CardSchedule key={item.id} {...item} />
    ))}

    <Button
      w="full"
      mt={6}
      p={7}
      variant="tertiary"
      borderRadius="full"
      disabled
    >
      View More
    </Button>
  </VStack>
);

export default memo(ScheduleTeacher, isEqual);

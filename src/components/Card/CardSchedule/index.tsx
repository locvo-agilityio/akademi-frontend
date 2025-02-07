import { memo } from 'react';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';

// Icons
import { CalendarIcon, ClockIcon } from '@/components/icons';

interface CardScheduleProps {
  subject: string;
  lesson: string;
  avatar?: string;
  time: string;
  date: string;
  colorLesson?: string;
}

const CardSchedule = ({
  subject,
  lesson,
  avatar = '',
  colorLesson = 'primary',
  time,
  date,
}: CardScheduleProps) => (
  <Card
    p={5}
    w="full"
    gap={4}
    borderLeft="24px solid"
    borderColor={colorLesson}
    borderRadius="2xl"
    _hover={{ boxShadow: '2xl' }}
  >
    <CardHeader p={0}>
      <Text as="p" mt={6} fontSize="md" fontWeight="bold" color="darkblue">
        {lesson}
      </Text>
      <Text mt={4} as="span" color="whiteSmoke">
        {subject}
      </Text>
    </CardHeader>

    <CardBody p={0} display="flex" justifyContent="space-between" gap={2}>
      <Flex gap={2} flexDirection="column">
        <Flex gap={2} color="whiteSmoke" alignItems="center">
          <Icon as={CalendarIcon} boxSize={6} color="secondary" />
          <Text as="span">{date}</Text>
        </Flex>
        <Flex gap={2} as="span" color="whiteSmoke" alignItems="center">
          <Icon as={ClockIcon} boxSize={6} color="yellow" />
          <Text as="span">{time}</Text>
        </Flex>
      </Flex>

      {avatar && (
        <VStack>
          <Avatar size="md" name={subject} src={avatar} />
        </VStack>
      )}
    </CardBody>
  </Card>
);

export default memo(CardSchedule);

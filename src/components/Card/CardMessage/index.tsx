import { memo } from 'react';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';

interface CardMessageProps {
  name: string;
  content: string;
  avatar?: string;
  time: string;
}

const CardMessage = ({
  name,
  content,
  avatar = '',
  time,
}: CardMessageProps) => (
  <Card
    p={5}
    w="full"
    display="flex"
    flexDirection="row"
    gap={4}
    boxShadow="none"
    borderBottom="1px solid"
    borderColor="lightGray"
    borderRadius="none"
  >
    <CardHeader p={0} display="flex" gap={6}>
      <VStack>
        <Avatar size="md" name={name} src={avatar} />
      </VStack>
    </CardHeader>

    <CardBody
      p={0}
      display="flex"
      flexDirection="column"
      alignItems="left"
      gap={1}
    >
      <Flex justifyContent="space-between">
        <Text as="p" fontWeight="bold" color="darkblue">
          {name}
        </Text>
        <Text as="span" color="gray.600">
          {time}
        </Text>
      </Flex>
      <Text as="span" color="gray.600" whiteSpace="break-spaces" noOfLines={1}>
        {content}
      </Text>
    </CardBody>
  </Card>
);

export default memo(CardMessage);

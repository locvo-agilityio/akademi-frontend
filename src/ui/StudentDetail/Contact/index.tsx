import { memo } from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';

import {
  LocationIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from '@/components/icons';

interface ContactProps {
  parentName: string;
  address: string;
  phone: string;
  email: string;
}

const Contact = ({ parentName, address, phone, email }: ContactProps) => (
  <Flex
    w="full"
    mt={160}
    p={8}
    gap={6}
    justifyContent="space-between"
    flexWrap={{ base: 'wrap', xl: 'nowrap' }}
  >
    <Flex w="full" gap={2} flexDirection="column">
      <Text size="md" color="whiteSmoke">
        Parents:
      </Text>
      <Flex gap={2} alignItems="center">
        <Flex
          w={10}
          h={10}
          borderRadius="full"
          bgColor="secondary"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={UserIcon} boxSize={6} color="white" />
        </Flex>
        <Text size="md" color="darkBlue" fontWeight="semibold">
          {parentName}
        </Text>
      </Flex>
    </Flex>

    <Flex w="full" gap={2} flexDirection="column">
      <Text size="md" color="whiteSmoke">
        Address:
      </Text>
      <Flex gap={2} alignItems="center">
        <Flex
          w={10}
          h={10}
          borderRadius="full"
          bgColor="secondary"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={LocationIcon} boxSize={6} color="white" />
        </Flex>
        <Text size="md" color="darkBlue" fontWeight="semibold">
          {address}
        </Text>
      </Flex>
    </Flex>

    <Flex w="full" gap={2} flexDirection="column">
      <Text size="md" color="whiteSmoke">
        Phone:
      </Text>
      <Flex gap={2} alignItems="center">
        <Flex
          w={10}
          h={10}
          borderRadius="full"
          bgColor="secondary"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={PhoneIcon} boxSize={6} color="white" />
        </Flex>
        <Text size="md" color="darkBlue" fontWeight="semibold">
          {phone}
        </Text>
      </Flex>
    </Flex>

    <Flex w="full" gap={2} flexDirection="column">
      <Text size="md" color="whiteSmoke">
        Email:
      </Text>
      <Flex gap={2} alignItems="center">
        <Flex
          w={10}
          h={10}
          borderRadius="full"
          bgColor="secondary"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={MailIcon} boxSize={6} color="white" />
        </Flex>
        <Text size="md" color="darkBlue" fontWeight="semibold">
          {email}
        </Text>
      </Flex>
    </Flex>
  </Flex>
);

export default memo(Contact);

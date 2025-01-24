import { memo } from 'react';
import { Flex, HStack, Icon as IconChakra, Text } from '@chakra-ui/react';

// Constants
import { TEACHER_CONTACT } from '@/constants';

interface ContactProps {
  address: string;
  phone: string;
  email: string;
}

const Contact = ({ address, phone, email }: ContactProps) => (
  <HStack w={{ base: 'full', xl: '80%' }} justifyContent="space-between">
    {TEACHER_CONTACT(address, phone, email).map(({ id, title, icon: Icon }) => (
      <Flex key={id} gap={2} alignItems="center">
        <Flex
          w={10}
          h={10}
          borderRadius="full"
          bgColor="secondary"
          alignItems="center"
          justifyContent="center"
        >
          <IconChakra as={Icon} boxSize={6} color="white" />
        </Flex>
        <Text size="md" color="darkBlue" fontWeight="semibold">
          {title}
        </Text>
      </Flex>
    ))}
  </HStack>
);

export default memo(Contact);

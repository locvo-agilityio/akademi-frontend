import { Flex, Text, VStack } from '@chakra-ui/react';

// Components
import { Logo } from './Logo';
import Menu from './Menu';

const Sidebar = () => (
  <VStack w="345px" minH="100vh" gap={0} bgColor="primary">
    <Logo />
    <Menu />

    <Flex pt="80px" flexDirection="column" color="white" gap={4}>
      <Text as="p" fontWeight="bold">
        Akademi - School Admission Dashboard
      </Text>

      <Text as="span" fontSize="sm">
        Made with{' '}
        <Text as="span" fontSize="sm" color="red">
          ♥
        </Text>{' '}
        by Peterdraw
      </Text>
    </Flex>
  </VStack>
);

export default Sidebar;

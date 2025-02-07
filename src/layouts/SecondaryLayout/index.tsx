import { Box, Flex, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

// Components
import { Header, Sidebar } from '@/components';

// Mocks
import { MOCK_ADMIN } from '@/__mocks__';

interface SecondaryLayoutProps {
  title?: string;
}

const SecondaryLayout = ({ title }: SecondaryLayoutProps) => {
  const { name, role, avatar } = MOCK_ADMIN;
  return (
    <Flex position="absolute" w="full" alignItems="stretch">
      <Sidebar />

      <VStack
        flex={1}
        p={50}
        bgColor="lightPurple"
        alignItems="stretch"
        overflow="hidden"
      >
        <Header title={title} avatar={avatar} name={name} role={role} />
        <Box flex={1} overflowY="auto">
          <Outlet />
        </Box>
      </VStack>
    </Flex>
  );
};

export default SecondaryLayout;

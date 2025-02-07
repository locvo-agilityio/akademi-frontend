import { Box, Flex, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

// Components
import { Header, Sidebar } from '@/components';

// Layouts
import WidgetLayout from '../WidgetLayout';

const MainLayout = () => (
  <Flex position="absolute" w="100dvw" bgColor="gray.50" alignItems="stretch">
    <Sidebar />

    <VStack
      flex={1}
      p="40px"
      bgColor="lightPurple"
      alignItems="stretch"
      overflow="hidden"
    >
      <Header isDashboard={true} title="Dashboard" />
      <Box flex={1} overflowY="auto">
        <Outlet />
      </Box>
    </VStack>

    <WidgetLayout />
  </Flex>
);

export default MainLayout;

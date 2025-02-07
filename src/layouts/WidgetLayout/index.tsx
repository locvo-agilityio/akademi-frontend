import { VStack } from '@chakra-ui/react';

// Mocks
import { MOCK_ADMIN } from '@/__mocks__';

// Components
import { MenuHeader } from '@/components';

// UI
import { WidgetFoods, WidgetMessages } from '@/ui';

const WidgetLayout = () => (
  <VStack
    display={{ base: 'none', xl: 'flex' }}
    maxW={395}
    bgColor="white"
    minH="100vh"
    py={10}
    px={8}
  >
    <MenuHeader {...MOCK_ADMIN} />

    <WidgetMessages />

    <WidgetFoods />
  </VStack>
);

export default WidgetLayout;

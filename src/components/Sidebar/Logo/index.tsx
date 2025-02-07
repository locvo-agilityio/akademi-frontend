import { Box, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Icons
import { LogoIcon } from '@/components/icons';

export const Logo = () => (
  <Box w="full">
    <Link to="/">
      <VStack flexDirection="row" alignItems="center" gap={4} w="full" p={8}>
        <LogoIcon />
        <Text as="h1" color="white" fontSize="xl" fontWeight="bold">
          Akademi
        </Text>
      </VStack>
    </Link>
  </Box>
);

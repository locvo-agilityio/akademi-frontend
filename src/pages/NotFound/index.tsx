import { Text, VStack } from '@chakra-ui/react';

const NotFound = () => (
  <VStack
    h="full"
    justifyContent="center"
    alignItems="center"
    fontSize="lg"
    fontWeight="bold"
  >
    <Text size="xl">Page Not Found</Text>
  </VStack>
);

export default NotFound;

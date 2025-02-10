import { Box, Button, Flex, Text } from '@chakra-ui/react';

// Mocks
import { MOCK_MESSAGES } from '@/__mocks__';

// Components
import { CardMessage } from '@/components';

const WidgetMessages = () => (
  <Flex direction="column" w="full" mt={3} justifyContent="left">
    <Text as="h3" size="lg" fontWeight="bold" color="darkBlue">
      Messages
    </Text>

    <Box mt={4}>
      {MOCK_MESSAGES.map((item) => (
        <CardMessage key={item.name} {...item} />
      ))}

      <Button
        w="full"
        mt={6}
        p={7}
        variant="tertiary"
        borderRadius="full"
        cursor="not-allowed"
      >
        View More
      </Button>
    </Box>
  </Flex>
);

export default WidgetMessages;

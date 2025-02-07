import { Button, Flex, Text } from '@chakra-ui/react';

// Mocks
import { MOCK_FOODS } from '@/__mocks__';

// Components
import { CardFood } from '@/components';

const WidgetFoods = () => (
  <Flex direction="column" w="full" mt={5} justifyContent="left">
    <Text as="h3" size="lg" fontWeight="bold" color="darkBlue">
      Current Foods Menu
    </Text>

    <Flex direction="column" gap={6} mt={4}>
      {MOCK_FOODS.map((item) => (
        <CardFood key={item.name} {...item} />
      ))}

      <Button w="full" mt={6} p={7} variant="tertiary" borderRadius="full">
        View More
      </Button>
    </Flex>
  </Flex>
);

export default WidgetFoods;

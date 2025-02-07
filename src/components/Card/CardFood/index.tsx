import { memo } from 'react';
import { Image, Card, CardBody, CardHeader, Text, Box } from '@chakra-ui/react';

interface CardFoodProps {
  name: string;
  content: string;
  image?: string;
}

const CardFood = ({ name, content, image = '' }: CardFoodProps) => (
  <Card
    maxW={312}
    boxShadow="none"
    borderBottom="1px solid"
    borderColor="lightGray"
    borderRadius="none"
  >
    <CardHeader p={0} display="flex" gap={6}>
      <Box w="full" h="160px">
        <Image
          w="full"
          h="full"
          objectFit="cover"
          borderRadius="lg"
          src={image}
          alt="Food Image"
        />
      </Box>
    </CardHeader>

    <CardBody
      p={0}
      display="flex"
      flexDirection="column"
      alignItems="left"
      gap={1}
      mt={6}
    >
      <Text as="p" fontSize="md" fontWeight="bold" color="darkblue">
        {name}
      </Text>
      <Text as="span" color="gray.600" whiteSpace="break-spaces" noOfLines={1}>
        {content}
      </Text>
    </CardBody>
  </Card>
);

export default memo(CardFood);

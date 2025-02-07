import { memo, ReactNode } from 'react';
import { Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react';

interface CardSummaryProps {
  bgIcon: string;
  title: string;
  total: number;
  icon: ReactNode;
}

const CardSummary = ({ bgIcon, title, total, icon }: CardSummaryProps) => (
  <Card
    p={5}
    w="100%"
    display="flex"
    flexDirection={{ md: 'column', xl: 'row' }}
    alignItems="center"
    gap={4}
    boxShadow="none"
    borderRadius="none"
    bgColor="transparent"
  >
    <CardHeader p={0} display="flex" gap={6}>
      <Flex
        w={{ base: '48px', md: '72px' }}
        h={{ base: '48px', md: '72px' }}
        textAlign="center"
        borderRadius="full"
        bgColor={bgIcon}
        color="white"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </Flex>
    </CardHeader>

    <CardBody
      p={0}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={4}
    >
      <Text as="p" fontSize={{ base: 'sm', md: 'md' }} color="gray.600">
        {title}
      </Text>
      <Text
        as="span"
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="bold"
        color="darkBlue"
      >
        {total}
      </Text>
    </CardBody>
  </Card>
);

export default memo(CardSummary);

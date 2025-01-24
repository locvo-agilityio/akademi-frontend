import { Flex, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';

interface IInformationProps {
  description: string;
  degree: string;
  university: string;
  expertise: string;
  startEducation: string;
  endEducation: string;
}

const Information = ({
  description,
  degree,
  university,
  expertise,
  startEducation,
  endEducation,
}: IInformationProps) => {
  const isEducation = degree && university && startEducation && endEducation;

  return (
    <VStack w="50%" mt={10} mb={10} alignItems="flex-start">
      <Flex direction="column">
        <Text as="h3" size="lg" fontWeight="bold" color="darkBlue">
          About:
        </Text>

        <Text mt={4} as="p" size="md" textAlign="justify" color="darkBlue">
          {description}
        </Text>
      </Flex>

      <Flex mt={7} direction="column">
        <Text as="h3" size="lg" fontWeight="bold" color="darkBlue">
          Education:
        </Text>

        {isEducation && (
          <UnorderedList mt={4}>
            <ListItem
              fontSize="md"
              flexDirection="column"
              fontWeight="semibold"
              color="darkBlue"
            >
              {degree}, {university}
            </ListItem>
            <Text as="span" size="md" color="whiteSmoke">
              {startEducation} - {endEducation}
            </Text>
          </UnorderedList>
        )}
      </Flex>

      <Flex mt={8} direction="column">
        <Text as="h3" size="lg" fontWeight="bold" color="darkBlue">
          Expertise:
        </Text>

        <Text mt={4} as="p" size="md" textAlign="justify" color="darkBlue">
          {expertise}
        </Text>
      </Flex>
    </VStack>
  );
};

export default Information;

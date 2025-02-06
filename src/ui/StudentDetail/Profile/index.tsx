import { Avatar, Box, Flex, Image, Text, VStack } from '@chakra-ui/react';

// Images
import BgStudent from '@/images/bg-student.webp';

// Components
import Contact from '../Contact';

interface IProfileProps {
  email?: string;
  phone?: string;
  address?: string;
  parentName?: string;
  avatar?: string;
}

const Profile = ({
  email = '',
  phone = '',
  address = '',
  parentName = '',
  avatar = '',
}: IProfileProps) => (
  <VStack
    w="full"
    flexDirection="column"
    minH={498}
    borderRadius="2xl"
    bgColor="white"
    justifyContent="space-between"
  >
    <Box
      w="full"
      h={200}
      position="relative"
      bgColor="primary"
      borderTopRadius="2xl"
    >
      <Image
        w="full"
        h={200}
        objectFit="cover"
        objectPosition="right"
        src={BgStudent}
        alt="Background Student"
      />

      <Box position="absolute" top="50%" left={8} w="full">
        <Flex
          w={160}
          h={160}
          borderRadius="full"
          bgColor="white"
          align="center"
          justify="center"
        >
          <Avatar w="full" h="full" p={2} src={avatar} />
        </Flex>

        <Text as="h2" size="lg" mt={6} fontWeight="bold" color="darkBlue">
          {parentName}
        </Text>
        <Text as="p" mt={2} color="whiteSmoke">
          Student
        </Text>
      </Box>
    </Box>

    <Contact
      email={email}
      parentName={parentName}
      address={address}
      phone={phone}
    />
  </VStack>
);

export default Profile;

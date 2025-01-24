'use client';

import { memo } from 'react';
import { Avatar, Box, Flex, Image, Text, VStack } from '@chakra-ui/react';

// Images
import BgTeacher from '@/images/bg-teacher.webp';

// Components
import Contact from '../Contact';

// Components
import Information from '../Information';

interface IProfileTeacherProps {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  avatar?: string;
  address?: string;
  description?: string;
  degree?: string;
  university?: string;
  expertise?: string;
  startEducation?: string;
  endEducation?: string;
}

const ProfileTeacher = ({
  name = '',
  email = '',
  phone = '',
  subject = '',
  avatar = '',
  address = '',
  description = '',
  degree = '',
  university = '',
  expertise = '',
  startEducation = '',
  endEducation = '',
}: IProfileTeacherProps) => (
  <VStack
    w="full"
    flexDirection="column"
    borderRadius="2xl"
    bgColor="white"
    justifyContent="space-between"
    alignItems="flex-start"
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
        src={BgTeacher}
        alt="Background Student"
      />

      <Box position="absolute" maxW={200} top="50%" left={8} w="full">
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
          {name}
        </Text>
        <Text as="p" mt={2} color="whiteSmoke" fontWeight="semibold">
          {subject} Teacher
        </Text>
      </Box>
    </Box>

    <Flex mt={160} p={8} w="full" flexDirection="column">
      <Contact email={email} address={address} phone={phone} />

      <Information
        degree={degree}
        university={university}
        expertise={expertise}
        description={description}
        startEducation={startEducation}
        endEducation={endEducation}
      />
    </Flex>
  </VStack>
);

export default memo(ProfileTeacher);

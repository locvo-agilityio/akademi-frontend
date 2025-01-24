import { Avatar, Button, Flex, HStack, Icon, Text } from '@chakra-ui/react';

// Icons
import { BellIcon, SettingIcon } from '../icons';

interface MenuHeaderProps {
  name: string;
  role: string;
  avatar?: string;
}

const MenuHeader = ({ name, role, avatar = '' }: MenuHeaderProps) => (
  <HStack gap={6}>
    <Flex gap={5}>
      <Button
        aria-label="Notification"
        w="60px"
        h="60px"
        bgColor="white"
        boxShadow="2xl"
        variant="icon"
      >
        <Icon as={BellIcon} boxSize={8} />
      </Button>

      <Button
        aria-label="Settings"
        w="60px"
        h="60px"
        bgColor="white"
        boxShadow="2xl"
        variant="icon"
      >
        <Icon as={SettingIcon} boxSize={8} />
      </Button>
    </Flex>

    <Flex direction="column">
      <Text fontWeight="bold" color="darkBlue">
        {name}.
      </Text>
      <Text as="span" color="gray.600" textAlign="right">
        {role}
      </Text>
    </Flex>

    <Avatar size="md" name={name} src={avatar} />
  </HStack>
);

export default MenuHeader;

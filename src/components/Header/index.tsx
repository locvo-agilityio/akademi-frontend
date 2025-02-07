import { HStack, Text } from '@chakra-ui/react';

// Components
import { MenuHeader, SearchBox } from '@/components';

interface HeaderProps {
  isDashboard?: boolean;
  title?: string;
  name?: string;
  role?: string;
  avatar?: string;
  onChange?: (value: string) => void;
}

const Header = ({
  isDashboard = false,
  title = '',
  name = '',
  role = '',
  avatar = '',
  onChange = () => {},
}: HeaderProps) => (
  <HStack w="full" justifyContent="space-between">
    <Text as="h2" size="xl">
      {title}
    </Text>

    {isDashboard ? (
      <SearchBox onChange={onChange} />
    ) : (
      <MenuHeader name={name} role={role} avatar={avatar} />
    )}
  </HStack>
);

export default Header;

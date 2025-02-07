'use client';

import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, Text, Icon as ChakraIcon } from '@chakra-ui/react';

// Constants
import { SIDEBAR } from '@/constants';

const Menu = () => {
  const location = useLocation();

  return (
    <List w="full" pl="46px">
      {SIDEBAR.map(({ name, destination, icon: Icon }) => {
        const isDefaultFocused =
          location.pathname === '/' && name === 'Dashboard';
        const isFocused = location.pathname.includes(destination);

        return (
          <ListItem key={name} mb={2}>
            <Link to={destination}>
              <Text
                display="flex"
                alignItems="center"
                gap={6}
                py={4}
                px={6}
                fontSize="md"
                color="gray.300"
                fontWeight="medium"
                _hover={{
                  borderLeftRadius: 'full',
                  color: 'primary',
                  bgColor: 'lightPurple',
                }}
                {...((isDefaultFocused || isFocused) && {
                  borderLeftRadius: 'full',
                  color: 'primary',
                  bgColor: 'lightPurple',
                })}
              >
                <ChakraIcon as={Icon} boxSize={10} />
                {name}
              </Text>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default memo(Menu);

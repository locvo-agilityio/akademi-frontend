import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

// Icons
import { MeatballsIcon } from '@/components/icons';

interface DropdownProps {
  documentId: string;
  email: string;
  path: string;
  editPath: string;
  onOpenDeleteModal?: (e: MouseEvent<HTMLElement>) => void;
}

const Dropdown = ({
  path,
  editPath,
  documentId,
  email,
  onOpenDeleteModal,
}: DropdownProps) => (
  <Menu>
    <MenuButton
      title="Dropdown"
      variant="icon"
      bgColor="transparent"
      border="none"
      as={Button}
      rightIcon={<MeatballsIcon />}
    />

    <MenuList minWidth={125}>
      <MenuItem as={Link} to={path} fontSize="base">
        Detail
      </MenuItem>
      <MenuItem fontSize="base" as={Link} to={editPath}>
        Edit
      </MenuItem>
      <MenuItem
        data-id={documentId}
        data-email={email}
        fontSize="base"
        color="red"
        onClick={onOpenDeleteModal}
      >
        Delete
      </MenuItem>
    </MenuList>
  </Menu>
);

export default memo(Dropdown);

import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

// Icons
import { MeatballsIcon } from '@/components/icons';

interface DropdownProps {
  documentId: string;
  name: string;
  path: string;
  editPath: string;
  isStudent?: boolean;
  onOpenDeleteModal?: (e: MouseEvent<HTMLElement>) => void;
}

const Dropdown = ({
  path,
  editPath,
  documentId,
  name,
  isStudent = false,
  onOpenDeleteModal,
}: DropdownProps) => {
  const handleStopPropagation = (e: MouseEvent<HTMLElement>) =>
    e.stopPropagation();

  const handleOpenDeleteModal = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onOpenDeleteModal?.(e);
  };

  return (
    <Menu>
      <MenuButton
        title="Dropdown"
        variant="icon"
        bgColor="transparent"
        border="none"
        as={Button}
        rightIcon={<MeatballsIcon />}
        onClick={handleStopPropagation}
      />

      <MenuList minWidth={125}>
        {isStudent && (
          <MenuItem
            onClick={handleStopPropagation}
            as={Link}
            to={path}
            fontSize="base"
          >
            Detail
          </MenuItem>
        )}

        <MenuItem
          onClick={handleStopPropagation}
          fontSize="base"
          as={Link}
          to={editPath}
        >
          Edit
        </MenuItem>
        <MenuItem
          data-id={documentId}
          data-name={name}
          fontSize="base"
          color="red"
          onClick={handleOpenDeleteModal}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Dropdown;

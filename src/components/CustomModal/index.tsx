import { ReactNode } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface TModalProps {
  maxW?: string;
  isOpen: boolean;
  title?: string;
  body?: ReactNode;
  hasCloseButton?: boolean;
  onClose: () => void;
}

const CustomModal = ({
  maxW = 'fit-content',
  isOpen,
  body,
  title = '',
  hasCloseButton = false,
  onClose,
}: TModalProps) => (
  <Modal isCentered isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent minW={320} maxW={maxW}>
      <ModalHeader
        display="flex"
        justifyContent={hasCloseButton ? 'space-between' : 'center'}
        alignItems="center"
        w="full"
      >
        {title}
        {hasCloseButton && <ModalCloseButton position="unset" size="sm" />}
      </ModalHeader>
      {!!body && <ModalBody>{body}</ModalBody>}
    </ModalContent>
  </Modal>
);

export default CustomModal;

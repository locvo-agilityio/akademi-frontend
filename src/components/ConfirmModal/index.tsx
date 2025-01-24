import { memo } from 'react';

// Components
import { Button, Flex, HStack, Text } from '@chakra-ui/react';

interface ConfirmModalProps {
  title?: string;
  itemName?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onConfirm?: () => void;
  onCloseModal?: () => void;
}

const ConfirmModal = ({
  title = '',
  itemName = '',
  isLoading = false,
  isDisabled = false,
  onConfirm,
  onCloseModal,
}: ConfirmModalProps) => (
  <Flex direction="column" alignItems="center" gap={3}>
    <Flex direction="column" gap={3} alignItems="center">
      <Text size="md">{title}</Text>
      <Text as="span" pl={1} color="red">
        {itemName}
      </Text>
    </Flex>
    <HStack p={4} gap={3}>
      <Button
        w="full"
        p={5}
        fontSize="base"
        variant="secondary"
        borderRadius="full"
        onClick={onCloseModal}
      >
        Cancel
      </Button>

      <Button
        w="full"
        p={5}
        fontSize="base"
        variant="primary"
        borderRadius="full"
        onClick={onConfirm}
        isLoading={isLoading}
        isDisabled={isDisabled}
      >
        Confirm
      </Button>
    </HStack>
  </Flex>
);

export default memo(ConfirmModal);

import { memo, MouseEvent, useCallback } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Icons
import { MailIcon, PhoneIcon } from '@/components/icons';

// Components
import Dropdown from '@/components/Dropdown';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

interface CardTeacherProps {
  documentId: string;
  name: string;
  subject: string;
  avatar?: string;
  phone: string;
  email: string;
  onOpenDeleteModal?: (e: MouseEvent<HTMLElement>) => void;
}

const CardTeacher = ({
  documentId,
  name,
  subject,
  avatar = '',
  phone,
  email,
  onOpenDeleteModal,
}: CardTeacherProps) => {
  const navigate = useNavigate();

  const handleNavigateToTeacherDetail = useCallback(() => {
    navigate(PUBLIC_ROUTERS.TEACHER_DETAIL.replace(':id', documentId));
  }, [documentId, navigate]);

  return (
    <Card
      p={8}
      borderRadius="2xl"
      _hover={{ boxShadow: '2xl' }}
      cursor="pointer"
      onClick={handleNavigateToTeacherDetail}
    >
      <CardHeader
        display="flex"
        justifyContent="space-between"
        gap={6}
        pl="84px"
      >
        <VStack w="full">
          <Avatar size="2xl" name={name} src={avatar} />
        </VStack>
        <Dropdown
          documentId={documentId}
          name={name}
          path={PUBLIC_ROUTERS.TEACHER_DETAIL.replace(':id', documentId)}
          editPath={PUBLIC_ROUTERS.TEACHER_EDIT.replace(':id', documentId)}
          onOpenDeleteModal={onOpenDeleteModal}
        />
      </CardHeader>

      <CardBody
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Text as="p" mt={6} fontSize="lg" fontWeight="bold" color="darkblue">
          {name}
        </Text>
        <Text mt={4} as="span" fontSize="md" color="gray.600">
          {subject}
        </Text>

        <Flex gap={4}>
          <Tooltip label={phone}>
            <Button
              as="a"
              aria-label="Call"
              href={`tel:${phone}`}
              variant="icon"
              w={10}
              bgColor="primary"
              color="white"
            >
              <Icon as={PhoneIcon} boxSize={5} />
            </Button>
          </Tooltip>

          <Tooltip label={email}>
            <Button
              as="a"
              aria-label="Email"
              href={`mailto:${email}`}
              variant="icon"
              w={10}
              bgColor="primary"
              color="white"
            >
              <Icon as={MailIcon} boxSize={5} />
            </Button>
          </Tooltip>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default memo(CardTeacher);

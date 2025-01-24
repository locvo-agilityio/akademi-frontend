'use client';

import {
  MouseEvent,
  Suspense,
  useCallback,
  useMemo,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

// Components
import {
  CustomModal,
  Dropdown,
  Fallback,
  Pagination,
  TableStudent,
  ConfirmModal,
  CustomToast,
} from '@/components';

// Icons
import { MailIcon, PhoneIcon } from '@/components/icons';

// Types
import { IStudent, IStudents, TDataSource } from '@/types';

// Hooks
import { useDeleteStudent, useGetStudents, usePagination } from '@/hooks';

// Constants
import {
  CLASS_NAME,
  DEFAULT_PAGE,
  ERROR_MESSAGES,
  PAGE_SIZE,
  PUBLIC_ROUTERS,
  SUCCESS_MESSAGES,
  TOAST_STATUS,
} from '@/constants';

// Utils
import { formatDate } from '@/utils';

const initialState = {
  data: [],
  meta: { pagination: {} },
  next: 0,
  prev: 0,
};

type OptimisticAction = { type: 'delete'; payload: { documentId: string } };

type OptimisticState = IStudents;

const TableStudents = () => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [isPending, startTransition] = useTransition();
  const actionItem = useRef<IStudent | null>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams] = useSearchParams();
  const filter = {
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'desc',
  };

  const { students, isStudentsLoading } = useGetStudents({
    page: currentPage,
    filter,
  });
  const [optimisticStudents, updateOptimisticStudents] = useOptimistic<
    OptimisticState,
    OptimisticAction
  >(students || (initialState as unknown as IStudents), (state, action) => {
    if (action.type === 'delete') {
      return {
        ...state,
        data: state.data.filter(
          (student) => student.documentId !== action.payload.documentId,
        ),
      };
    }

    return state;
  });

  const {
    pageArray,
    isDisableNext,
    isDisablePrev,
    handleChangePageNumber,
    handleChangePage,
  } = usePagination(optimisticStudents, currentPage, setCurrentPage);
  const { handleDeleteStudent, isDeleteLoading } = useDeleteStudent();

  const renderBgClass = useCallback((grade: string) => {
    switch (grade) {
      case CLASS_NAME.VII_B:
        return 'yellow';
      case CLASS_NAME.VII_C:
        return 'darkBlue';
      default:
        return 'secondary';
    }
  }, []);

  const handleClickDeleteButton = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const target = e.currentTarget as HTMLElement;
      const { id, email } = target.dataset;

      actionItem.current = { id, email } as IStudent;
      onOpen();
    },
    [onOpen],
  );

  const handleConfirmDelete = useCallback(async () => {
    try {
      await handleDeleteStudent({
        id: String(actionItem.current?.id),
      });

      startTransition(() => {
        updateOptimisticStudents({
          type: 'delete',
          payload: {
            documentId: String(actionItem.current?.documentId),
          },
        });

        toast({
          render: () => (
            <CustomToast
              status={TOAST_STATUS.SUCCESS}
              message={SUCCESS_MESSAGES.DELETE_STUDENT_SUCCESS}
            />
          ),
        });
      });
    } catch (error) {
      toast({
        render: () => (
          <CustomToast
            status={TOAST_STATUS.ERROR}
            message={ERROR_MESSAGES.DELETE_STUDENT_FAILED}
          />
        ),
      });
    }

    onClose();
    actionItem.current = null;
  }, [handleDeleteStudent, onClose, toast, updateOptimisticStudents]);

  const renderColumns = useMemo(
    () => [
      {
        title: 'Name',
        key: 'name',
        renderBody: ({ firstName, lastName, avatar }: TDataSource) => (
          <Flex
            p={0}
            gap={4}
            border="none"
            fontSize="md"
            color="darkBlue"
            fontWeight="bold"
            alignItems="center"
          >
            <Avatar
              size="md"
              mr={6}
              name={`${firstName} ${lastName}`}
              src={avatar as string}
            />
            {firstName} {lastName}
          </Flex>
        ),
      },
      {
        title: 'ID',
        key: 'id',
        renderBody: ({ id }: TDataSource) => (
          <Flex
            p={0}
            gap={4}
            border="none"
            fontSize="md"
            color="darkBlue"
            fontWeight="bold"
            alignItems="center"
          >
            ID {id}
          </Flex>
        ),
      },
      {
        title: 'Date',
        key: 'date',
        renderBody: ({ createdAt }: TDataSource) => (
          <Text color="gray.600">{formatDate(String(createdAt))}</Text>
        ),
      },
      {
        title: 'Parent Name',
        key: 'parentName',
        renderBody: ({ firstName, lastName }: TDataSource) => (
          <Text color="darkBlue">
            {firstName} {lastName}
          </Text>
        ),
      },
      {
        title: 'City',
        key: 'city',
        renderBody: ({ city }: TDataSource) => (
          <Text color="darkBlue">{city}</Text>
        ),
      },
      {
        title: 'Contact',
        key: 'contact',
        renderBody: ({ phone, email }: TDataSource) => (
          <Flex gap={2}>
            <Tooltip label={phone}>
              <Button
                aria-label="Call"
                as="a"
                href={`tel:${phone}`}
                variant="icon"
                w={10}
              >
                <Icon as={PhoneIcon} />
              </Button>
            </Tooltip>

            <Tooltip label={email}>
              <Button
                aria-label="Email"
                as="a"
                href={`mailto:${email}`}
                variant="icon"
                w={10}
              >
                <Icon as={MailIcon} />
              </Button>
            </Tooltip>
          </Flex>
        ),
      },
      {
        title: 'Grade',
        key: 'grade',
        renderBody: ({ grade }: TDataSource) => (
          <Flex
            gap={4}
            color={grade === CLASS_NAME.VII_C ? 'white' : 'black'}
            alignItems="center"
            bgColor={renderBgClass(grade as string)}
            borderRadius="3xl"
            w={20}
            h={10}
            justifyContent="center"
          >
            {grade}
          </Flex>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        renderBody: ({ documentId, email }: TDataSource) => (
          <Dropdown
            email={String(email)}
            documentId={String(documentId)}
            path={PUBLIC_ROUTERS.STUDENT_DETAIL.replace(
              ':id',
              String(documentId),
            )}
            editPath={PUBLIC_ROUTERS.STUDENT_EDIT.replace(
              ':id',
              String(documentId),
            )}
            onOpenDeleteModal={handleClickDeleteButton}
          />
        ),
      },
    ],
    [handleClickDeleteButton, renderBgClass],
  );

  return (
    <VStack
      w="full"
      bgColor="white"
      mt={10}
      p={8}
      borderRadius="2xl"
      alignItems="flex-start"
    >
      <Flex w="full" minH={520} justifyContent="center">
        <Suspense fallback={<Fallback />}>
          <TableStudent
            isLoading={isStudentsLoading}
            columns={renderColumns}
            dataSource={optimisticStudents.data as unknown as TDataSource[]}
          />
        </Suspense>
      </Flex>

      <Flex w="full">
        <Pagination
          isDisableNext={isDisableNext}
          isDisabledPrev={isDisablePrev}
          totalRecords={`${students?.meta?.pagination?.total ?? 0} items`}
          pageSize={PAGE_SIZE}
          currentButtons={pageArray}
          currentPage={currentPage}
          onClickPage={handleChangePageNumber}
          onPageChange={handleChangePage}
        />
      </Flex>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        body={
          <ConfirmModal
            title="Are you sure you want to delete this student?"
            itemName={actionItem.current?.email}
            isLoading={isDeleteLoading || isPending}
            isDisabled={isDeleteLoading || isPending}
            onConfirm={handleConfirmDelete}
            onCloseModal={onClose}
          />
        }
      />
    </VStack>
  );
};

export default TableStudents;

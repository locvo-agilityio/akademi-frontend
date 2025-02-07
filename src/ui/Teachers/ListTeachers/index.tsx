'use client';

import {
  MouseEvent,
  Suspense,
  useCallback,
  useRef,
  useState,
  useTransition,
  useOptimistic,
  lazy,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flex, useDisclosure, useToast, VStack } from '@chakra-ui/react';

// Components
import { ConfirmModal, CustomModal, CustomToast, Fallback } from '@/components';

const CardTeacher = lazy(() => import('@/components/Card/CardTeacher'));
const Pagination = lazy(() => import('@/components/Pagination'));

// Hooks
import { useDeleteTeacher, useGetTeachers, usePagination } from '@/hooks';

// Types
import { ITeacher, ITeachers } from '@/types';

// Constants
import {
  DEFAULT_PAGE,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_STATUS,
} from '@/constants';

const initialState = {
  data: [],
  meta: { pagination: {} },
  next: 0,
  prev: 0,
};

type OptimisticAction = { type: 'delete'; payload: { documentId: string } };

type OptimisticState = ITeachers;

const ListTeachers = () => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const actionItem = useRef<ITeacher | null>(null);
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const filter = {
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'desc',
  };

  const { teachers } = useGetTeachers({
    page: currentPage,
    filter,
  });

  const [optimisticTeachers, updateOptimisticTeachers] = useOptimistic<
    OptimisticState,
    OptimisticAction
  >(teachers || (initialState as unknown as ITeachers), (state, action) => {
    if (action.type === 'delete') {
      return {
        ...state,
        data: state.data.filter(
          (teacher) => teacher.documentId !== action.payload.documentId,
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
  } = usePagination(optimisticTeachers, currentPage, setCurrentPage);

  const { handleDeleteTeacher, isDeleteLoading } = useDeleteTeacher();

  const handleConfirmDelete = useCallback(async () => {
    try {
      await handleDeleteTeacher({
        id: String(actionItem.current?.id),
      });

      startTransition(() => {
        updateOptimisticTeachers({
          type: 'delete',
          payload: { documentId: String(actionItem.current?.documentId) },
        });

        toast({
          render: () => (
            <CustomToast
              status={TOAST_STATUS.SUCCESS}
              message={SUCCESS_MESSAGES.DELETE_TEACHER_SUCCESS}
            />
          ),
        });
      });
    } catch (error) {
      toast({
        render: () => (
          <CustomToast
            status={TOAST_STATUS.ERROR}
            message={ERROR_MESSAGES.DELETE_TEACHER_FAILED}
          />
        ),
      });
    }

    onClose();
    actionItem.current = null;
  }, [handleDeleteTeacher, onClose, toast, updateOptimisticTeachers]);

  const handleClickDeleteButton = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const target = e.currentTarget as HTMLElement;
      const { id, name } = target.dataset;

      actionItem.current = { id, name } as ITeacher;
      onOpen();
    },
    [onOpen],
  );

  return (
    <VStack
      w="full"
      minH={620}
      alignItems="center"
      justifyContent="space-between"
      mt={10}
    >
      <Suspense fallback={<Fallback />}>
        {optimisticTeachers?.data.length === 0 ? (
          ERROR_MESSAGES.EMPTY_DATA
        ) : (
          <Flex w="full" gap={6} flexWrap="wrap" justifyContent="flex-start">
            {optimisticTeachers?.data.map(
              ({
                id,
                email,
                firstName,
                lastName,
                subject,
                phone,
                photo,
                documentId = '',
              }) => (
                <CardTeacher
                  key={id}
                  documentId={documentId}
                  email={email}
                  name={`${firstName} ${lastName}`}
                  subject={subject}
                  avatar={photo}
                  phone={phone}
                  onOpenDeleteModal={handleClickDeleteButton}
                />
              ),
            )}
          </Flex>
        )}

        <Flex w="full">
          <Pagination
            isDisableNext={isDisableNext}
            isDisabledPrev={isDisablePrev}
            totalRecords={`${optimisticTeachers?.meta?.pagination?.total ?? 0} items`}
            currentButtons={pageArray}
            currentPage={currentPage}
            onClickPage={handleChangePageNumber}
            onPageChange={handleChangePage}
          />
        </Flex>
      </Suspense>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        body={
          <ConfirmModal
            title="Are you sure you want to delete this teacher?"
            itemName={actionItem.current?.name}
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

export default ListTeachers;

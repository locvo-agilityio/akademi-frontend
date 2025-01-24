'use client';

import { useMemo, useState } from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';

// Components
import { Pagination, TableWithoutHeader } from '@/components';

// Icons
import { TrendingIcon } from '@/components/icons';

// Types
import { IStudents, TDataSource } from '@/types';

// Utils
import { formatAmount, formatDate } from '@/utils';

// Hooks
import { useGetUnpaidStudents, usePagination } from '@/hooks';

// Constants
import { DEFAULT_PAGE, PAGE_SIZE } from '@/constants';

// Mocks
import { MOCK_PAYMENTS } from '@/__mocks__';

const TablePayment = () => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const { unpaidStudents, isUnpaidStudentsLoading } = useGetUnpaidStudents({
    page: currentPage,
  });
  const {
    pageArray,
    isDisableNext,
    isDisablePrev,
    handleChangePageNumber,
    handleChangePage,
  } = usePagination(unpaidStudents as IStudents, currentPage, setCurrentPage);

  const renderColumns = useMemo(
    () => [
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
            <Flex
              w="56px"
              h="56px"
              borderRadius="full"
              bgColor="red"
              alignItems="center"
              justifyContent="center"
            >
              <TrendingIcon />
            </Flex>
            #{id}
          </Flex>
        ),
      },
      {
        title: 'Date',
        key: 'date',
        renderBody: ({ date }: TDataSource) => (
          <Text color="whiteSmoke">{formatDate(String(date))}</Text>
        ),
      },
      {
        title: 'Amount',
        key: 'amount',
        renderBody: ({ amount }: TDataSource) => (
          <Text size="md" fontWeight="semibold" color="darkBlue">
            $ {formatAmount(amount as number)}
          </Text>
        ),
      },
      {
        title: 'Status',
        key: 'status',
        renderBody: ({ status }: TDataSource) => (
          <Text
            size="md"
            fontWeight="semibold"
            color={
              status === 'Complete'
                ? 'green'
                : status === 'Pending'
                  ? 'whiteSmoke'
                  : 'red'
            }
          >
            {status}
          </Text>
        ),
      },
    ],
    [],
  );

  return (
    <VStack
      w="full"
      bgColor="white"
      mt={5}
      p={8}
      borderRadius="2xl"
      alignItems="flex-start"
    >
      <Text as="h3" size="xl">
        Payment History
      </Text>

      <Flex w="full" h={360} justifyContent="center">
        <TableWithoutHeader
          isLoading={isUnpaidStudentsLoading}
          columns={renderColumns}
          dataSource={MOCK_PAYMENTS as unknown as TDataSource[]}
        />
      </Flex>

      <Flex w="full">
        <Pagination
          isDisableNext={isDisableNext}
          isDisabledPrev={isDisablePrev}
          totalRecords={`${unpaidStudents?.meta.pagination.total ?? 0} items`}
          pageSize={PAGE_SIZE}
          currentButtons={pageArray}
          currentPage={currentPage}
          onClickPage={handleChangePageNumber}
          onPageChange={handleChangePage}
        />
      </Flex>
    </VStack>
  );
};

export default TablePayment;

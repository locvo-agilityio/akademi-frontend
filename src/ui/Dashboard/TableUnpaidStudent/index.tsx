'use client';

import { useMemo, useState } from 'react';
import { Avatar, Button, Flex, Icon, Text, VStack } from '@chakra-ui/react';

// Components
import { Pagination, TableWithoutHeader } from '@/components';

// Icons
import { MeatballsIcon, PrintIcon, UserIcon } from '@/components/icons';

// Types
import { IStudents, TDataSource } from '@/types';

// Utils
import { formatAmount } from '@/utils';

// Hooks
import { useGetUnpaidStudents, usePagination } from '@/hooks';

// Constants
import { DEFAULT_PAGE } from '@/constants';

const TableUnpaidStudent = () => {
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
              name={String(avatar)}
              src={String(avatar)}
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
        title: 'Class',
        key: 'class',
        renderBody: ({ grade }: TDataSource) => (
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
              w="48px"
              h="48px"
              textAlign="center"
              borderRadius="full"
              bgColor="secondary"
              color="white"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={UserIcon} boxSize={6} />
            </Flex>
            <Flex flexDirection="column" gap={2}>
              <Text size="base" color="gray.600">
                Class
              </Text>
              {grade}
            </Flex>
          </Flex>
        ),
      },
      {
        title: 'Unpaid',
        key: 'unpaid',
        renderBody: ({ amount }: TDataSource) => (
          <Text size="md" fontWeight="semibold" color="darkBlue">
            $ {formatAmount(amount as number)}
          </Text>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        renderBody: () => (
          <Flex gap={2}>
            <Button
              aria-label="Print"
              variant="icon"
              bgColor="transparent"
              border="none"
              cursor="not-allowed"
            >
              <PrintIcon />
            </Button>

            <Button
              aria-label="Options"
              variant="icon"
              bgColor="transparent"
              border="none"
              cursor="not-allowed"
            >
              <MeatballsIcon />
            </Button>
          </Flex>
        ),
      },
    ],
    [],
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
      <Text as="h3" size="xl">
        Unpaid Student Intuition
      </Text>

      <Flex w="full" minH={520} justifyContent="center">
        <TableWithoutHeader
          isLoading={isUnpaidStudentsLoading}
          columns={renderColumns}
          dataSource={unpaidStudents?.data as unknown as TDataSource[]}
        />
      </Flex>

      <Flex w="full">
        <Pagination
          isDisableNext={isDisableNext}
          isDisabledPrev={isDisablePrev}
          totalRecords={`${unpaidStudents?.meta.pagination.total ?? 0} items`}
          currentButtons={pageArray}
          currentPage={currentPage}
          onClickPage={handleChangePageNumber}
          onPageChange={handleChangePage}
        />
      </Flex>
    </VStack>
  );
};

export default TableUnpaidStudent;

'use client';

import { memo, useMemo } from 'react';
import { Button, Flex, Icon, Text } from '@chakra-ui/react';

// Icons
import { ArrowIcon } from '../icons';

interface PaginationProps {
  totalRecords?: string;
  pageSize?: number;
  currentPage?: number;
  isDisabledPrev?: boolean;
  isDisableNext?: boolean;
  currentButtons?: (number | string)[];
  onPageChange?: (direction: string) => void;
  onClickPage?: (currentPage: number) => void;
}

const Pagination = ({
  totalRecords,
  currentPage = 1,
  currentButtons = [],
  isDisabledPrev,
  isDisableNext,
  onPageChange,
  onClickPage,
}: PaginationProps) => {
  const handleNextPage = () => onPageChange?.('next');

  const handlePrevPage = () => onPageChange?.('prev');

  const renderBtnPage = useMemo(
    () =>
      currentButtons.map((item: string | number) => {
        const isDots = item.toString() === '...';
        const isCurrentPage = currentPage === item;
        const isDisable = isDots || isCurrentPage;
        const bgBtn = isCurrentPage ? 'primary' : 'transparent';
        const colorBtn = isCurrentPage ? 'white' : 'whiteSmoke';
        const cursor = isDots ? 'not-allowed' : '';

        const hoverStyle = !isDots
          ? {
              color: 'white',
              bg: 'primary',
            }
          : {};

        const disableStyle = !isDots
          ? {
              cursor: isCurrentPage ? 'not-allowed' : '',
              color: 'white',
              bg: 'primary',
            }
          : {};

        const handleClickPage = () => {
          if (!isDots && !isCurrentPage) {
            onClickPage?.(item as number);
          }
        };

        return (
          <Button
            key={item}
            title={`page-${item}`}
            isDisabled={isDisable}
            variant="icon"
            w={10}
            h={10}
            fontSize="base"
            textAlign="center"
            bg={bgBtn}
            color={colorBtn}
            border="2px solid"
            borderColor="whitesmoke"
            cursor={cursor}
            _hover={hoverStyle}
            _disabled={disableStyle}
            onClick={handleClickPage}
          >
            {item}
          </Button>
        );
      }),
    [currentButtons, currentPage, onClickPage],
  );

  return (
    <Flex w="full" justifyContent="space-between" mt={8}>
      <Flex alignItems="center">
        <Text fontSize="base" fontWeight="regular" color="gray.600">
          {totalRecords}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          title="prev-button"
          w={8}
          variant="icon"
          isDisabled={isDisabledPrev}
          onClick={handlePrevPage}
          bgColor="transparent"
          border="none"
        >
          <Icon
            as={ArrowIcon}
            boxSize={4}
            transform="rotate(90deg)"
            color="whiteSmoke"
          />
        </Button>
        <Flex alignItems="center" gap={2}>
          {renderBtnPage}
        </Flex>
        <Button
          title="next-button"
          w={8}
          variant="icon"
          isDisabled={isDisableNext}
          onClick={handleNextPage}
          bgColor="transparent"
          border="none"
        >
          <Icon
            as={ArrowIcon}
            boxSize={4}
            transform="rotate(-90deg)"
            color="whiteSmoke"
          />
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(Pagination);

// Types
import { PaginationTableType, TDataSource, THeaderTable } from '@/types';

export const processTableData = (
  columns: THeaderTable[],
  dataSource: TDataSource[],
) =>
  dataSource.map((data) => ({
    id: data.id,
    cells: columns.map((column) => ({
      key: `${data.id}-${column.key}`,
      content: column.renderBody
        ? column.renderBody(data)
        : data[column.key as keyof typeof data],
    })),
  }));

export const formatAmount = (amount: number) => amount.toLocaleString();

export const formatNumberButton = (numberOfPage: number): number[] =>
  Array.from({ length: numberOfPage }, (_, index) => index + 1);

export const formatPageArray = ({
  totalPage,
  currentPage,
}: PaginationTableType): (string | number)[] => {
  const DOTS = '...';
  const numberOfPage = Math.ceil(totalPage);

  if (numberOfPage === 0) return [1];

  if (numberOfPage <= 4) {
    return formatNumberButton(numberOfPage);
  }

  const isNearStart = currentPage <= 3;
  const isNearEnd = currentPage >= numberOfPage - 2;
  const isInMiddle = !isNearStart && !isNearEnd;

  if (isNearStart) {
    return [1, 2, 3, DOTS, numberOfPage];
  }

  if (isNearEnd) {
    return [1, DOTS, numberOfPage - 2, numberOfPage - 1, numberOfPage];
  }

  if (isInMiddle) {
    return [
      1,
      DOTS,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      DOTS,
      numberOfPage,
    ];
  }

  return [];
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

import { memo, useMemo } from 'react';
import {
  TableContainer,
  Table as TableChakra,
  Thead,
  Tbody,
  TableProps,
  Tr,
  Td,
} from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

// Types
import { TDataSource, THeaderTable } from '@/types';

// Components
import TableRow from '@/components/Table/TableRow';
import TableHeader from '@/components/Table/TableHeader';
import Fallback from '@/components/Fallback';

// Constants
import { ERROR_MESSAGES } from '@/constants';

import { processTableData } from '@/utils';

type TTableStudentProps = TableProps & {
  isLoading?: boolean;
  columns?: THeaderTable[];
  dataSource?: TDataSource[];
};

const TableStudent = ({
  isLoading,
  columns = [],
  dataSource = [],
  ...props
}: TTableStudentProps) => {
  const processedData = useMemo(
    () => processTableData(columns, dataSource),
    [columns, dataSource],
  );

  return (
    <TableContainer
      w="full"
      h="full"
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': {
          width: 2,
        },
        '&::-webkit-scrollbar-track': {
          width: 2,
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRadius: '24px',
        },
      }}
    >
      <TableChakra {...props}>
        <Thead>
          <TableHeader columns={columns} />
        </Thead>

        <Tbody>
          {processedData.length === 0 ? (
            <Tr>
              <Td
                colSpan={columns?.length}
                textAlign="center"
                fontWeight="semibold"
                border="none"
                fontSize="lg"
              >
                {isLoading ? <Fallback /> : ERROR_MESSAGES.EMPTY_DATA}
              </Td>
            </Tr>
          ) : (
            processedData.map((data) => (
              <TableRow key={data.id} cells={data.cells} />
            ))
          )}
        </Tbody>
      </TableChakra>
    </TableContainer>
  );
};

export default memo(TableStudent, isEqual);

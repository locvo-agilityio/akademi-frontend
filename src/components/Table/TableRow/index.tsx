import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Td, Tr } from '@chakra-ui/react';

// Types
import { TCellTable } from '@/types';

interface TableRowProps {
  cells: TCellTable[];
}

const TableRow = ({ cells }: TableRowProps) => (
  <Tr>
    {cells.map((cell) => (
      <Td key={cell.key} p={8} textAlign="left" color="darkBlue">
        {cell.content}
      </Td>
    ))}
  </Tr>
);

export default memo(TableRow, isEqual);

import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Text, Th, Tr } from '@chakra-ui/react';

// Types
import { THeaderTable } from '@/types';

interface TableHeadProps {
  columns?: THeaderTable[];
}

const TableHeader = ({ columns }: TableHeadProps) => (
  <Tr>
    {!!columns?.length &&
      columns.map(({ key, title }) => (
        <Th
          key={key}
          p={8}
          textAlign="left"
          borderBottom="1px solid"
          borderColor="coolGray"
        >
          <Text
            color="darkBlue"
            textTransform="none"
            fontWeight="semibold"
            title={title}
          >
            {title}
          </Text>
        </Th>
      ))}
  </Tr>
);

export default memo(TableHeader, isEqual);

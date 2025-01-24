import { HStack } from '@chakra-ui/react';

// Components
import { CardSummary } from '@/components';

// Mocks
import { MOCK_SUMMARY_DASHBOARD } from '@/__mocks__';

const DashboardStatistics = () => (
  <HStack p={5} mt={10} bgColor="white" w="full" borderRadius="2xl">
    {MOCK_SUMMARY_DASHBOARD.map(({ title, total, bgIcon, icon: Icon }) => (
      <CardSummary
        key={title}
        title={title}
        total={total}
        bgIcon={bgIcon}
        icon={<Icon />}
      />
    ))}
  </HStack>
);

export default DashboardStatistics;

import { VStack } from '@chakra-ui/react';

// UI
import { DashboardStatistics, TableUnpaidStudent } from '@/ui';

const Dashboard = () => (
  <VStack>
    <DashboardStatistics />

    <TableUnpaidStudent />
  </VStack>
);

export default Dashboard;

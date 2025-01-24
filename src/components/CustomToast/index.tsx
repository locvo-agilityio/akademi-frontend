import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

// Constants
import { TOAST_STATUS } from '@/constants';

interface ICustomToastProps {
  status: TOAST_STATUS;
  message: string;
}

const CustomToast = ({ status, message }: ICustomToastProps) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    p={5}
    bgColor={status === TOAST_STATUS.SUCCESS ? 'green' : 'red'}
    color="white"
  >
    {message}
  </Flex>
);

export default memo(CustomToast);

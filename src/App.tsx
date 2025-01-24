import { ChakraProvider, UseToastOptions } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

// Themes
import { theme } from '@/themes';

// Routers
import { router } from '@/routers';

// Components
import { ErrorBoundary } from '@/components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 86400,
      refetchOnWindowFocus: false,
    },
  },
});

const defaultOptions = {
  duration: 3000,
  position: 'bottom',
  isClosable: true,
} as UseToastOptions;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} toastOptions={{ defaultOptions }}>
        <ErrorBoundary>
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
            }}
          />
        </ErrorBoundary>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;

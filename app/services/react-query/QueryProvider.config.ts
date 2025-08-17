import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1, // Retries once on failure
      staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    },
  },
});

export default queryClient;

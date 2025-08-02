'use client'

import {
  QueryClientProvider as DefaultQueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2, // 2 mins
        retry: 1, // retry once on failure
      },
    },
  })
  return (
    <DefaultQueryClientProvider client={queryClient}>
      {children}
    </DefaultQueryClientProvider>
  )
}

export default QueryClientProvider

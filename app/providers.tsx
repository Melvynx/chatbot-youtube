'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

'use client';
import * as React from 'react';
import { SDKProvider } from '@tma.js/sdk-react';
import { ClientProvider } from './ClientProvider';

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SDKProvider>
      <ClientProvider>{children}</ClientProvider>
    </SDKProvider>
  );
};

'use client';
import * as React from 'react';
import { SDKProvider } from '@tma.js/sdk-react';

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <SDKProvider>{children}</SDKProvider>;
};

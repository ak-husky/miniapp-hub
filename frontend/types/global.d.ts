import { MiniApp } from '@tma.js/sdk-react';

declare global {
  interface Window {
    Telegram: {
      MiniApp: MiniApp;
    };
    __ENV?: any;
  }
}

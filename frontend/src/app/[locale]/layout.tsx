import * as React from 'react';
import { Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { PublicEnvScript } from 'next-runtime-env';
import { getServerMessages, locales } from '@/i18n';
import { Providers } from './providers';

type Props = React.PropsWithChildren<{ params: { locale: string } }>;

export default async function RootLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const messages = await getServerMessages(locale);
  return (
    <html lang={locale} translate="no" suppressHydrationWarning>
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

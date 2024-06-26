import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { notFound } from 'next/navigation';

export const defaultLocale = 'en';

export const locales = ['en', 'zh-TW', 'zh-CN'];

export const localeNames: { [key: string]: string } = {
  en: 'English',
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
};

// Navigation utilities configured for the defined locales.
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });

export const getServerMessages = async (locale: string) => {
  let messages;
  console.log(`-------`, locale);
  try {
    messages = (await import(`./locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return messages;
};

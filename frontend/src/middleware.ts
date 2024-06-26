import { type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

export default async function middleware(req: NextRequest) {
  return intlMiddleware(req);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next/static|_next/image|images|assets|favicon.ico).*)'],
};

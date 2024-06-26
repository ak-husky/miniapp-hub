import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

// https://next-intl-docs.vercel.app/docs/routing/middleware#usage-without-middleware-static-export
export default function RootPage() {
  // Redirect the user to the default locale when `/` is requested
  return redirect(`/${defaultLocale}`);
}

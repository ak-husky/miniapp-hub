'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLaunchParams, useMiniApp, useViewport } from '@tma.js/sdk-react';
import { env } from 'next-runtime-env';
import { defaultLocale, locales } from '@/i18n';
import { trpc } from '@/client';

export default function AuthPage() {
  const pathname = usePathname();
  const router = useRouter();
  const miniApp = useMiniApp();
  const viewport = useViewport();
  const launchParams = useLaunchParams();
  const { mutateAsync: authenticate, data, isSuccess } = trpc.user.auth.useMutation();

  useEffect(() => {
    const { initDataRaw, initData } = launchParams;
    if (initDataRaw && initData?.user) {
      const user = {
        userid: `${initData.user.id}`,
        username: initData.user.username ?? `${initData.user.id}`,
        firstName: initData.user.firstName,
        lastName: initData.user.lastName,
        photo: initData.user.photoUrl,
      };
      authenticate({ initDataRaw, ...user });
    }
  }, [launchParams, authenticate]);

  useEffect(() => {
    if (isSuccess && data.token && miniApp) {
      const { initData } = launchParams;
      const routeTo = pathname.substring(pathname.indexOf('/auth') + 5);
      const path = (routeTo ?? '/') + (initData?.startParam ?? '');

      let locale = initData?.user?.languageCode ?? '';
      if (!locales.includes(locale)) {
        locale = defaultLocale;
      }

      const targetUrl = new URL(env('NEXT_PUBLIC_TARGET_URL') ?? 'https://test0413-game.16z.net/test1/');
      targetUrl.searchParams.set('auth', data.token);
      targetUrl.searchParams.set('target', path);

      const u = new URL(`http://localhost/${locale}`);
      u.searchParams.set('targetUrl', targetUrl.href);
      router.replace(u.pathname + u.search);

      miniApp.ready();
      viewport?.expand();

      window.Telegram = {
        MiniApp: miniApp,
      };
    }
  }, [isSuccess, data, miniApp, viewport, router, pathname, launchParams]);

  return <div className="flex min-h-screen"></div>;
}

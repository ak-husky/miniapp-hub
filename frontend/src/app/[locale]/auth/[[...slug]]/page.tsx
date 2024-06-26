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
      console.log(`11111111`)
      const { initData } = launchParams;
      const routeTo = pathname.substring(pathname.indexOf('/auth') + 5);
      const path = (routeTo ?? '/') + (initData?.startParam ?? '');

      console.log(`2222222`)
      let locale = initData?.user?.languageCode ?? '';
      if (!locales.includes(locale)) {
        locale = defaultLocale;
      }

      console.log(`3333333`)
      console.log(`3333333 -0`, env('NEXT_PUBLIC_TARGET_URL'))
      const targetUrl = new URL(env('NEXT_PUBLIC_TARGET_URL')!);
      console.log(`3333333 -1`, data.token)
      targetUrl.searchParams.set('auth', data.token);
      console.log(`3333333 -2`, path)
      targetUrl.searchParams.set('target', path);
      console.log(`3333333 -3`)

      console.log(`4444444`)
      const u = new URL(`http://localhost/${locale}`);
      u.searchParams.set('targetUrl', targetUrl.href);
      router.replace(u.pathname + u.search);

      console.log(`55555555`)
      miniApp.ready();
      viewport?.expand();

      window.Telegram = {
        MiniApp: miniApp,
      };
    }
  }, [isSuccess, data, miniApp, viewport, router, pathname, launchParams]);

  return <div className="flex min-h-screen"></div>;
}

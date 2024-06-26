'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const url = searchParams.get('targetUrl');
  console.log('target url: ', url)
  return (
    <>
      <main className="flex min-h-screen h-screen">
        {url && <iframe src={url} width="100%" height="100%" style={{ border: '0' }} />}
      </main>
    </>
  );
}

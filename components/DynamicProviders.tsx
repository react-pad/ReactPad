'use client';

import dynamic from 'next/dynamic';

const Providers = dynamic(() => import('@/components/Providers').then(m => m.Providers), { ssr: false });

export default Providers;

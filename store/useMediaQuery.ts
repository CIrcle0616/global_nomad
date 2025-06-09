'use client';

import { useEffect, useState } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export default function useMediaQuery(): DeviceType {
  const [device, setDevice] = useState<DeviceType>('desktop');

  useEffect(() => {
    const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
    const mediaQueryTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');

    const checkDevice = () => {
      if (mediaQueryMobile.matches) {
        setDevice('mobile');
      } else if (mediaQueryTablet.matches) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return device;
}

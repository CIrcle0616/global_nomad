'use client';

import clsx from 'clsx';
import useIsAuthor from '@/hooks/useIsAuthor';

interface DynamicLayoutWrapperProps {
  activityUserId: number;
  mainContent: React.ReactNode;
  children: React.ReactNode;
}

export default function DynamicLayoutWrapper({ activityUserId, mainContent, children }: DynamicLayoutWrapperProps) {
  const isAuthor = useIsAuthor(activityUserId);

  const containerClassName = clsx({ 'md:flex md:w-full': !isAuthor });
  const leftClassName = clsx({ 'md:w-[696px] lg:w-[900px]': isAuthor, 'md:w-[430px] lg:w-[500px]': !isAuthor });

  return (
    <div className={containerClassName}>
      <div className={leftClassName}>{mainContent}</div>
      {children}
    </div>
  );
}

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUpdateSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: { key: string; value: string }[]) => {
      const newParams = new URLSearchParams(searchParams.toString());

      updates.forEach(({ key, value }) => {
        newParams.set(key, value);
      });

      newParams.set('page', '1');

      router.push(`/?${newParams.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return updateParams;
}

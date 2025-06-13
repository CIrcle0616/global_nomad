'use client';

import { useEffect, useState } from 'react';
import Search from '../activity/Search';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    const currentKeyword = searchParams.get('keyword');
    if (currentKeyword) {
      setValue(currentKeyword);
    } else {
      setValue('');
    }
  }, [searchParams, setValue]);

  const handleChange = (inputValue: string) => {
    setValue(inputValue);
  };

  const handleSubmit = () => {
    const searchTerm = value;
    const currentParams = new URLSearchParams();

    if (searchTerm) {
      currentParams.set('keyword', searchTerm);
      currentParams.set('offset', '0');
    } else {
      currentParams.delete('keyword');
    }
    router.push(`/?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <div className="relative -mt-[60px] z-10 bg-white rounded-2xl w-full mx-auto shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)]">
      <Search value={value} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}

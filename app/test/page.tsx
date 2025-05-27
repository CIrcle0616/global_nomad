'use client';

import { useState } from 'react';
import Search from '@/components/domain/activity/Search';

export default function TestPage() {
  const [query, setQuery] = useState('');

  // 검색 버튼 클릭 또는 Enter 입력 시 실행될 함수
  const handleSearch = () => {
    if (!query.trim()) return;
    console.log('검색 요청:', query);
    // 여기에 API 호출 또는 라우팅 처리 추가 가능
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <Search value={query} onChange={setQuery} onSubmit={handleSearch} />
    </main>
  );
}

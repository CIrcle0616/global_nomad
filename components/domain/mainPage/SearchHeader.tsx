import { getKoreanJosa } from '@/lib/getKoreanJosa';

interface SearchHeaderProps {
  keyword: string;
  reviewCount: number;
}

export default function SearchHeader({ keyword, reviewCount }: SearchHeaderProps) {
  const josa = getKoreanJosa(keyword, '으로/로');

  return (
    <header className="text-black flex flex-col gap-3 mt-8">
      <h1 className="text-[24px] md:text-[32px]">
        <b>{keyword}</b>
        {josa} 검색한 결과입니다.
      </h1>
      <p className="text-[16px]">총 {reviewCount}개의 결과</p>
    </header>
  );
}

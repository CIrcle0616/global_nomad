import Image from 'next/image';
import Link from 'next/link';

export default function KakaoOauthLink() {
  return (
    <Link href={'/카카오 로그인 주소'} className="inline-block">
      <Image src="/img_kakao.svg" fill alt="카카오 로그인" />
    </Link>
  );
}

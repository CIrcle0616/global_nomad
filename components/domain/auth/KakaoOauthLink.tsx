import Image from 'next/image';
import Link from 'next/link';

export default function KakaoOauthLink() {
  return (
    <Link
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}&response_type=code`}
      className="relative inline-block w-full h-full"
    >
      <Image src="/img_kakao.svg" fill alt="카카오 로그인" />
    </Link>
  );
}

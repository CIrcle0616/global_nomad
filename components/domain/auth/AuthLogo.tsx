import Image from 'next/image';
import Link from 'next/link';

export default function AuthLogo() {
  return (
    <Link href={'/'} className="inline-block">
      <Image src="/img_logoBig.svg" fill alt="글로벌 노마드" />
    </Link>
  );
}

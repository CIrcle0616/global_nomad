import Image from 'next/image';
import Link from 'next/link';
import FaceBook from '@/public/ic_facebook.svg';
import Twitter from '@/public/ic_twitter.svg';
import Instagram from '@/public/ic_instagram.svg';
import Youtube from '@/public/ic_youtube.svg';

export default function Footer() {
  return (
    <footer className="w-full px-4 py-[30px] bg-black text-gray-800 text-lg-regular">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center md:gap-0 relative ">
        <div className="flex flex-row md:gap-0 md:flex-none md:static md:w-auto gap-6">
          <p className="whitespace-nowrap md:mr-12">@codeit - 2025</p>

          <div className="flex gap-6 whitespace-nowrap md:absolute md:left-1/2 md:-translate-x-1/2">
            <p>Privacy Policy</p>
            <p>FAQ</p>
          </div>
        </div>

        <div className="flex gap-4 md:flex-row md:gap-4">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Image src={FaceBook} alt="페이스북" className="w-5 h-5" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Image src={Twitter} alt="트위터터" className="w-5 h-5" />
          </Link>
          <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Image src={Youtube} alt="유튜브" className="w-5 h-5" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Image src={Instagram} alt="인스타그램" className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

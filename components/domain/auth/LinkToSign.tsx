import Link from 'next/link';

interface LinkToAuthProps {
  text: string;
  href: string;
  childrenText: string;
}

export default function LinkToAuth({ text, href, childrenText }: LinkToAuthProps) {
  return (
    <p>
      {text}{' '}
      <Link href={href} className="underline text-green-500">
        {childrenText}
      </Link>{' '}
    </p>
  );
}

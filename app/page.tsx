import { getUserMe } from '@/services/users';
import Link from 'next/link';
import { cookies } from 'next/headers';
import LogoutBtn from '@/components/domain/auth/LogoutBtn';

export default async function MainPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  let data = null;
  if (accessToken) {
    try {
      data = await getUserMe(accessToken);
    } catch (error) {
      console.error('MainPage에서 사용자 정보 로딩 실패:', error);
    }
  }
  return (
    <main>
      <button>
        <Link href={'/login'} className="inline-block border bg-slate-400">
          로그인하기
        </Link>
      </button>
      <LogoutBtn />
      <button>
        <Link href={'/signup'} className="inline-block border bg-blue-400">
          회원가입하기
        </Link>
      </button>
      <button>
        <Link href={'/profile/info'} className="inline-block border bg-green-400">
          {'내 프로필 내정보 페이지 이동하기(로그인이 필요합니다)'}
        </Link>
      </button>
      {data && (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

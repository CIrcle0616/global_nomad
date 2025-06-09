'use client';

import { handleLogout } from '@/lib/actions';

export default function LogoutBtn() {
  return (
    <form action={handleLogout}>
      <button className="inline-block border bg-red-400" type="submit">
        로그아웃하기
      </button>
    </form>
  );
}

import { fetchFromServer } from '@/lib/fetchFromServer';
import GNBClient from './GnbClient';

export default async function Gnb() {
  let user = null;

  try {
    const res = await fetchFromServer('/users/me');
    user = await res.json();
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes('401')) {
        //로그인 안 된 상태 => user은 그대로 null
      } else {
        console.error('Gnb 유저 정보 fetch 실패:', err);
      }
    } else {
      console.error('알 수 없는 에러:', err);
    }
  }

  return <GNBClient user={user} />;
}

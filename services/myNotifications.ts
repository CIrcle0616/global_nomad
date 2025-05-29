import { fetchWrapper } from './fetchWrapper';

// 내 알림 리스트 조회
export function getMyNotifications(teamId: string, cursorId?: number, size?: number) {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
  });

  return fetchWrapper(`/${teamId}/my-notifications?${query}`, 'GET');
}

// 내 알림 삭제
export function delMyNotifications(teamId: string, notificationId: number) {
  return fetchWrapper(`/${teamId}/my-notifications/${notificationId}`, 'DELETE');
}

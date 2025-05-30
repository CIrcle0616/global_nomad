import { fetchWrapper } from './fetchWrapper';

// 내 알림 리스트 조회
export function getMyNotifications(cursorId?: number, size?: number) {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
  });

  return fetchWrapper(`/my-notifications?${query}`, 'GET');
}

// 내 알림 삭제
export function delMyNotifications(notificationId: number) {
  return fetchWrapper(`/my-notifications/${notificationId}`, 'DELETE');
}

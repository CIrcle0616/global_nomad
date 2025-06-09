import {
  DeleteMyNotificationSuccessResponse,
  GetMyNotificationsSuccessResponse,
} from '@/types/domain/myNotifications/types';
import { fetchWrapper } from './fetchWrapper';

// 내 알림 리스트 조회
export function getMyNotifications(
  { cursorId, size }: { cursorId?: number; size?: number } = {}, // 인자를 객체로 묶고 기본값 설정
  accessToken?: string,
): Promise<GetMyNotificationsSuccessResponse> {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
  }).toString();
  return fetchWrapper<GetMyNotificationsSuccessResponse>(`/my-notifications?${query}`, 'GET', undefined, {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}

// 내 알림 삭제
export function delMyNotifications(
  notificationId: number,
  accessToken?: string,
): Promise<DeleteMyNotificationSuccessResponse> {
  return fetchWrapper<DeleteMyNotificationSuccessResponse>(`/my-notifications/${notificationId}`, 'DELETE', undefined, {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}

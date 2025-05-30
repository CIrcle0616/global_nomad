import {
  DeleteMyNotificationSuccessResponse,
  GetMyNotificationsSuccessResponse,
} from '@/types/domain/myNotifications/types';
import { fetchWrapper } from './fetchWrapper';

// 내 알림 리스트 조회
export function getMyNotifications(
  teamId: string,
  cursorId?: number,
  size?: number,
): Promise<GetMyNotificationsSuccessResponse> {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
  });

  return fetchWrapper<GetMyNotificationsSuccessResponse>(`/${teamId}/my-notifications?${query}`, 'GET');
}

// 내 알림 삭제
export function delMyNotifications(
  teamId: string,
  notificationId: number,
): Promise<DeleteMyNotificationSuccessResponse> {
  return fetchWrapper<DeleteMyNotificationSuccessResponse>(`/${teamId}/my-notifications/${notificationId}`, 'DELETE');
}

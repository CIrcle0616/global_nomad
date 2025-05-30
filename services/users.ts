import {
  CreateUserSuccessResponse,
  GetMyInfoSuccessResponse,
  UpdateMyInfoSuccessResponse,
  UploadProfileImageSuccessResponse,
} from '@/types/domain/user/types';
import { fetchWrapper } from './fetchWrapper';

// 회원가입
export function signUp(
  teamId: string,
  body: { email: string; nickname: string; password: string },
): Promise<CreateUserSuccessResponse> {
  return fetchWrapper<CreateUserSuccessResponse>(`/${teamId}/users`, 'POST', body);
}

// 내 정보 조회
export function getUserMe(teamId: string): Promise<GetMyInfoSuccessResponse> {
  return fetchWrapper<GetMyInfoSuccessResponse>(`/${teamId}/users/me`, 'GET');
}

// 내 정보 수정
export function patchUserMe(
  teamId: string,
  body: { nickname: string; profileImageUrl: string; newPassword: string },
): Promise<UpdateMyInfoSuccessResponse> {
  return fetchWrapper<UpdateMyInfoSuccessResponse>(`/${teamId}/users/me`, 'PATCH', body);
}

// 프로필 이미지  url 생성
export function postProfileImg(teamId: string, image: File): Promise<UploadProfileImageSuccessResponse> {
  const formData = new FormData();
  formData.append('image', image);

  return fetchWrapper<UploadProfileImageSuccessResponse>(`/${teamId}/users/me/image`, 'POST', formData);
}

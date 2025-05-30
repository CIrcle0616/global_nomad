import {
  CreateUserSuccessResponse,
  GetMyInfoSuccessResponse,
  UpdateMyInfoSuccessResponse,
  UploadProfileImageSuccessResponse,
} from '@/types/domain/user/types';
import { fetchWrapper } from './fetchWrapper';

// 회원가입
export function signUp(body: {
  email: string;
  nickname: string;
  password: string;
}): Promise<CreateUserSuccessResponse> {
  return fetchWrapper<CreateUserSuccessResponse>(`/users`, 'POST', body);
}

// 내 정보 조회
export function getUserMe(): Promise<GetMyInfoSuccessResponse> {
  return fetchWrapper<GetMyInfoSuccessResponse>(`/users/me`, 'GET');
}

// 내 정보 수정
export function patchUserMe(body: {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
}): Promise<UpdateMyInfoSuccessResponse> {
  return fetchWrapper<UpdateMyInfoSuccessResponse>(`/users/me`, 'PATCH', body);
}

// 프로필 이미지  url 생성
export function postProfileIm(image: File): Promise<UploadProfileImageSuccessResponse> {
  const formData = new FormData();
  formData.append('image', image);

  return fetchWrapper<UploadProfileImageSuccessResponse>(`/users/me/image`, 'POST', formData);
}

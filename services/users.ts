import { fetchWrapper } from './fetchWrapper';

// 회원가입
export function signUp(body: { email: string; nickname: string; password: string }) {
  return fetchWrapper(`/users`, 'POST', body);
}

// 내 정보 조회
export function getUserMe() {
  return fetchWrapper(`/users/me`, 'GET');
}

// 내 정보 수정
export function patchUserMe(body: { nickname: string; profileImageUrl: string; newPassword: string }) {
  return fetchWrapper(`/users/me`, 'PATCH', body);
}

// 프로필 이미지  url 생성
export function postProfileImg(image: File) {
  const formData = new FormData();
  formData.append('image', image);

  return fetchWrapper(`/users/me/image`, 'POST', formData);
}

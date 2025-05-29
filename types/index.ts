import { components } from './api';

// ------------------------------------------------------------------
// 공통적으로 사용될 수 있는 스키마 타입 (Users 관련)
// ------------------------------------------------------------------
/**
 * 사용자 정보 응답 DTO (Users API에서 공통적으로 사용)
 */
export type UserServiceResponseDto = components['schemas']['UserServiceResponseDto'];

/**
 * 회원가입 요청 본문 DTO
 */
export type CreateUserBodyDto = components['schemas']['CreateUserBodyDto'];

/**
 * 내 정보 수정 요청 본문 DTO
 */
export type UpdateUserBodyDto = components['schemas']['UpdateUserBodyDto'];

/**
 * 공통 에러 응답 페이로드
 */
export type ErrorResponsePayload = components['schemas']['ErrorResponsePayload'];

// ------------------------------------------------------------------
// 공통적으로 사용될 수 있는 스키마 타입 (Oauth 관련)
// ------------------------------------------------------------------
/**
 * OAuth 앱 정보 DTO
 */
export type OauthAppDto = components['schemas']['OauthApp']; // 스키마 이름에 Dto 추가 (일관성)

/**
 * OAuth 프로바이더 Enum
 */
export type OauthProvider = components['schemas']['OauthProvider'];

/**
 * OAuth 앱 등록/수정 요청 본문 DTO
 */
export type UpsertOauthAppBodyDto = components['schemas']['UpsertOauthAppRequestBody']; // 스키마 이름에 BodyDto 추가 (일관성)

/**
 * OAuth 토큰 타입 (설명 포함)
 */
export type OauthToken = components['schemas']['OauthToken'];

/**
 * OAuth 로그인 요청 본문 DTO
 */
export type SignInWithOauthBodyDto = components['schemas']['SignInWithOauthRequestBody']; // 스키마 이름에 BodyDto 추가 (일관성)

/**
 * OAuth 회원가입 요청 본문 DTO
 */
export type SignUpWithOauthBodyDto = components['schemas']['SignUpWithOauthRequestBody']; // 스키마 이름에 BodyDto 추가 (일관성)

// ------------------------------------------------------------------
// 공통적으로 사용될 수 있는 스키마 타입 (MyReservations 관련)
// ------------------------------------------------------------------
/**
 * 체험 정보를 포함한 예약 응답 DTO
 */
export type ReservationWithActivityResponseDto = components['schemas']['ReservationWithActivityResponseDto'];

/**
 * 예약 응답 DTO (일반적인 예약 정보)
 */
export type ReservationResponseDto = components['schemas']['ReservationResponseDto'];

/**
 * 내 예약 수정(취소) 요청 본문 DTO
 */
export type UpdateMyReservationBodyDto = components['schemas']['UpdateMyReservationBodyDto'];

/**
 * 리뷰 작성 요청 본문 DTO
 */
export type CreateReviewBodyDto = components['schemas']['CreateReviewBodyDto'];

/**
 * 예약 상태 Enum
 */
export type ReservationStatus = components['schemas']['ReservationStatus'];

// ------------------------------------------------------------------
// 공통적으로 사용될 수 있는 스키마 타입 (MyNotifications 관련)
// ------------------------------------------------------------------
/**
 * 알림 정보 DTO
 */
export type NotificationDto = components['schemas']['NotificationDto'];

// ------------------------------------------------------------------
// 공통적으로 사용될 수 있는 스키마 타입 (MyActivities 관련)
// ------------------------------------------------------------------

/**
 * 월별 예약 현황 응답 DTO
 */
export type FindReservationsByMonthResponseDto = components['schemas']['FindReservationsByMonthResponseDto'];

/**
 * 날짜별 예약 정보가 있는 스케줄 응답 DTO
 */
export type ReservedScheduleResponseDto = components['schemas']['ReservedScheduleResponseDto'];

/**
 * 사용자 정보를 포함한 예약 응답 DTO
 */
export type ReservationWithUserResponseDto = components['schemas']['ReservationWithUserResponseDto'];

/**
 * 내 체험 예약 상태 업데이트 요청 본문 DTO
 */
export type UpdateMyActivityReservationBodyDto = components['schemas']['UpdateMyActivityReservationBodyDto'];

/**
 * 내 체험 수정 요청 본문 DTO
 */
export type UpdateMyActivityBodyDto = components['schemas']['UpdateMyActivityBodyDto'];

// ------------------------------------------------------------------
// 공통적으로 사용될 수 있는 스키마 타입 (auth 관련)
// ------------------------------------------------------------------

/**
 * 로그인 요청 본문 DTO
 */
export type LoginBodyDto = components['schemas']['LoginBodyDto'];

// ------------------------------------------------------------------
// 공통적으로 사용될 수 있는 스키마 타입
// ------------------------------------------------------------------
/**
 * 체험 기본 정보 DTO (데이터 전송 객체)
 */
export type ActivityBasicDto = components['schemas']['ActivityBasicDto'];

/**
 * 체험 상세 정보 DTO (하위 이미지 및 스케줄 포함)
 */
export type ActivityWithSubImagesAndSchedulesDto = components['schemas']['ActivityWithSubImagesAndSchedulesDto'];

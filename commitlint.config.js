module.exports = {
  rules: {
    // type-enum: 팀 규칙에서 정한 type만 허용
    // 허용 type: feat, fix, docs, style, refactor, test, chore, perf, ci, revert
    'type-enum': [
      2, // 에러 레벨: 2 (위반 시 커밋 실패)
      'always', // 항상 규칙 적용
      [
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'docs', // 문서 수정
        'style', // 코드 스타일 변경
        'refactor', // 코드 리팩토링
        'test', // 테스트 코드
        'chore', // 기타 작업
        'perf', // 성능 개선
        'ci', // CI/CD 관련
        'revert', // 이전 커밋 되돌리기
      ],
    ],

    // subject-case: 커밋 제목은 소문자로 시작, 대문자/파스칼케이스 등 금지
    'subject-case': [
      2, // 에러 레벨: 2
      'never', // 해당 케이스를 허용하지 않음
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],

    // subject-empty: 커밋 제목은 비울 수 없음
    'subject-empty': [2, 'never'],

    // subject-full-stop: 커밋 제목 끝에 마침표 금지
    'subject-full-stop': [2, 'never', '.'],
  },
};

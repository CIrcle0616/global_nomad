module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        'docs', // 문서 수정
        'style', // 코드 스타일 수정
        'refactor', // 코드 리팩토링
        'test', // 테스트 코드
        'chore', // 기타 작업
        'perf', // 성능 개선
        'ci', // CI/CD 설정 변경
        'revert', // 이전 커밋 되돌리기
      ],
    ],
    // 제목 시작 소문자, 마침표 금지
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
  },
};

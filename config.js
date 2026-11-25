/* 분석센터 이용 등록 · 폼 연결 설정
 *
 * 폼과 관련된 값은 이 파일 한 곳에만 있습니다.
 * 담당자에게 받은 "미리 채우기" 샘플 URL로 아래 값을 맞춥니다.
 * (2026-11-25 샘플 링크 기준. 키 대응은 tests/prefill_url.test.js 가 샘플 링크와 글자 단위로 비교해 검증)
 */
window.REG_CONFIG = {
  // true 여야 실제 폼으로 이동함
  ready: true,

  // 폼 주소 (?id=... 까지, 질문 키 앞부분)
  formUrl: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=M1J11q9GMECJBgV70pqe6Mx6wFenSDlIiyswy5PCDqFUQjhZMjJYMFBFTTVONVhCNVFRSEM1V1pXRC4u',

  // 질문별 미리 채우기 키 (샘플 URL의 & 뒤 "키=값" 중 키 부분)
  keys: {
    date:  'rc4f4e72b43404efeb61669ea4d2d4948', // 1. 방문 날짜
    proj:  'r426c327827934977812d26f3b2a9493a', // 2. 과제번호
    pi:    'r819f61b94fe743cfa4dfec29cb408d4a', // 3. 연구책임자(PI) 성명
    aff:   'rf9162fd4749d42569e4737e411282327', // 4. 연구책임자(PI) 소속
    name:  'r952299f3f0844a2cb97f2e3f6fd62039', // 5. 사용자 성명
    phone: 'rc123a1f02cb84216a6cff986933de4d9'  // 6. 사용자 연락처
  },

  // 날짜 값 형식. 사용 가능한 토큰: YYYY, MM(두 자리 월), M(월), DD(두 자리 일), D(일)
  // MS Forms 날짜 질문은 값 앞뒤에 큰따옴표가 붙음 → "2026-11-25" (샘플 링크: %222026-11-25%22)
  dateFormat: '"YYYY-MM-DD"',

  // 값 인코딩: 'component' = encodeURIComponent (공백 → %20) — 샘플 링크와 같음
  //            'plus'      = 공백을 + 로
  encoding: 'component',

  // 폼에 '개인정보 수집·이용 동의' 질문이 있으면 true → 페이지가 '동의 체크 후 제출' 안내를 보여 줌 (동의는 미리 채우지 않음)
  // 현재 폼에는 동의 질문이 없음. 나중에 질문을 추가하면 true 로 바꾸기 (질문을 추가해도 위 키는 그대로임)
  consent: false,

  // 날짜 기준 시간대
  timeZone: 'Asia/Seoul'
};

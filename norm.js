/* 입력값 정규화 · 미리 채우기 URL 생성 (브라우저와 Node 테스트에서 함께 사용)
   오류는 코드로 돌려줌: 'req' | 'digits' | 'year' | 'phone'  (문구는 index.html의 언어별 사전에 있음) */
(function (root) {
  'use strict';

  /* 과제번호: 숫자 8자리 → NHIS-####-#-###, 10자리 → NHIS-####-##-#-### */
  function normProj(s) {
    var raw = String(s == null ? '' : s).trim();
    if (!raw) return {};
    if (/^req/i.test(raw)) return { err: 'req' };
    var d = raw.replace(/\D/g, ''), v = null;
    if (d.length === 8) v = 'NHIS-' + d.slice(0, 4) + '-' + d[4] + '-' + d.slice(5);
    if (d.length === 10) v = 'NHIS-' + d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d[6] + '-' + d.slice(7);
    if (!v) return { err: 'digits' };
    var y = +d.slice(0, 4);
    if (y < 2015 || y > 2040) return { err: 'year' };
    return { v: v };
  }

  /* 휴대폰: 01X 11자리 → 010-1234-5678, 10자리 → 011-123-4567 */
  function normPhone(s) {
    var d = String(s == null ? '' : s).replace(/\D/g, '');
    if (/^01\d{9}$/.test(d)) return { v: d.slice(0, 3) + '-' + d.slice(3, 7) + '-' + d.slice(7) };
    if (/^01\d{8}$/.test(d)) return { v: d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6) };
    return d.length >= 10 ? { err: 'phone' } : {};
  }

  /* 지정 시간대의 오늘 날짜 */
  function todayParts(date, timeZone) {
    var p = new Intl.DateTimeFormat('en-CA', { timeZone: timeZone || 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' })
      .format(date || new Date()).split('-');
    return { iso: p.join('-'), y: p[0], m: +p[1], d: +p[2] };
  }

  /* 'YYYY-MM-DD', 'M/D/YYYY' 등 */
  function formatDate(t, fmt) {
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    return String(fmt || 'YYYY-MM-DD').replace(/YYYY|MM|M|DD|D/g, function (tok) {
      return { YYYY: t.y, MM: pad(t.m), M: String(t.m), DD: pad(t.d), D: String(t.d) }[tok];
    });
  }

  function enc(v, mode) {
    var e = encodeURIComponent(String(v == null ? '' : v));
    return mode === 'plus' ? e.replace(/%20/g, '+') : e;
  }

  /* cfg: REG_CONFIG, t: todayParts 결과, u: {name, phone}, p: {no, pi, aff} */
  function buildUrl(cfg, t, u, p) {
    var k = cfg.keys;
    var pairs = [
      [k.date, formatDate(t, cfg.dateFormat)],
      [k.proj, p.no], [k.pi, p.pi], [k.aff, p.aff],
      [k.name, u.name], [k.phone, u.phone]
    ];
    var sep = cfg.formUrl.indexOf('?') >= 0 ? '&' : '?';
    return cfg.formUrl + sep + pairs.map(function (kv) { return kv[0] + '=' + enc(kv[1], cfg.encoding); }).join('&');
  }

  var api = { normProj: normProj, normPhone: normPhone, todayParts: todayParts, formatDate: formatDate, buildUrl: buildUrl };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RegNorm = api;
})(this);

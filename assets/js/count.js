(function () {
  // 지표 카운트업. 이 사이트의 유일한 JS.
  //
  // 원칙 1 — 실제 수치가 기본값이다.
  //   HTML 에 88.5 / 93.5 / 83.6 이 그대로 들어 있고, 이 스크립트는 화면에
  //   들어오는 순간에만 0에서 세어 올린다. 초기화 시점에 0으로 덮어쓰지 않는다.
  //   그래야 관찰자가 발화하지 않거나 스크립트가 중간에 실패해도 잘못된 숫자(0)가
  //   남지 않는다. 실패 모드가 '애니메이션이 없음'이지 '수치가 틀림'이 아니어야 한다.
  //
  // 원칙 2 — 모션은 항상 재생한다(사용자 지시, 2026-08-13). CSS 쪽과 같은 방침이다.

  function run(el) {
    var raw = el.getAttribute('data-count');
    var target = parseFloat(raw);
    if (isNaN(target)) return;
    var decimals = (raw.split('.')[1] || '').length;
    var dur = 1500, t0 = null;

    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals); // 마지막 프레임은 정확한 값으로 확정
    }
    requestAnimationFrame(step);
  }

  function init() {
    var els = [].slice.call(document.querySelectorAll('[data-count]'));
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) return; // 관찰 불가 환경에서는 HTML 의 실제 수치를 그대로 둔다

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || e.target.dataset.counted) return;
        e.target.dataset.counted = '1';
        io.unobserve(e.target);
        run(e.target);
      });
    }, { threshold: 0.4 });

    els.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

(function () {
  // 컴포넌트 등장 — 관찰 단위는 '컴포넌트'. 순서는 스크롤 위치가 만든다.
  // 관찰자를 둘 둔다.
  //   arm : 화면 아래 30% 밖에서 미리 붙어 레이어를 준비시킨다(끊김 방지).
  //   on  : 화면 72% 지점을 넘으면 재생을 시작한다.
  // 재생이 끝나면 rv-done 으로 레이어 승격을 해제한다.
  var all = [].slice.call(document.querySelectorAll('[data-rv]'));
  if (!all.length) return;

  function on(el) { el.classList.add('rv-on'); }
  if (!('IntersectionObserver' in window)) { all.forEach(on); return; }

  var ioArm = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('rv-arm');
      ioArm.unobserve(e.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px 30% 0px' });

  var ioOn = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('rv-arm');   // arm 을 놓친 경우 대비
      on(e.target);
      ioOn.unobserve(e.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -28% 0px' });

  all.forEach(function (el) {
    ioArm.observe(el);
    ioOn.observe(el);
    el.addEventListener('animationend', function () { el.classList.add('rv-done'); }, { once: true });
  });

  // 기준선이 화면 72% 라 문서 끝 요소는 그 선까지 올라오지 못한다.
  window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
    all.forEach(on);
  }, { passive: true });
})();

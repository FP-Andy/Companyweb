const reveals = document.querySelectorAll('.reveal');
const nums = document.querySelectorAll('.num');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach((el) => revealObserver.observe(el));

const count = (el, target) => {
  const decimals = target % 1 !== 0 ? 1 : 0;
  const duration = 1300;
  const started = performance.now();

  const tick = (now) => {
    const p = Math.min((now - started) / duration, 1);
    const v = target * (1 - Math.pow(1 - p, 3));
    el.textContent = v.toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const numObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        count(el, Number(el.dataset.target));
        obs.unobserve(el);
      }
    });
  },
  { threshold: 0.45 }
);

nums.forEach((el) => numObserver.observe(el));

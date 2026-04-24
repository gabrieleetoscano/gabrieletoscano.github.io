/* ---------- Nav: active state ---------- */
(function activeNav() {
  const path = (location.pathname.split('/').pop() || 'home.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(a => {
    const target = (a.getAttribute('data-nav') || '').toLowerCase();
    if (target === path) a.classList.add('active');
  });
})();

/* ---------- Mobile burger ---------- */
(function burger() {
  const b = document.querySelector('.nav-burger');
  if (!b) return;
  const m = document.querySelector('.nav-links-m');
  b.addEventListener('click', () => {
    b.classList.toggle('open');
    if (m) m.style.display = b.classList.contains('open') ? 'flex' : 'none';
  });
})();

/* ---------- Scroll reveal ---------- */
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach(e => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => io.observe(e));
})();

/* ---------- Project filters ---------- */
(function projectFilters() {
  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-tags]');
  if (!filters.length || !cards.length) return;
  filters.forEach(f => {
    f.addEventListener('click', () => {
      filters.forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      const want = f.getAttribute('data-filter');
      cards.forEach(c => {
        const tags = (c.getAttribute('data-tags') || '').split(' ');
        const show = want === 'all' || tags.includes(want);
        c.style.display = show ? '' : 'none';
      });
    });
  });
})();

/* ---------- Parallax-ish hero float ---------- */
(function heroParallax() {
  const viz = document.querySelector('.hero-viz');
  if (!viz) return;
  const onMove = (e) => {
    const r = viz.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width;
    const dy = (e.clientY - cy) / r.height;
    viz.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
  };
  const reset = () => { viz.style.transform = ''; };
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseleave', reset);
})();

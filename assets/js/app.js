(() => {
  const btn = document.querySelector('.menu-button');
  const drawer = document.querySelector('.drawer');
  btn?.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', String(open));
  });
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

  const modal = document.querySelector('.line-modal');
  document.querySelectorAll('.js-line').forEach(a => a.addEventListener('click', e => {
    const url = window.SUGUWORK_CONFIG?.LINE_URL?.trim();
    if (url) { a.href = url; a.target = '_blank'; return; }
    e.preventDefault(); modal?.classList.add('show');
  }));
  modal?.querySelector('button')?.addEventListener('click', () => modal.classList.remove('show'));
  modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
})();

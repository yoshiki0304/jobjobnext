(() => {
  const config = window.SITE_CONFIG || {};
  const lineUrl = (config.LINE_URL || '').trim();
  const lineLinks = document.querySelectorAll('.js-line-link');
  const dialog = document.getElementById('line-dialog');

  lineLinks.forEach(link => {
    if (lineUrl) {
      link.href = lineUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.addEventListener('click', event => {
        event.preventDefault();
        if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
      });
    }
  });

  if (dialog) {
    dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  }

  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    mobileMenu?.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const slider = document.querySelector('[data-slider]');
  if (slider) {
    const wrap = slider.closest('.job-slider-wrap');
    const move = direction => {
      const card = slider.querySelector('.job-card');
      const gap = parseFloat(getComputedStyle(slider).columnGap || 24);
      const amount = (card?.getBoundingClientRect().width || slider.clientWidth * .8) + gap;
      slider.scrollBy({ left: direction * amount, behavior: 'smooth' });
    };
    wrap?.querySelector('.prev')?.addEventListener('click', () => move(-1));
    wrap?.querySelector('.next')?.addEventListener('click', () => move(1));
  }

  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('.faq-item[open]').forEach(other => {
        if (other !== item) other.removeAttribute('open');
      });
    });
  });
})();

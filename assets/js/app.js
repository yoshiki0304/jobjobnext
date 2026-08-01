(() => {
  'use strict';
  const c = window.SITE_CONTENT;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const esc = (v='') => String(v).replace(/[&<>'"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));

  function setText(selector, value) { const e=$(selector); if(e) e.textContent=value; }
  function setHref(selector, value) { $$(selector).forEach(e=>e.href=value); }

  setText('[data-brand-name]', c.brand.name);
  setText('[data-phone]', c.brand.phone);
  setText('[data-copyright]', c.brand.copyright);
  setHref('[data-phone-link]', c.brand.phoneHref);
  setHref('[data-line-link]', c.brand.lineUrl);

  setText('#heroEyebrow', c.hero.eyebrow);
  const heroTitle = $('#heroTitle'); if (heroTitle) heroTitle.innerHTML = esc(c.hero.title).replaceAll('\n','<br>');
  const heroLead = $('#heroLead'); if (heroLead) heroLead.innerHTML = esc(c.hero.lead).replaceAll('\n','<br>');
  const heroTags = $('#heroTags'); if (heroTags) heroTags.innerHTML = c.hero.tags.map(t=>`<li>${esc(t)}</li>`).join('');
  setText('#campaignTop', c.hero.campaignTop);
  setText('#campaignMain', c.hero.campaignMain);
  setText('#campaignBottom', c.hero.campaignBottom);
  setText('#campaignNote', c.hero.note);

  $('#worryList').innerHTML = c.worries.map(v=>`<li><span>✓</span>${esc(v)}</li>`).join('');

  $('#supportList').innerHTML = c.supports.map((x,i)=>`
    <article class="support-card reveal" style="--delay:${i*70}ms">
      <div class="support-card__image"><img src="${esc(x.image)}" alt="${esc(x.title)}"></div>
      <div class="support-card__body">
        <div class="support-card__no"><small>SUPPORT</small>${esc(x.no)}</div>
        <div><h3>${esc(x.title)}</h3><p class="support-card__catch">${esc(x.catch)}</p><p>${esc(x.text)}</p></div>
      </div>
    </article>`).join('');

  $('#jobTrack').innerHTML = c.jobs.map(x=>`
    <article class="job-card">
      <img src="${esc(x.image)}" alt="${esc(x.title)}">
      <div class="job-card__body">
        <p class="job-card__label">おすすめ求人例</p><h3>${esc(x.title)}</h3>
        <ul>${x.features.map(f=>`<li>✓ ${esc(f)}</li>`).join('')}</ul>
        <dl><div><dt>月収例</dt><dd>${esc(x.salary)}</dd></div><div><dt>勤務地</dt><dd>${esc(x.place)}</dd></div><div><dt>勤務</dt><dd>${esc(x.shift)}</dd></div></dl>
      </div>
    </article>`).join('');

  $('#compareBody').innerHTML = c.differences.map(row=>`<tr>${row.map((v,i)=>`<${i===0?'th':'td'}${i===3?' class="recommended"':''}>${i===3?'<span class="circle">◎</span>':''}${esc(v)}</${i===0?'th':'td'}>`).join('')}</tr>`).join('');

  $('#flowList').innerHTML = c.flow.map((x,i)=>`
    <article class="flow-item reveal" style="--delay:${i*60}ms"><div class="flow-item__num"><small>STEP</small>${esc(x[0])}</div><div><h3>${esc(x[1])}</h3><p>${esc(x[2])}</p></div></article>`).join('');

  $('#voiceList').innerHTML = c.voices.map((x,i)=>`
    <article class="voice-card reveal" style="--delay:${i*70}ms"><div class="voice-card__avatar" aria-hidden="true">${i===2?'♀':'♂'}</div><div><p class="voice-card__age">${esc(x.age)}</p><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div></article>`).join('');

  $('#faqList').innerHTML = c.faqs.map((x,i)=>`
    <details class="faq-item"><summary><span>Q${i+1}</span>${esc(x[0])}<i></i></summary><div class="faq-item__answer"><span>A</span><p>${esc(x[1])}</p></div></details>`).join('');

  // slider
  const track = $('#jobTrack');
  $('#jobPrev').addEventListener('click',()=>track.scrollBy({left:-track.clientWidth*.88,behavior:'smooth'}));
  $('#jobNext').addEventListener('click',()=>track.scrollBy({left:track.clientWidth*.88,behavior:'smooth'}));

  // mobile menu
  const header = $('.header');
  const fixedCta = $('.fixed-cta');
  const syncTopState = () => {
    const passed = window.scrollY > 110;
    if (header) header.classList.toggle('is-scrolled', passed);
    document.body.classList.toggle('hero-passed', window.scrollY > Math.min(700, window.innerHeight * 0.72));
  };
  syncTopState();
  window.addEventListener('scroll', syncTopState, {passive:true});

  const menuBtn=$('#menuBtn'), menu=$('#mobileMenu');
  menuBtn.addEventListener('click',()=>{ const open=menu.classList.toggle('is-open'); menuBtn.setAttribute('aria-expanded',open); });
  $$('a',menu).forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('is-open');menuBtn.setAttribute('aria-expanded','false')}));

  // reveal
  const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});
  $$('.reveal').forEach(e=>io.observe(e));

  // popup after 60% scroll; once per session
  const popup=$('#linePopup');
  const onScroll=()=>{
    const ratio=(scrollY+innerHeight)/document.documentElement.scrollHeight;
    if(ratio>.60 && !sessionStorage.getItem('linePopupClosed')){popup.classList.add('is-open');window.removeEventListener('scroll',onScroll)}
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  $('#popupClose').addEventListener('click',()=>{popup.classList.remove('is-open');sessionStorage.setItem('linePopupClosed','1')});

  // form date max today and tracking field
  const birth=$('#birth'); if(birth) birth.max=new Date().toISOString().split('T')[0];
  const source=$('#source'); if(source) source.value=new URLSearchParams(location.search).get('utm_source')||'direct';
})();

  // Where quote requests are sent
  const QUOTE_EMAIL = "bond@brondhomes.com";
  const $ = id => document.getElementById(id);

  if ($('yr')) $('yr').textContent = new Date().getFullYear();

  // Header background on scroll
  const header = document.querySelector('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll); onScroll();

  // Mobile menu
  $('menuBtn').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  document.querySelectorAll('#links a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

  // Fade-in on scroll
  const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Before/after sliders
  document.querySelectorAll('.ba').forEach(ba => {
    const r = ba.querySelector('input');
    const set = () => ba.style.setProperty('--pos', r.value + '%');
    r.addEventListener('input', set); set();
  });

  // Gallery filters
  document.querySelectorAll('#filters button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('#filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('#gallery .tile').forEach(t => t.classList.toggle('hide', f !== 'all' && t.dataset.cat !== f));
  }));

  // Lightbox (only for tiles that have a real photo)
  const lb = $('lightbox');
  if (lb) {
    document.querySelectorAll('#gallery .tile').forEach(t => t.addEventListener('click', () => {
      const img = t.querySelector('img'); if (!img) return;
      lb.querySelector('img').src = img.src; lb.classList.add('open');
    }));
    lb.addEventListener('click', () => lb.classList.remove('open'));
  }

  // Quote form: opens the visitor's email app with everything filled in
  const form = $('quoteForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const body =
      `Name: ${f.name.value}\nPhone: ${f.phone.value}\nEmail: ${f.email.value}\n` +
      `Project Type: ${f.type.value}\nBudget: ${f.budget.value}\n\n${f.message.value}`;
    window.location.href = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent('Quote Request – ' + f.name.value)}&body=${encodeURIComponent(body)}`;
    $('formMsg').style.display = 'block';
  });

// Abas do produto
const tabs = [...document.querySelectorAll('.tab')], panes = [...document.querySelectorAll('.pane')];
tabs.forEach((t, i) => t.addEventListener('click', () => {
  tabs.forEach((x, k) => { x.classList.toggle('on', k === i); x.setAttribute('aria-selected', k === i); });
  panes.forEach((p, k) => p.classList.toggle('on', k === i));
}));

// Aparecer ao rolar
const io = new IntersectionObserver((es) => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.card,.stats div,.steps li,.window,.plan,.value div').forEach(el => { el.classList.add('reveal'); io.observe(el); });

// Formulário (somente front-end: ligue ao seu backend/CRM)
document.getElementById('pilotForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const v = document.getElementById('email').value.trim(), msg = document.getElementById('msg');
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  msg.className = 'msg mono' + (ok ? '' : ' err');
  msg.textContent = ok ? 'Recebido! Entraremos em contato em breve.' : 'Informe um e-mail válido.';
  if (ok) e.target.reset();
});

// Botões dos planos pré-selecionam o plano no formulário
document.querySelectorAll('[data-plan]').forEach(a => a.addEventListener('click', () => {
  document.getElementById('plan').value = a.dataset.plan;
}));

// Seletor: indica o plano conforme o volume mensal de demandas
const vol = document.getElementById('vol'), volOut = document.getElementById('volOut'), rec = document.getElementById('rec');
function setPlan() {
  const v = +vol.value, p = v <= 60 ? 'starter' : v <= 200 ? 'pro' : 'business';
  volOut.textContent = v;
  rec.textContent = p[0].toUpperCase() + p.slice(1);
  ['starter', 'pro', 'business'].forEach(x => document.getElementById('p-' + x).classList.toggle('on', x === p));
  document.getElementById('plan').value = rec.textContent;
}
vol.addEventListener('input', setPlan);
setPlan();

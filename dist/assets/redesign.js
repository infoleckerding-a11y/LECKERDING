
(()=>{'use strict';
const en=document.documentElement.lang==='en',pick=(de,eng)=>en?eng:de,wa='https://wa.me/4915511546761';
const menu=document.querySelector('[data-menu]'),toggle=document.querySelector('[data-menu-button]');
toggle?.addEventListener('click',()=>{let open=menu.dataset.open==='true';menu.dataset.open=String(!open);toggle.setAttribute('aria-expanded',String(!open))});
const steps=[['🍲','Gericht auswählen','Choose a meal','Mahlzeit auf dem Touchscreen wählen.','Choose a meal on the touchscreen.'],['💳','Kontaktlos bezahlen','Pay contactlessly','Bequem bargeldlos zahlen.','Pay easily without cash.'],['♨️','Erhitzen oder mitnehmen','Heat or take away','Direkt heiß genießen oder gekühlt mitnehmen.','Enjoy it warm, or take it chilled.']];
const models={self:['Selbstzahler-Modell','Self-pay model','Nutzer zahlen selbst. Wir prüfen gemeinsam, ob das Standortkonzept wirtschaftlich passt.','Customers pay for meals themselves. We assess whether the location is a good fit.'],subsidy:['Mitarbeiter-Zuschuss','Employee meal subsidy','Vergünstigte Mahlzeiten als Benefit, mit individuell abgestimmter Kosten- und Steuerstruktur.','Subsidised employee meals with an individually agreed cost and tax structure.'],rent:['Miet- oder Pauschalmodell','Rental or fixed-fee model','Eine vereinbarte Monatsgebühr schafft planbare Kosten.','An agreed monthly fee creates predictable costs.'],partner:['Individuelle Partnerschaft','Tailored partnership','Bei passenden Flächen prüfen wir Umsatz- oder Standortmodelle.','For suitable sites, we can consider revenue-sharing or location arrangements.']};
document.querySelector('[data-model]')?.addEventListener('change',e=>{let m=models[e.target.value];document.querySelector('[data-model-title]').textContent=m[en?1:0];document.querySelector('[data-model-desc]').textContent=m[en?3:2]});
let category='all';const foods=[...document.querySelectorAll('[data-meal-category]')],filters=[...document.querySelectorAll('[data-filter]')],search=document.querySelector('[data-search]'),allergen=document.querySelector('[data-allergen]');
const filter=()=>{let n=0;foods.forEach(c=>{let valid=(category==='all'||c.dataset.mealCategory===category)&&(!search?.value||c.textContent.toLowerCase().includes(search.value.toLowerCase().trim()))&&(!allergen?.value||!c.dataset.allergens.split(' ').includes(allergen.value));c.hidden=!valid;if(valid)n++});let count=document.querySelector('[data-count]');if(count)count.textContent=n+pick(' Gerichte',' meals');let empty=document.querySelector('[data-empty]');if(empty)empty.hidden=n!==0};
filters.forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.filter;filters.forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));filter()}));search?.addEventListener('input',filter);allergen?.addEventListener('change',filter);filter();
const panel=document.querySelector('[data-chat]'),opener=document.querySelector('[data-chat-open]'),input=document.querySelector('[data-chat-input]');
const composer = panel?.querySelector('[data-compose]');
const chatPreference = 'leckerding-chat-dismissed';
function showChat(open, remember = false) {
  if (!panel || !opener) return;
  panel.hidden = !open;
  opener.setAttribute('aria-expanded', String(open));
  if (remember) {
    try {
      if (open) sessionStorage.removeItem(chatPreference);
      else sessionStorage.setItem(chatPreference, 'yes');
    } catch {}
    (open ? panel.querySelector('[data-chat-close]') : opener)?.focus();
  }
}
let dismissed = false;
try { dismissed = sessionStorage.getItem(chatPreference) === 'yes'; } catch {}
showChat(!dismissed);
opener?.addEventListener('click', () => showChat(panel.hidden, true));
panel?.querySelector('[data-chat-close]')?.addEventListener('click', () => showChat(false, true));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && panel && !panel.hidden) showChat(false, true);
});
document.querySelectorAll('[data-prompt]').forEach(button => {
  button.addEventListener('click', () => {
    composer.hidden = false;
    for (const prompt of panel.querySelectorAll('[data-prompt]')) {
      prompt.setAttribute('aria-expanded', String(prompt === button));
    }
    if (button.dataset.prompt || !input.value) input.value = button.dataset.prompt;
    input.focus();
  });
});
const sectors = document.querySelector('[data-sector-buttons]');
if (sectors) {
  const buttons = [...sectors.querySelectorAll('[data-sector]')];
  function choose(button) {
    for (const item of buttons) {
      const active = item === button;
      item.setAttribute('aria-pressed', String(active));
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    }
  }
  buttons.forEach(button => button.addEventListener('click', () => choose(button)));
  choose(buttons[0]);
  sectors.hidden = false;
}
const leadForm = document.querySelector('[data-lead-form]');
if (leadForm) {
  const params = new URLSearchParams(location.search);
  const option = [...leadForm.elements.type.options].find(item => item.dataset.site === params.get('site') && item.dataset.site);
  if (option) {
    option.selected = true;
    const topic = params.get('topic');
    if (topic) leadForm.elements.message.value = pick('Ich interessiere mich für einen Standort im Bereich ', 'I am interested in a location for ') + topic.slice(0,100) + '.';
  }
  leadForm.elements.method.addEventListener('change', () => {
    leadForm.querySelector('[type=submit]').textContent = leadForm.elements.method.value === 'whatsapp'
      ? pick('Anfrage in WhatsApp öffnen ↗','Open enquiry in WhatsApp ↗')
      : pick('Anfrage im E-Mail-Programm öffnen ↗','Open enquiry in my email app ↗');
  });
}
function openWhatsApp(text){window.open(wa+'?text='+encodeURIComponent(text),'_blank','noopener,noreferrer')}
document.querySelector('[data-chat-send]')?.addEventListener('click',()=>{let msg=input.value.trim();if(msg)openWhatsApp(msg);else input.focus()});
document.querySelector('[data-lead-form]')?.addEventListener('submit',e=>{e.preventDefault();const form=e.target;if(!form.reportValidity())return;let f=new FormData(form),msg=pick('Hallo LECKERDING, ich möchte einen Standort prüfen lassen.','Hello LECKERDING, I would like to discuss a location.')+'\n\n'+['Name: '+f.get('name'),'Email: '+f.get('email'),pick('Standort: ','Location: ')+f.get('location'),pick('Standortart: ','Site type: ')+f.get('type'),pick('Nachricht: ','Message: ')+f.get('message')].join('\n');if(f.get('method')==='whatsapp')openWhatsApp(msg);else window.location.href='mailto:info@leckerding.com?subject='+encodeURIComponent(pick('Standortanfrage an LECKERDING','LECKERDING location enquiry'))+'&body='+encodeURIComponent(msg)});
const key='leckerding-privacy-v1',banner=document.querySelector('[data-cookie]');
document.querySelectorAll('[data-consent]').forEach(btn=>btn.addEventListener('click',()=>{try{localStorage.setItem(key,btn.dataset.consent);if(btn.dataset.consent==='functional')localStorage.setItem('leckerding-language',en?'en':'de');else localStorage.removeItem('leckerding-language')}catch{}if(banner)banner.hidden=true}));
document.querySelectorAll('[data-settings]').forEach(btn=>btn.addEventListener('click',()=>{if(banner){banner.hidden=false;banner.querySelector('button')?.focus()}}));
/* Discoverable vending demonstration with user-controlled rotation. */
const stepButtons = [...document.querySelectorAll('[data-step]')];
const stepView = document.querySelector('[data-step-preview]');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let stepIndex = 0;
let rotationPaused = motion.matches;
let rotationTimer;
const rotationControl = document.querySelector('[data-step-pause]');
function renderStep(index) {
  stepIndex = index;
  stepView.setAttribute('aria-labelledby', 'step-' + index);
  const step = steps[index];
  stepButtons.forEach((button, i) => {
    button.setAttribute('aria-selected', String(i === index));
    button.tabIndex = i === index ? 0 : -1;
  });
  stepView.querySelector('.emoji').textContent = step[0];
  stepView.querySelector('h3').textContent = step[en ? 2 : 1];
  stepView.querySelector('p').textContent = step[en ? 4 : 3];
  stepView.querySelector('.counter').textContent = '0' + (index + 1) + '/03';
}
function scheduleRotation() {
  clearInterval(rotationTimer);
  if (rotationControl) {
    rotationControl.textContent = rotationPaused ? pick('▶ Ablauf starten', '▶ Start rotation') : pick('Ⅱ Ablauf pausieren', 'Ⅱ Pause rotation');
    rotationControl.setAttribute('aria-pressed', String(rotationPaused));
  }
  if (!rotationPaused && !document.hidden) {
    rotationTimer = setInterval(() => renderStep((stepIndex + 1) % stepButtons.length), 3000);
  }
}
if (stepButtons.length && stepView) {
  stepButtons.forEach((button, index) => {
    button.addEventListener('click', () => { renderStep(index); scheduleRotation(); });
    button.addEventListener('keydown', event => {
      const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      let target = (index + (['ArrowLeft','ArrowUp'].includes(event.key) ? 2 : 1)) % 3;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = 2;
      rotationPaused = true;
      renderStep(target);
      stepButtons[target].focus();
      scheduleRotation();
    });
  });
  rotationControl?.addEventListener('click', () => { rotationPaused = !rotationPaused; scheduleRotation(); });
  document.addEventListener('visibilitychange', scheduleRotation);
  motion.addEventListener('change', () => { rotationPaused = motion.matches; scheduleRotation(); });
  renderStep(0);
  scheduleRotation();
}
const faqSearch = document.querySelector('[data-faq-search]');
if (faqSearch) {
  const normalize = text => text.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss');
  const groups = [...document.querySelectorAll('.faq-group')];
  const questions = [...document.querySelectorAll('.faq-group details')];
  const count = document.querySelector('[data-faq-count]');
  const empty = document.querySelector('[data-faq-empty]');
  function searchFaq() {
    const terms = normalize(faqSearch.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const question of questions) {
      const matches = terms.every(term => normalize(question.textContent).includes(term));
      question.hidden = !matches;
      if (matches) visible++;
    }
    groups.forEach(group => { group.hidden = !group.querySelector('details:not([hidden])'); });
    document.querySelectorAll('.faq-topics a').forEach(link => {
      link.hidden = document.getElementById(link.hash.slice(1)).hidden;
    });
    count.textContent = visible + pick(' von ', ' of ') + questions.length + pick(' Fragen', ' questions');
    empty.hidden = visible > 0;
  }
  faqSearch.addEventListener('input', searchFaq);
  document.querySelector('[data-faq-reset]')?.addEventListener('click', () => { faqSearch.value = ''; searchFaq(); faqSearch.focus(); });
  searchFaq();
}

})();

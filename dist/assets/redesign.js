
(()=>{'use strict';
const en=document.documentElement.lang==='en',pick=(de,eng)=>en?eng:de,wa='https://wa.me/4915511546761';
const menu=document.querySelector('[data-menu]'),toggle=document.querySelector('[data-menu-button]');
toggle?.addEventListener('click',()=>{let open=menu.dataset.open==='true';menu.dataset.open=String(!open);toggle.setAttribute('aria-expanded',String(!open))});
/* Mega menu: the original links remain usable when JavaScript is unavailable. */
const mainNav=document.querySelector('[data-menu]');
if(mainNav){
 const asset=document.querySelector('script[src$="assets/redesign.js"]');
 const root=(asset?.getAttribute('src')||'assets/redesign.js').replace(/assets\/redesign\.js$/,'');
 const part=en?'en/':'';const href=path=>root+part+path;
 const page=location.pathname;
 const active=key=>key==='home'?(/\/(en\/)?(index\.html)?$/.test(page)):page.includes('/'+key+'/');
 const item=(url,label,key)=>'<a href="'+url+'"'+(active(key)?' aria-current="page"':'')+'>'+label+'</a>';
 mainNav.classList.add('nav-mega');
 mainNav.innerHTML=item(href('index.html'),'Home','home')+
 '<div class="nav-group"><button class="nav-trigger" type="button" data-nav-trigger aria-expanded="false" aria-controls="nav-solutions">'+pick('Lösungen','Solutions')+' <span aria-hidden="true" class="nav-chevron">⌄</span></button><div class="nav-panel" id="nav-solutions" hidden><div class="nav-panel-lead"><span class="nav-overline">'+pick('FÜR STANDORTE','FOR LOCATIONS')+'</span><strong>'+pick('Gute Mahlzeiten. Weniger Aufwand.','Better meals. Less effort.')+'</strong><p>'+pick('Verpflegungslösungen für unterschiedliche Standorte.','Food vending solutions for different locations.')+'</p>'+item(href('standortloesungen/index.html'),pick('Alle Lösungen ansehen →','View solutions →'),'standortloesungen')+'</div><div class="nav-panel-links">'+item(href('sortiment/index.html'),pick('Sortiment','Menu'),'sortiment')+item(href('standortloesungen/index.html'),pick('Standortlösungen','Location solutions'),'standortloesungen')+item(root+'partnerschaftsmodelle/index.html',pick('Partnerschaftsmodelle','Partnership models (DE)'),'partnerschaftsmodelle')+item(root+'unserer-automat/index.html',pick('Unser Automat','How it works (DE)'),'unserer-automat')+'</div></div></div>'+
 item(href('ueber-uns/index.html'),pick('Unternehmen','Company'),'ueber-uns')+
 '<div class="nav-group"><button class="nav-trigger" type="button" data-nav-trigger aria-expanded="false" aria-controls="nav-insights">'+pick('Wissen','Insights')+' <span aria-hidden="true" class="nav-chevron">⌄</span></button><div class="nav-panel" id="nav-insights" hidden><div class="nav-panel-lead"><span class="nav-overline">'+pick('FRAGEN & EINBLICKE','HELP & IDEAS')+'</span><strong>'+pick('Wissenswertes rund um LECKERDING.','Everything worth knowing.')+'</strong><p>'+pick('Antworten und Beiträge rund um moderne Verpflegung.','Answers and articles about modern workplace meals.')+'</p>'+item(href('faq/index.html'),pick('Zur FAQ →','Explore FAQ →'),'faq')+'</div><div class="nav-panel-links">'+item(href('faq/index.html'),pick('Häufige Fragen','FAQ'),'faq')+item(href('blog/index.html'),pick('Blog & Beiträge','Journal'),'blog')+item(href('ueber-uns/index.html#shawn-veldhuis'),pick('Gründer kennenlernen','Meet the founder'),'ueber-uns')+item(root+'allergene/index.html',pick('Zutaten & Allergene','Allergens (DE)'),'allergene')+'</div></div></div>'+
 item(href('kontakt/index.html'),pick('Kontakt','Contact'),'kontakt');
 const triggers=[...mainNav.querySelectorAll('[data-nav-trigger]')];
 const hoverPointer=matchMedia('(hover: hover) and (pointer: fine)');
 const header=mainNav.closest('.header');
 let leaveTimer;
 const cancelLeave=()=>{window.clearTimeout(leaveTimer);leaveTimer=undefined;};
 const close=()=>{cancelLeave();for(const btn of triggers){btn.setAttribute('aria-expanded','false');document.getElementById(btn.getAttribute('aria-controls')).hidden=true;}};
 const open=btn=>{
   cancelLeave();
   for(const other of triggers){
     const selected=btn===other;
     other.setAttribute('aria-expanded',String(selected));
     document.getElementById(other.getAttribute('aria-controls')).hidden=!selected;
   }
 };
 const scheduleClose=()=>{
   if(!hoverPointer.matches)return;
   cancelLeave();
   // Intentional grace period: moving from the trigger into an absolutely
   // positioned mega-panel must not dismiss it while crossing the header.
   leaveTimer=window.setTimeout(()=>{
     if(!header?.matches(':hover') && !mainNav.matches(':focus-within'))close();
   },350);
 };
 triggers.forEach(btn=>{
   btn.addEventListener('click',()=>{
     // A desktop click must never dismiss a menu that just opened on hover.
     if(hoverPointer.matches){open(btn);return;}
     btn.getAttribute('aria-expanded')==='true'?close():open(btn);
   });
   btn.addEventListener('mouseenter',()=>{if(hoverPointer.matches)open(btn);});
   btn.closest('.nav-group').querySelector('.nav-panel').addEventListener('mouseenter',cancelLeave);
 });
 // Close only after leaving the complete header / panel, not after leaving
 // the much smaller trigger group. Mobile remains click-operated.
 header?.addEventListener('mouseenter',cancelLeave);
 header?.addEventListener('mouseleave',scheduleClose);
 document.addEventListener('click',event=>{if(!event.target.closest('.header'))close();});
 document.addEventListener('keydown',event=>{
   if(event.key==='Escape'){
     const active=triggers.find(btn=>btn.getAttribute('aria-expanded')==='true');
     if(active){close();active.focus();}
   }
 });
 mainNav.addEventListener('focusout',event=>{
   if(event.relatedTarget && !header?.contains(event.relatedTarget))close();
 });
 /* Keep readers on the matching page when switching languages. */
 const languageLinks=document.querySelectorAll('.lang a[lang]');
 if(languageLinks.length){
   const canonical=document.querySelector('link[rel="canonical"]')?.href||location.href;
   let route=new URL(canonical,location.href).pathname.replace(/^\/+/,'').replace(/^en\//,'');
   if(!route||route.endsWith('/'))route+='index.html';
   const translated=new Set(['index.html','sortiment/index.html','standortloesungen/index.html','kontakt/index.html','faq/index.html','blog/index.html','ueber-uns/index.html','impressum/index.html','agb/index.html','datenschutzerklaerung/index.html','blog/lunch-zuschuss-ohne-budgetchaos/index.html','blog/vollbetreut-lunch/index.html','blog/welches-lunch-modell-passt/index.html']);
   const englishRoute=translated.has(route)?route:(route.startsWith('blog/')?'blog/index.html':'index.html');
   for(const anchor of languageLinks){
     anchor.href=anchor.lang==='en'?root+'en/'+englishRoute:root+route;
   }
 }
}
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
showChat(false);
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

/* Product demonstration: local-only state, no external analytics. */
const machineFeatureButtons=[...document.querySelectorAll('[data-machine-feature]')];
if(machineFeatureButtons.length){
 const details=[
 ['Kühlung','Die vorverpackten Mahlzeiten werden im gekühlten Bereich bereitgestellt. LECKERDING überwacht den Betrieb und kümmert sich um die vereinbarten Kontroll- und Serviceprozesse.'],
 ['Erwärmung','Auf Wunsch erwärmt das Gerät die ausgewählte Mahlzeit direkt vor Ort. Die konkrete Erhitzung erfolgt nach dem für das Produkt vorgesehenen Verfahren.'],
 ['Touchscreen & Zahlung','Die Gerichte lassen sich am Touchscreen auswählen und bargeldlos bezahlen. Zutaten, Allergene und Nährwerte stehen zusätzlich auf unserer Sortimentsseite.'],
 ['Betreuung','LECKERDING koordiniert Bestückung, Reinigung, technische Prüfung und die vereinbarten betrieblichen Kontrollen – angepasst an den jeweiligen Standort.']
 ];
 machineFeatureButtons.forEach((button,i)=>button.addEventListener('click',()=>{
   machineFeatureButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   document.querySelector('[data-machine-feature-title]').textContent=details[i][0];
   document.querySelector('[data-machine-feature-description]').textContent=details[i][1];
 }));
}
const placementInfo={
 indoor:['Mitten im Alltag','Ideal in Foyers, Pausenräumen, Lobbys, Wohnanlagen und anderen gut erreichbaren Innenbereichen. Entscheidend sind Platz, Stromanschluss, Belüftung und der Zugang zum Nachfüllen.',['Regulärer Stromanschluss','Gute Sichtbarkeit und Erreichbarkeit','Platz für Bedienung und Service'],'Innenbereich · Illustration'],
 outdoor:['Auch geschützt draußen möglich','In geeigneten geschützten Außenbereichen kann der Automat eine Verpflegungslücke schließen – beispielsweise an überdachten Standorten. Die konkrete Machbarkeit prüfen wir immer individuell.',['Ausreichender Schutz vor Witterung','Geeignete Stromversorgung und Temperaturbedingungen','Sicherer Zugang für Nutzer und Service'],'Geschützter Außenbereich · Illustration']
};
const placementButtons=[...document.querySelectorAll('[data-placement]')];
placementButtons.forEach(button=>button.addEventListener('click',()=>{
 const key=button.dataset.placement;
 const [title,copy,items,label]=placementInfo[key];
 placementButtons.forEach(b=>b.setAttribute('aria-selected',String(b===button)));
 document.querySelector('[data-placement-title]').textContent=title;
 document.querySelector('[data-placement-copy]').textContent=copy;
 const list=document.querySelector('[data-placement-list]');list.replaceChildren(...items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
 document.querySelector('[data-placement-scene]').dataset.placementScene=key;
 document.querySelector('[data-placement-scene-label]').textContent=label;
 document.getElementById('placement-panel')?.setAttribute('aria-labelledby',button.id);
}));
const partnerModels={
 office:['Mehr Verpflegung für Ihr Team','Regelmäßige Nutzer, Pausenzeiten und ein möglicher Mitarbeiter-Benefit stehen im Vordergrund. Eine Pauschale, ein Zuschuss oder eine Kombination können infrage kommen.',[['Miet- oder Pauschalmodell','#partner-rent'],['Essenszuschuss','#partner-benefit']]],
 living:['Mehr Komfort für Bewohner und Gäste','Ein zusätzliches Verpflegungsangebot ohne eigene Küche ist hier oft besonders interessant. Ein Service-Modell oder eine flexible Kombination kann passen.',[['Service-Modell','#partner-service'],['Individuelle Kombination','#partner-flex']]],
 transit:['Für Menschen unterwegs','Wo viele Menschen kommen und gehen, kann eine individuelle Nutzung der Fläche oder eine Umsatzpartnerschaft sinnvoll sein.',[['Standort- oder Umsatzmodell','#partner-location'],['Service-Modell','#partner-service']]],
 leisure:['Mehr Auswahl vor und nach Aktivitäten','Studios und Freizeiteinrichtungen können ihr Angebot mit vollständigen Mahlzeiten ergänzen – ohne selbst eine Küche betreiben zu müssen.',[['Service-Modell','#partner-service'],['Individuelle Kombination','#partner-flex']]]
};
const partnerButtons=[...document.querySelectorAll('[data-partner-match]')];
partnerButtons.forEach(button=>button.addEventListener('click',()=>{
 const data=partnerModels[button.dataset.partnerMatch];
 partnerButtons.forEach(b=>b.setAttribute('aria-selected',String(b===button)));
 document.querySelector('[data-match-title]').textContent=data[0];
 document.querySelector('[data-match-description]').textContent=data[1];
 const links=document.querySelector('[data-match-links]');
 links.replaceChildren(...data[2].map(([label,href])=>{const a=document.createElement('a');a.href=href;a.textContent=label+' ↗';return a;}));
 document.getElementById('match-panel')?.setAttribute('aria-labelledby',button.id);
}));
/* Progressive enhancement: content remains visible if JavaScript is disabled. */
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('has-entered');observer.unobserve(entry.target);}}),{threshold:.1});
 document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));
}

const leadForm=document.querySelector('[data-lead-form]');
if(leadForm){
 const params=new URLSearchParams(location.search);
 const site=leadForm.elements.type;
 const option=[...site.options].find(item=>item.dataset.site===params.get('site')&&item.dataset.site);
 if(option){
   option.selected=true;
   const topic=params.get('topic');
   if(topic)leadForm.elements.message.value=pick('Ich interessiere mich für einen Standort im Bereich ','I am interested in a location for ')+topic.slice(0,100)+'.';
 }
 const feedback=leadForm.querySelector('[data-form-feedback]');
 const button=leadForm.querySelector('[type=submit]');
 const originalLabel=button.textContent;
 const method=leadForm.elements.method;
 const phone=leadForm.elements.phone;
 method.addEventListener('change',()=>{
   phone.required=method.value==='WhatsApp';
   leadForm.querySelector('label[for=phone]').textContent=phone.required?pick('Telefonnummer für WhatsApp *','Phone number for WhatsApp *'):pick('Telefonnummer (optional)','Phone number (optional)');
 });
 leadForm.addEventListener('submit',async event=>{
   event.preventDefault();
   if(!leadForm.reportValidity())return;
   if(leadForm.elements._honey.value.trim())return;
   button.disabled=true;
   button.textContent=pick('Wird gesendet …','Sending …');
   feedback.className='form-feedback';
   feedback.textContent=pick('Anfrage wird übermittelt …','Submitting your enquiry …');
   try{
     const response=await fetch('https://formsubmit.co/ajax/info@leckerding.com',{
       method:'POST',headers:{'Accept':'application/json'},body:new FormData(leadForm),credentials:'omit',referrerPolicy:'strict-origin-when-cross-origin'
     });
     if(!response.ok)throw new Error('HTTP '+response.status);
     const result=await response.json();
     if(result.success!==true&&result.success!=='true')throw new Error(result.message||'Form service declined the request');
     leadForm.reset();
     phone.required=false;
     feedback.className='form-feedback is-success';
     feedback.textContent=pick('Vielen Dank! Der Formulardienst hat Ihre Anfrage angenommen. Unser Team meldet sich nach der Zustellung bei Ihnen.','Thank you! The form service has accepted your enquiry. Our team will get back to you once it is delivered.');
   }catch(error){
     feedback.className='form-feedback is-error';
     feedback.textContent=pick('Die Anfrage konnte nicht bestätigt werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@leckerding.com.','The enquiry could not be confirmed. Please try again or email info@leckerding.com directly.');
   }finally{
     button.disabled=false;
     button.textContent=originalLabel;
   }
 });
}
function openWhatsApp(text){window.open(wa+'?text='+encodeURIComponent(text),'_blank','noopener,noreferrer')}
document.querySelector('[data-chat-send]')?.addEventListener('click',()=>{let msg=input.value.trim();if(msg)openWhatsApp(msg);else input.focus()});
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
  document.querySelector('.steps-layout')?.setAttribute('data-rotating',String(!rotationPaused && !document.hidden));
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
  document.querySelector('[data-faq-form]')?.addEventListener('submit',event=>{
    event.preventDefault();searchFaq();
    const first=questions.find(q=>!q.hidden);
    if(first){first.open=true;first.scrollIntoView({behavior:motion.matches?'auto':'smooth',block:'center'});first.querySelector('summary')?.focus({preventScroll:true});}
    else empty?.scrollIntoView({behavior:motion.matches?'auto':'smooth',block:'center'});
  });
  document.querySelector('[data-faq-reset]')?.addEventListener('click', () => { faqSearch.value = ''; searchFaq(); faqSearch.focus(); });
  searchFaq();
}

/* Journal dates come only from each article's authored <time datetime> attribute. */
const blogGrid=document.querySelector('[data-blog-grid]');
const blogTools=document.querySelector('[data-blog-tools]');
if(blogGrid&&blogTools){
 const cards=[...blogGrid.querySelectorAll('.original-card')];
 const from=blogTools.querySelector('[data-blog-from]'),to=blogTools.querySelector('[data-blog-to]'),order=blogTools.querySelector('[data-blog-order]');
 const count=blogTools.querySelector('[data-blog-count]'),empty=document.querySelector('[data-blog-empty]');
 const posts=cards.map((node,index)=>({node,index,iso:node.querySelector('time[datetime]')?.getAttribute('datetime')||'',stamp:Date.parse(node.querySelector('time[datetime]')?.dateTime||'')||0}));
 const dates=posts.map(p=>p.iso.slice(0,10)).filter(Boolean).sort();if(dates.length){from.min=dates[0];to.max=dates[dates.length-1];}
 function updateJournal(){
  const sorted=[...posts].sort((a,b)=>(order.value==='asc'?1:-1)*(a.stamp-b.stamp)||a.index-b.index);
  let visible=0;
  for(const post of sorted){const date=post.iso.slice(0,10);const show=(!from.value||date>=from.value)&&(!to.value||date<=to.value);post.node.hidden=!show;if(show)visible++;blogGrid.appendChild(post.node);}
  count.textContent=visible+' '+pick(visible===1?'Beitrag':'Beiträge',visible===1?'article':'articles');
  if(empty)empty.hidden=visible>0;
 }
 for(const control of [from,to,order])control.addEventListener('change',updateJournal);
 blogTools.addEventListener('reset',()=>requestAnimationFrame(updateJournal));
 updateJournal();
}
})();

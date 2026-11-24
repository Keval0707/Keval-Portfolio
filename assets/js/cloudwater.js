
const FLOWS = [{"key":"rental","name":"Rent a purifier","subtitle":"Identity, address, agreement, review and AutoPay setup","summary":"A high-commitment journey is divided into a visible five-step progression, giving identity verification, delivery information, agreement and payment distinct stages.","why":"The stepper makes progress legible; card summaries let customers verify the device and terms before authorizing recurring payments.","steps":[{"image":"Shop_rent","label":"Explore rental products","description":"The store has separate Buy and Rent modes."},{"image":"Rent Detail Page","label":"Understand the offer","description":"The product page presents a rent option and plan details."},{"image":"Step_1-Rent Identity Verification","label":"Verify identity","description":"The first formal step requests Aadhaar-related identity verification."},{"image":"Step_2-Add Address","label":"Choose delivery address","description":"The progress indicator advances to address selection."},{"image":"Step_3-Agreement","label":"Review the agreement","description":"Plan terms and the agreement appear before review."},{"image":"Step_4-Review Order","label":"Confirm the order","description":"Device, address, AutoPay and charges are summarized."},{"image":"Step_5-Payment","label":"Set up payment","description":"The final step offers UPI Auto-Mandate or card selection."},{"image":"Autopay successfully","label":"See confirmation","description":"A success state confirms that AutoPay is activated."}]},{"key":"service","name":"Book a service","subtitle":"Choose service, identify the device and schedule a visit","summary":"Booking connects service types with device context and a scheduling interface, while later screens show tracking, history and feedback.","why":"The flow asks for practical information—brand/model, issue details, photographs, and visit date—so the service request has context.","steps":[{"image":"Book Service","label":"Explore services","description":"Installation, repair, maintenance and filter replacement are visible."},{"image":"New Water Purifier Installation","label":"Understand installation","description":"The service detail explains what the installation includes."},{"image":"Install, Uninstall, AMC","label":"Identify a purifier","description":"Brand/model, serial or AMC ID, and photos can be added."},{"image":"RO Brand","label":"Select a brand","description":"The user chooses from a searchable brand list."},{"image":"RO Model","label":"Select a model","description":"The purifier model narrows the service context."},{"image":"Scheduling Screen","label":"Choose a visit date","description":"The calendar makes an available visit date selectable."},{"image":"Booking detail","label":"Track booking details","description":"Status, technician information and issue photos are visible."},{"image":"Service History","label":"Review past service","description":"The recorded visit can be reviewed alongside summary details."}]},{"key":"amc","name":"Manage AMC care","subtitle":"Review protection, select a purifier and renew coverage","summary":"Maintenance protection is surfaced as an ongoing relationship rather than a one-time purchase. Active devices, plan scope and renewal paths have their own screens.","why":"Plan comparisons make protection levels explicit, while device-specific records keep coverage tied to the right purifier.","steps":[{"image":"AMC","label":"Explore coverage","description":"The AMC dashboard includes plans and purifier cards."},{"image":"AMC_Select_the_purifier","label":"Select the device","description":"The user chooses a purifier to associate with coverage."},{"image":"AMC_Protection_Detail","label":"Compare protection","description":"Basic Labour, Semi-Comprehensive and Fully Comprehensive are visible."},{"image":"AMC_Renew_Detail","label":"Review renewal","description":"An existing device is shown with available renewal tiers."},{"image":"AMC_Renew_plan_Detail","label":"Inspect plan details","description":"A panel exposes what is and is not covered."},{"image":"Active AMC Protection","label":"See active plans","description":"Protected devices and expiration dates appear together."},{"image":"Active AMC Protection-detail","label":"Inspect coverage details","description":"Service history and AMC plan details are available."}]},{"key":"shopping","name":"Buy a purifier","subtitle":"Discover, evaluate, add to cart and confirm payment","summary":"The shopping path exposes dedicated buying and renting modes, product detail content, cart states and payment confirmation.","why":"Consistent product cards, visible totals and a confirmation state support a straightforward transaction path.","steps":[{"image":"Shop_buy","label":"Browse products","description":"The store lists purifier cards in Buy mode."},{"image":"Product Detail Page","label":"Assess a device","description":"The detail page combines product description, features and benefits."},{"image":"Your Cart","label":"Review cart","description":"Selected product and billing summary appear together."},{"image":"Order Summery","label":"Review order","description":"Address, totals and offers can be reviewed."},{"image":"Payment Method","label":"Select payment method","description":"Several card and UPI-oriented payment options are shown."},{"image":"Payment Conformation","label":"See order confirmation","description":"The success screen summarizes the order and next actions."},{"image":"My Orders","label":"Follow order status","description":"The user can revisit order details and tracking."}]},{"key":"setup","name":"Get started","subtitle":"Understand the proposition, authenticate and personalize","summary":"Three onboarding panels introduce service, AMC management and shopping before sign-up/login and device-aware profile setup.","why":"The introduction establishes the app’s breadth, while profile setup creates a path to device-specific support.","steps":[{"image":"Splash Screen","label":"Meet Cloudwater","description":"The brand establishes a clean, water-focused tone."},{"image":"Onboarding 1","label":"Discover service","description":"The first panel emphasizes smarter service at your fingertips."},{"image":"Onboarding 2","label":"Discover AMC","description":"The second panel focuses on tracking and renewing AMC."},{"image":"Onboarding 3","label":"Discover shopping","description":"The third panel introduces genuine purifier shopping."},{"image":"Signup-login","label":"Choose an entry point","description":"Create an account or sign in."},{"image":"Signup","label":"Provide details","description":"Account creation collects key contact fields."},{"image":"Signup_Fill OTP","label":"Verify account","description":"An OTP panel supports verification."},{"image":"Fill Set Up Your Profile","label":"Link device details","description":"Brand, model and serial/AMC details personalize the experience."},{"image":"HomeDashboard","label":"Enter the hub","description":"The home feed combines actions, shopping and recent services."}]},{"key":"aftercare","name":"Track and manage","subtitle":"Orders, active devices, notifications and account settings","summary":"The product extends beyond checkout. Customers can revisit bookings, active rentals, owned purifiers, order tracking and notification preferences.","why":"Persistent device and order states reduce the need to search for information after a transaction is completed.","steps":[{"image":"HomeDashboard","label":"Return to dashboard","description":"The home screen surfaces contextual actions and recent activity."},{"image":"All device","label":"See linked devices","description":"Devices are collected into a shared list."},{"image":"Active Rentals","label":"Review rental status","description":"Rental cards show lease and billing information."},{"image":"Purchased Purifiers","label":"Review owned purifiers","description":"Owned device cards include warranty or status information."},{"image":"My Orders","label":"See transactions","description":"An order list consolidates earlier purchases and rentals."},{"image":"Order Details(Track Order)","label":"Track an order","description":"The details view includes progress, transaction context and support."},{"image":"Notification","label":"Review updates","description":"Recent notifications are grouped in a dedicated screen."},{"image":"Settings","label":"Manage account","description":"The settings page exposes profile, service and preference destinations."}]}];
const COUNTS = [{"label":"Getting started","value":11,"color":"#9CB7E9"},{"label":"Shopping & payment","value":13,"color":"#376FC0"},{"label":"Rental checkout","value":8,"color":"#72C0C6"},{"label":"Service & bookings","value":16,"color":"#7A94CD"},{"label":"AMC & device care","value":14,"color":"#0C6591"},{"label":"Orders & account","value":22,"color":"#BBC7D1"}];
const TOTAL = Object.keys(SCREENS).length;
let activeFlow=0,activeStep=0,activeCategory='All screens',searchText='',visibleLimit=20,lbCurrent=null,lbOrder=[],lastFocus=null;
const $=sel=>document.querySelector(sel), $$=sel=>Array.from(document.querySelectorAll(sel));
const asset=n=>SCREENS[n]?.src||'';
const noMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function attachImages(root=document){root.querySelectorAll('img[data-screen]').forEach(img=>{img.src=asset(img.dataset.screen);img.decoding='async';img.onerror=()=>img.alt+=' (not loaded)';});}
function jumpToGallery(category){activeCategory=category;searchText='';$('#gallery-search').value='';visibleLimit=20;renderGallery();document.getElementById('gallery').scrollIntoView({behavior:noMotion?'auto':'smooth'});}
function buildChart(){let acc=0;const colors=[];const chart=$('#bar-chart');const max=Math.max(...COUNTS.map(d=>d.value));COUNTS.forEach((d,i)=>{const end=acc+d.value/TOTAL*100;colors.push(`${d.color} ${acc.toFixed(3)}% ${end.toFixed(3)}%`);acc=end;const b=document.createElement('button');b.className='bar-row';b.type='button';b.setAttribute('aria-label',`Show ${d.value} ${d.label} screens`);b.innerHTML=`<span class="bar-top"><span>${d.label}</span><strong>${d.value}</strong></span><span class="track"><span style="background:${d.color};width:${d.value/max*100}%"></span></span>`;b.addEventListener('click',()=>jumpToGallery(d.label));chart.appendChild(b);});$('#donut-chart').style.background=`conic-gradient(${colors.join(',')})`;setTimeout(()=>chart.classList.add('bars-ready'),180);}
function renderFlowTabs(){const tabs=$('#flow-tabs');tabs.innerHTML='';FLOWS.forEach((f,i)=>{const b=document.createElement('button');b.type='button';b.className='flow-tab';b.role='tab';b.id=`flow-tab-${i}`;b.setAttribute('aria-selected',String(i===activeFlow));b.setAttribute('aria-controls','flow-list');b.textContent=f.name;b.addEventListener('click',()=>{activeFlow=i;activeStep=0;renderFlow();});tabs.appendChild(b);});}
function setStep(i){const f=FLOWS[activeFlow];activeStep=(i+f.steps.length)%f.steps.length;renderFlow();}
function renderFlow(){const f=FLOWS[activeFlow];$$('.flow-tab').forEach((b,i)=>b.setAttribute('aria-selected',String(i===activeFlow)));$('#flow-name').textContent=f.name;$('#flow-summary').textContent=f.summary;$('#flow-insight').textContent=f.why;const el=$('#flow-list');el.innerHTML='';f.steps.forEach((st,i)=>{const b=document.createElement('button');b.className='flow-step'+(i===activeStep?' active':'');b.type='button';b.setAttribute('aria-current',i===activeStep?'step':'false');b.innerHTML=`<span class="num">${String(i+1).padStart(2,'0')}</span><span><b>${st.label}</b><span>${st.image.replaceAll('_',' ')}</span></span>`;b.addEventListener('click',()=>setStep(i));el.appendChild(b);});const st=f.steps[activeStep],phone=$('#flow-phone');phone.classList.add('anim-switch');const im=$('#flow-img');im.src=asset(st.image);im.alt=st.label+' — Cloudwater app design';$('#flow-step-title').textContent=st.label;$('#flow-step-description').textContent=st.description;$('#step-count').textContent=`${activeStep+1} / ${f.steps.length}`;el.scrollTop=Math.max(0,activeStep*61-70);setTimeout(()=>phone.classList.remove('anim-switch'),noMotion?0:130);}
function allFiltered(){return Object.keys(SCREENS).filter(n=>(activeCategory==='All screens'||SCREENS[n].category===activeCategory)&&n.toLowerCase().includes(searchText)).sort((a,b)=>a.localeCompare(b));}
function renderFilters(){const holder=$('#filters');holder.innerHTML='';['All screens',...COUNTS.map(x=>x.label)].forEach(cat=>{const btn=document.createElement('button');btn.className='filter'+(cat===activeCategory?' selected':'');btn.type='button';btn.textContent=cat;btn?.setAttribute('aria-pressed',String(cat===activeCategory));btn?.addEventListener('click',()=>{activeCategory=cat;visibleLimit=20;renderGallery();});holder.appendChild(btn);});}
function renderGallery(){
  renderFilters();
  const all=allFiltered();
  $('#gallery-count').textContent=`${all.length} ${all.length===1?'screen':'screens'} found`;
  const shown=all.slice(0,visibleLimit);
  const grid=$('#gallery-grid');grid.replaceChildren();
  const fragment=document.createDocumentFragment();
  shown.forEach((name)=>{
    const entry=SCREENS[name];
    const card=document.createElement('article');card.className='gallery-item';
    const wrap=document.createElement('div');wrap.className='gallery-image';
    const device=document.createElement('div');device.className='gallery-device';
    const long=entry.height>852;
    if(long)device.classList.add('long');
    const scroller=document.createElement('div');scroller.className='gallery-screen-window';
    scroller.setAttribute('tabindex','0');
    scroller.setAttribute('role','region');
    scroller.setAttribute('aria-label',`Scrollable screenshot preview: ${name}`);
    const image=document.createElement('img');image.src=entry.src;image.alt=`Original screen: ${name}`;
    image.loading='lazy';image.decoding='async';
    image.width=entry.width;image.height=entry.height;
    scroller.appendChild(image);device.appendChild(scroller);
    if(long){const tip=document.createElement('span');tip.className='gallery-scrollhint';tip.textContent='Scroll inside ↓';device.appendChild(tip);}
    wrap.appendChild(device);card.appendChild(wrap);
    const title=document.createElement('div');title.className='gallery-title';title.textContent=name.replaceAll('_',' ');card.appendChild(title);
    const meta=document.createElement('div');meta.className='gallery-meta';
    meta.textContent=`${entry.width} × ${entry.height} px · ${long?'Long screen':'Phone screen'}`;
    card.appendChild(meta);
    const open=document.createElement('button');open.type='button';open.className='gallery-open-btn';
    open.textContent='View original PNG ↗';open.setAttribute('aria-label',`Open full original screenshot: ${name}`);
    open.addEventListener('click',()=>openLightbox(name,all));
    card.appendChild(open);fragment.appendChild(card);
  });
  grid.appendChild(fragment);
  $('#showmore').hidden=all.length<=visibleLimit;
  $('#showmore').textContent=`Show more screens (${Math.max(0,all.length-visibleLimit)} remaining) ↓`;
}
function openLightbox(n,order){lastFocus=document.activeElement;lbCurrent=n;lbOrder=order?.length?order:[n];const box=$('#lightbox');box.classList.add('open');box.classList.remove('zoom');box.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setModalImage();$('#close-btn').focus();}
function setModalImage(){const n=lbCurrent;if(!n)return;$('#lightbox-img').src=asset(n);$('#lightbox-img').alt=`Complete screenshot: ${n}`;$('#lightbox-title').textContent=n.replaceAll('_',' ');$('#lb-count').textContent=`${lbOrder.indexOf(n)+1} / ${lbOrder.length}  ·  ${SCREENS[n].width} × ${SCREENS[n].height} px`;$('#lightbox').querySelector('.lightbox-imgwrap').scrollTop=0;}
function navigateModal(delta){if(!lbCurrent)return;const idx=lbOrder.indexOf(lbCurrent);lbCurrent=lbOrder[(idx+delta+lbOrder.length)%lbOrder.length];$('#lightbox').classList.remove('zoom');setModalImage();}
function closeModal(){const box=$('#lightbox');box.classList.remove('open','zoom');box.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');lbCurrent=null;lastFocus?.focus?.();}
function renderStates(){const names=[['HomeDashboard-empty state','Empty dashboard','Guides a user with no linked service history toward relevant next actions.'],['empty cart','Empty cart','Illustrated empty state keeps the store experience approachable.'],['Payment Conformation','Order confirmation','A completion screen communicates status and next steps.'],['Cancel order popup','Cancellation confirmation','The user is asked to confirm a consequential action.']];const wrap=$('#state-story');names.forEach(([n,title,sub])=>{const card=document.createElement('article');card.className='story-card';card.innerHTML=`<div class="screenclip"><img alt="${n}" loading="lazy" src="${asset(n)}"></div><b>${title}</b><p>${sub}</p>`;const b=document.createElement('button');b.type='button';b.textContent='View actual screen ↗';b.onclick=()=>openLightbox(n,names.map(x=>x[0]));card.appendChild(b);wrap.appendChild(card);});}
function initScroll(){const progress=$('#read-progress'),toTop=$('#backtotop');const update=()=>{const h=document.documentElement;const max=h.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+'%';toTop.classList.toggle('visible',window.scrollY>850);};window.addEventListener('scroll',update,{passive:true});update();if(!noMotion&&'IntersectionObserver'in window){const o=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target);}}),{threshold:.07,rootMargin:'0px 0px -24px 0px'});$$('[data-reveal]').forEach(e=>o.observe(e));}else $$('[data-reveal]').forEach(e=>e.classList.add('in'));}
function init(){attachImages();buildChart();renderFlowTabs();renderFlow();renderStates();renderGallery();initScroll();$('#prev-step').onclick=()=>setStep(activeStep-1);$('#next-step').onclick=()=>setStep(activeStep+1);$('#expand-step').onclick=()=>{const f=FLOWS[activeFlow];openLightbox(f.steps[activeStep].image,f.steps.map(s=>s.image));};$('#gallery-search').addEventListener('input',e=>{searchText=e.target.value.toLowerCase().trim();visibleLimit=20;renderGallery();});$('#showmore').onclick=()=>{visibleLimit+=20;renderGallery();};$('#close-btn').onclick=closeModal;$('#lb-prev').onclick=()=>navigateModal(-1);$('#lb-next').onclick=()=>navigateModal(1);$('#zoom-btn').onclick=()=>{$('#lightbox').classList.toggle('zoom');$('#zoom-btn').textContent=$('#lightbox').classList.contains('zoom')?'Fit to width ↔':'1:1 pixels ↔';};$('#lightbox').addEventListener('mousedown',e=>{if(e.target.id==='lightbox')closeModal()});document.addEventListener('keydown',e=>{if(!$('#lightbox').classList.contains('open'))return;if(e.key==='Escape')closeModal();if(e.key==='ArrowLeft')navigateModal(-1);if(e.key==='ArrowRight')navigateModal(1);});$('#backtotop').onclick=()=>window.scrollTo({top:0,behavior:noMotion?'auto':'smooth'});const btn=$('#menu-btn'),nav=$('#navlinks');btn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn?.setAttribute('aria-expanded',String(open));});$$('.navlinks a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');btn?.setAttribute('aria-expanded','false');});}
document.addEventListener('DOMContentLoaded',init);


/* V2: realistic iPhone screens, original PNG inspection, and honest process diagrams. */
const ITERATION_STUDIES={
 rental:{screen:'Step_5-Payment',name:'Understand the payment commitment',context:'Selected purifier · 12-month rental plan',highlight:'Separate the initial charge from future recurring payments',explanation:'Explain when AutoPay begins and how the mandate works',action:'Review & authorise AutoPay',observation:'The exported final payment screen shows an upfront amount, automatic charges and a choice of payment methods.',rationale:'Stronger hierarchy around today’s cost and later payments could reduce uncertainty. This is a proposed redesign, not a tested improvement.'},
 service:{screen:'Booking detail',name:'Keep the service request understandable',context:'Purifier · Issue type · Appointment date',highlight:'Highlight the current visit status and the next action',explanation:'Technician details, rescheduling, and support information',action:'View booking status',observation:'The exported booking detail screen contains status, technician information and recorded issue details.',rationale:'A single status summary and clear rescheduling path could make a long service detail page easier to scan; a usability session would confirm.'},
 amc:{screen:'AMC_Protection_Detail',name:'Explain what each AMC plan covers',context:'Selected purifier and remaining protection term',highlight:'Compare coverage, exclusions and renewal pricing',explanation:'Surface renewal date before the payment decision',action:'Review selected plan',observation:'The AMC protection detail screens display different plans and coverage information.',rationale:'Shorter comparisons that separate included and excluded services could support a more confident renewal decision; this remains a concept.'}
};
function setIteration(key){
 const c=ITERATION_STUDIES[key];if(!c)return;
 document.querySelectorAll('[data-iteration]').forEach(btn=>btn?.setAttribute('aria-selected',String(btn.dataset.iteration===key)));
 const im=$('#iteration-original');im.src=asset(c.screen);im.alt=`Original ${c.screen} screenshot`;
 im.width=SCREENS[c.screen].width;im.height=SCREENS[c.screen].height;
 const shell=im.closest('.inner');if(shell)shell.scrollTop=0;
 $('#iteration-title').textContent=c.name;
 $('#iteration-context').textContent=c.context;
 $('#iteration-highlight').textContent=c.highlight;
 $('#iteration-explanation').textContent=c.explanation;
 $('#iteration-action').textContent=c.action;
 $('#iteration-screen-name').textContent=`Actual source · ${c.screen}`;
 $('#iteration-observation').textContent=c.observation;
 $('#iteration-rationale').textContent=c.rationale;
 $('#open-iteration-original').onclick=()=>openLightbox(c.screen,[c.screen]);
}
function installNativePhoneScroll(){
 // Preserve original PNG proportion in all editorial phone mockups.
 document.querySelectorAll('.phone').forEach(phone=>{
  const img=phone.querySelector(':scope > img');if(!img)return;
  const win=document.createElement('div');win.className='phone-scroll';
  img.before(win);win.appendChild(img);win.setAttribute('aria-label','Scrollable original app screen');
  win.setAttribute('tabindex','0');
  img.addEventListener('load',()=>{win.scrollTop=0;});
 });
}
function initV2(){
 installNativePhoneScroll();
 document.querySelectorAll('.route-card[data-flow-key]').forEach(btn=>btn?.addEventListener('click',()=>{
  const key=btn.dataset.flowKey;
  const index=FLOWS.findIndex(f=>f.key===key);
  if(index<0)return;
  activeFlow=index;activeStep=0;renderFlow();
  document.querySelector('#journeys').scrollIntoView({behavior:noMotion?'auto':'smooth',block:'start'});
  window.setTimeout(()=>document.querySelectorAll('.flow-tab')[index]?.focus({preventScroll:true}),noMotion?0:350);
 }));
 document.querySelectorAll('[data-iteration]').forEach(btn=>btn?.addEventListener('click',()=>setIteration(btn.dataset.iteration)));
 setIteration('rental');
 const zoom=$('#zoom-btn'); zoom.textContent='1:1 pixels ↔';
 const modalImg=$('#lightbox-img');modalImg.setAttribute('decoding','async');
}
document.addEventListener('DOMContentLoaded',initV2);


/* ══════════════════ V3 Interactive Flow Studio ══════════════════ */
const FLOW_ORDER=['rental','shopping','service','amc','setup','aftercare'];
const FLOW_ICONS={rental:'↗',shopping:'＋',service:'✳',amc:'◉',setup:'→',aftercare:'◎'};
const FLOW_TITLES={rental:'Rent a purifier',shopping:'Buy a purifier',service:'Book a service',amc:'Manage AMC',setup:'Get started',aftercare:'Aftercare'};
const FLOW_BRANCHES={
 rental:[{from:2,label:'Verification needs attention',detail:'Return to identity step'},{from:6,label:'Payment not authorized?',detail:'Review and retry payment'}],
 shopping:[{from:2,label:'Change cart items?',detail:'Return to product details'},{from:4,label:'Payment cannot proceed?',detail:'Check payment method'}],
 service:[{from:5,label:'Slot unavailable?',detail:'Select another schedule'},{from:6,label:'Need to reschedule?',detail:'Return to scheduling'}],
 amc:[{from:2,label:'Coverage unclear?',detail:'Compare the plan details'},{from:4,label:'Plan no longer suitable?',detail:'Revisit renewal options'}],
 setup:[{from:5,label:'OTP not received?',detail:'Try code verification again'}],
 aftercare:[{from:2,label:'No active purifier?',detail:'Review linked devices'}]
};
const FLOW_REASONS={
 rental:['Separating purchase and rental modes clarifies the commitment type.','The rental detail page explains the selected purifier and plan before the formal application starts.','Identity verification is visible as the first numbered stage, a high-friction moment worth explaining clearly.','The address stage gives fulfillment a dedicated checkpoint.','The agreement is shown before the user reaches order review.','The review screen is the final opportunity to inspect product, address and cost details.','The payment screen makes the recurring AutoPay mandate a distinct decision.','A confirmation screen communicates that the mandate setup succeeded.'],
 shopping:['Buying and renting begin as distinct store modes.','Product details make specifications and pricing available before cart commitment.','A cart creates space to review selected products.','The summary surfaces information before payment selection.','A distinct payment-method screen separates choice from confirmation.','The confirmation screen communicates transaction completion.','My Orders extends the experience beyond checkout.'],
 service:['The service entry point groups available support actions.','Installation is one visible service pathway.','The service catalogue exposes related support categories.','Brand selection helps identify the device context.','Model selection narrows the specific purifier.','The schedule screen organizes the appointment time.','Booking details communicate the service request state and next steps.','Service history retains the record for follow-up.'],
 amc:['AMC is a separate home for protection-related tasks.','The user selects which purifier the protection applies to.','Coverage details provide context for making a plan decision.','Renewal detail reveals the current renewal context.','Plan detail adds the scope of proposed protection.','Active coverage provides a clear current status.','The detailed active plan remains available after the transaction.'],
 setup:['The first screen establishes the app identity.','Onboarding introduces the first core benefit.','The second panel shifts attention to protection and AMC.','The third panel introduces shopping and purifier access.','A dedicated login and sign-up entry leads into the account.','Profile creation is distinct from the initial value proposition.','OTP creates a visible verification checkpoint.','Additional profile fields can connect the account to a device.','The dashboard becomes the central home for future tasks.'],
 aftercare:['The dashboard connects major product destinations.','A device list provides a place to manage linked purifiers.','Active rentals retain subscription context.','Purchased purifiers remain discoverable as owned assets.','Orders provide access to previous transactions.','Tracking detail gives progress information for the order.','Notifications keep important changes visible.','Settings support account management and preferences.']
};
const WIREFRAME_CONFIG={
 rental:{title:'A rental journey with visible commitment.',copy:'The reconstructed layout prioritizes product choice, staged verification and a plain-language recap before AutoPay authorization.',learn:['Separate the rental product and payment terms.','Show stage progress during identity, address and agreement.','Provide review before recurring-payment setup.'],ref:'Step_4-Review Order',frames:[['Choose purifier','Shop_rent','media'],['Complete details','Step_2-Add Address','fields'],['Review commitment','Step_5-Payment','summary']]},
 shopping:{title:'Make the purchase feel predictable.',copy:'The wireframe sequence isolates the product choice, editable cart and final payment confirmation.',learn:['Provide a clear product-to-cart path.','Let users review totals before payment.','Acknowledge successful purchase.'],ref:'Order Summery',frames:[['Explore product','Product Detail Page','media'],['Review cart','Your Cart','cards'],['Pay and confirm','Payment Method','summary']]},
 service:{title:'Connect the service to the right device.',copy:'The hierarchy gives a service type, purifier context and appointment selection separate attention.',learn:['Surface the type of service first.','Identify brand and model before scheduling.','Give the booking a reviewable state.'],ref:'Scheduling Screen',frames:[['Pick service','Book Service','cards'],['Identify purifier','RO Model','fields'],['Select appointment','Scheduling Screen','summary']]},
 amc:{title:'Make protection easy to understand.',copy:'Device selection, coverage details and an active-protection confirmation are the core stages in this conceptual flow.',learn:['Start with the purifier being protected.','Clarify plan inclusions and renewal details.','Keep active coverage easy to revisit.'],ref:'AMC_Protection_Detail',frames:[['Select purifier','AMC_Select_the_purifier','cards'],['Review coverage','AMC_Protection_Detail','media'],['Track protection','Active AMC Protection','summary']]}
};

let studioFlow='rental',studioIndex=0,studioTimer=null,studioEdges=[],studioInit=false,studioResizeObs=null,studioTracerRaf=null,studioLastWidth=0;
const studioRoot=()=>document.getElementById('flow-studio');
const studioEl=id=>document.getElementById(id);
const studioReduced=window.matchMedia('(prefers-reduced-motion: reduce)');
function studioData(){return FLOWS.find(f=>f.key===studioFlow)}
function stopStudioPlay(){if(studioTimer){clearInterval(studioTimer);studioTimer=null;}const b=studioEl('studio-play');if(b){b.innerHTML='▷ <span>Play journey</span>';b.setAttribute('aria-pressed','false');}}
function studioGridCols(){return (studioData()?.steps.length||8)}
function studioSvgPath(d,kind,idx){const el=document.createElementNS('http://www.w3.org/2000/svg','path');el.setAttribute('d',d);el.setAttribute('class',kind);el.dataset.index=String(idx);return el}
function positionStudioTracer(x,y,show){let circle=studioEl('studio-tracer');if(!circle)return;circle.setAttribute('cx',x);circle.setAttribute('cy',y);circle.setAttribute('opacity',show?'1':'0')}
function drawStudio(){
 const schematic=studioEl('studio-schematic'),canvas=studioEl('studio-canvas');if(!schematic||!canvas)return;
 const grid=studioEl('studio-nodegrid'),svg=studioEl('studio-svg'),group=studioEl('studio-paths');const nodes=[...grid.querySelectorAll('.studio-node')];if(!nodes.length)return;
 const count=nodes.length;const available=schematic.clientWidth;const compact=window.innerWidth<=760;
 const targetWidth=count<=5?176:Math.max(139,Math.min(172,Math.floor((available-86-(count-1)*23)/count)));
 const gap=compact?20:24;
 const total=Math.max(available,2*42+count*targetWidth+(count-1)*gap);
 canvas.style.width=Math.ceil(total)+'px';
 grid.style.gridTemplateColumns=`repeat(${count},minmax(0,1fr))`;
 grid.style.columnGap=gap+'px';
 grid.style.setProperty('--studio-steps',count);
 const bounding=canvas.getBoundingClientRect();svg.setAttribute('viewBox',`0 0 ${bounding.width} ${bounding.height}`);group.replaceChildren();studioEdges=[];
 nodes.slice(0,-1).forEach((node,i)=>{
   const next=nodes[i+1],ra=node.getBoundingClientRect(),rb=next.getBoundingClientRect();
   const x1=ra.right-bounding.left,y1=ra.top-bounding.top+ra.height/2,x2=rb.left-bounding.left,y2=rb.top-bounding.top+rb.height/2;
   const d=`M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${((x1+x2)/2).toFixed(1)} ${y1.toFixed(1)}, ${((x1+x2)/2).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
   let p=studioSvgPath(d,'studio-link future',i);group.append(p);studioEdges.push(p);
 });
 let tracer=studioEl('studio-tracer');if(!tracer){tracer=document.createElementNS('http://www.w3.org/2000/svg','circle');tracer.id='studio-tracer';tracer.setAttribute('r','5.5');tracer.setAttribute('opacity','0');svg.append(tracer)}
 updateStudioVisual();
}
function updateStudioVisual(){const grid=studioEl('studio-nodegrid');if(!grid)return;grid.querySelectorAll('.studio-node').forEach((node,i)=>{node.dataset.status=i<studioIndex?'done':i===studioIndex?'active':'future';node.setAttribute('aria-current',i===studioIndex?'step':'false')});studioEdges.forEach((edge,i)=>{edge.setAttribute('class',i<studioIndex?'studio-link done':i===studioIndex?'studio-link active':'studio-link future')})}
function animateStudioTravel(edgeIdx){
 const path=studioEdges[edgeIdx],circle=studioEl('studio-tracer');if(!path||!circle)return;
 if(studioTracerRaf){cancelAnimationFrame(studioTracerRaf);studioTracerRaf=null;}
 if(studioReduced.matches){circle.setAttribute('opacity','0');return;}
 const len=path.getTotalLength(),duration=880,start=performance.now();
 const frame=now=>{const p=Math.min(1,(now-start)/duration),ease=1-Math.pow(1-p,3),pt=path.getPointAtLength(ease*len);positionStudioTracer(pt.x,pt.y,true);if(p<1)studioTracerRaf=requestAnimationFrame(frame);else{circle.setAttribute('opacity','0');studioTracerRaf=null}};
 studioTracerRaf=requestAnimationFrame(frame);
}
function studioScrollToStep(i){
 const outer=studioEl('studio-schematic'),node=studioEl('studio-nodegrid')?.children[i];if(!outer||!node)return;
 const left=node.offsetLeft+node.offsetWidth/2-outer.clientWidth/2;
 if(left>outer.scrollLeft+20 || left<outer.scrollLeft-20)outer.scrollTo({left:Math.max(0,left),behavior:studioReduced.matches?'auto':'smooth'});
}
function setStudioStep(idx,quiet=false){
 const f=studioData();if(!f)return;
 const prev=studioIndex;studioIndex=Math.max(0,Math.min(idx,f.steps.length-1));
 const st=f.steps[studioIndex],entry=SCREENS[st.image];
 studioEl('studio-stage-label').textContent=`${String(studioIndex+1).padStart(2,'0')} / ${String(f.steps.length).padStart(2,'0')}  ·  ${FLOW_TITLES[studioFlow].toUpperCase()}`;
 studioEl('studio-stage-name').textContent=st.label;
 studioEl('studio-stage-desc').textContent=st.description;
 studioEl('studio-stage-insight').textContent=(FLOW_REASONS[studioFlow]||[])[studioIndex]||f.why;
 const im=studioEl('studio-real-screen');im.src=entry.src;im.alt=`Original Cloud Water app screen: ${st.image}`;im.width=entry.width;im.height=entry.height;
 studioEl('studio-stage-name').setAttribute('title',st.image);
 studioEl('studio-prev').disabled=studioIndex===0;studioEl('studio-next').disabled=studioIndex===f.steps.length-1;
 studioEl('studio-original').onclick=()=>openLightbox(st.image,f.steps.map(x=>x.image));
 const scroll=im.closest('.studio-device-scroll');if(scroll)scroll.scrollTop=0;
 updateStudioVisual();
 if(!quiet){const detail=studioEl('studio-detail').querySelector('.studio-detail-copy');detail.classList.remove('is-updating');void detail.offsetWidth;if(!studioReduced.matches)detail.classList.add('is-updating');
 if(studioIndex===prev+1){animateStudioTravel(prev)}else if(studioTracerRaf){cancelAnimationFrame(studioTracerRaf);studioTracerRaf=null;studioEl('studio-tracer')?.setAttribute('opacity','0')}
 studioScrollToStep(studioIndex)}
}
function switchStudioFlow(key){
 const f=FLOWS.find(x=>x.key===key);if(!f)return;
 stopStudioPlay();studioFlow=key;studioIndex=0;
 studioEl('studio-current-flow').textContent=FLOW_TITLES[key].toUpperCase();studioEl('studio-node-count').textContent=` / ${f.steps.length} steps`;
 studioEl('studio-flow-tabs').querySelectorAll('button').forEach(btn=>{const selected=btn.dataset.studioFlow===key;btn?.setAttribute('aria-selected',String(selected));btn.tabIndex=selected?0:-1});
 const grid=studioEl('studio-nodegrid');grid.replaceChildren();
 f.steps.forEach((st,i)=>{
  const btn=document.createElement('button');btn.type='button';btn.className='studio-node';btn.style.setProperty('--step-order',i);btn?.setAttribute('aria-label',`Step ${i+1} of ${f.steps.length}: ${st.label}. Show original ${st.image} screen`);btn.title=st.image.replaceAll('_',' ');
  const number=document.createElement('span');number.className='studio-node-number';number.textContent=String(i+1).padStart(2,'0');
  const title=document.createElement('span');title.className='studio-node-title';title.textContent=st.label;
  btn.append(number,title);
  btn?.addEventListener('click',()=>{stopStudioPlay();setStudioStep(i)});
  grid.append(btn);
 });
 const host=studioEl('studio-branches');host.replaceChildren();
 const branchList=(FLOW_BRANCHES[key]||[]);
 branchList.forEach(br=>{
  const chip=document.createElement('div');chip.className='studio-branch';
  const from=document.createElement('span');from.className='branch-from';from.textContent=`After ${String(br.from+1).padStart(2,'0')}`;
  const label=document.createElement('b');label.textContent=br.label;
  const detail=document.createElement('small');detail.textContent=`· ${br.detail}`;
  chip.append(from,label,detail);host.append(chip);
 });
 if(!branchList.length)host.hidden=true;else host.hidden=false;
 const outer=studioEl('studio-schematic');outer.scrollLeft=0;
 setStudioStep(0,true);
 requestAnimationFrame(()=>requestAnimationFrame(drawStudio));
}
function studioPlay(){
 if(studioTimer){stopStudioPlay();return;}
 const f=studioData();if(studioIndex===f.steps.length-1)setStudioStep(0,true);
 const b=studioEl('studio-play');b.innerHTML='Ⅱ <span>Pause journey</span>';b.setAttribute('aria-pressed','true');
 studioTimer=setInterval(()=>{if(studioIndex>=studioData().steps.length-1){stopStudioPlay();return}setStudioStep(studioIndex+1)},2050);
}
function buildStudioTabs(){
 const host=studioEl('studio-flow-tabs');host.replaceChildren();
 FLOW_ORDER.forEach((key,i)=>{
  const f=FLOWS.find(z=>z.key===key),btn=document.createElement('button');btn.type='button';btn?.setAttribute('role','tab');btn.dataset.studioFlow=key;
  const labels={rental:'Rent',shopping:'Buy',service:'Service',amc:'AMC',setup:'Get started',aftercare:'Aftercare'};
  btn.innerHTML=`${labels[key]} <span class="studio-tab-count">${String(f.steps.length).padStart(2,'0')}</span>`;
  btn?.addEventListener('click',()=>switchStudioFlow(key));
  btn.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=FLOW_ORDER[(FLOW_ORDER.indexOf(key)+(e.key==='ArrowRight'?1:-1)+FLOW_ORDER.length)%FLOW_ORDER.length];switchStudioFlow(next);host.querySelector(`[data-studio-flow="${next}"]`)?.focus()}});
  host.append(btn);
 });
}
function wireframeSkeleton(type){let s='<div class="wireframe-phone-head"><i></i><i></i><i></i></div><div class="wireframe-skeleton strong" style="width:68%"></div><div class="wireframe-skeleton" style="width:87%"></div>';if(type==='media'){s+='<div class="wireframe-skeleton picture"></div><div class="wireframe-minirow"><div></div><div></div></div><div class="wireframe-skeleton" style="width:80%"></div><div class="wireframe-skeleton accent" style="margin-top:20px"></div>'}else if(type==='fields'){s+='<div class="wireframe-skeleton" style="width:100%;margin-top:32px"></div><div class="wireframe-skeleton" style="height:36px;width:100%"></div><div class="wireframe-skeleton" style="width:70%"></div><div class="wireframe-skeleton" style="height:36px;width:100%"></div><div class="wireframe-skeleton" style="height:36px;width:100%"></div><div class="wireframe-skeleton accent" style="margin-top:23px"></div>'}else if(type==='cards'){s+='<div class="wireframe-minirow" style="margin-top:25px"><div></div><div></div></div><div class="wireframe-minirow" style="margin-top:8px"><div></div><div></div></div><div class="wireframe-skeleton picture" style="height:52px"></div><div class="wireframe-skeleton accent"></div>'}else{s+='<div class="wireframe-skeleton" style="width:45%;margin-top:25px"></div><div class="wireframe-skeleton" style="height:44px"></div><div class="wireframe-skeleton" style="height:44px"></div><div class="wireframe-skeleton" style="width:60%"></div><div class="wireframe-skeleton accent" style="margin-top:20px"></div>'}return s}
function renderWireframe(key){const c=WIREFRAME_CONFIG[key];if(!c)return;studioEl('wireframe-tabs').querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.wireframe===key)));studioEl('wireframe-kicker').textContent=key.toUpperCase()+' / CONCEPTUAL WIREFRAME';studioEl('wireframe-title').textContent=c.title;studioEl('wireframe-copy').textContent=c.copy;const ls=studioEl('wireframe-lessons');ls.replaceChildren();c.learn.forEach(x=>{let s=document.createElement('span');s.textContent=x;ls.append(s)});studioEl('wireframe-source').onclick=()=>openLightbox(c.ref,[c.ref]);const out=studioEl('wireframe-three');out.replaceChildren();c.frames.forEach(([title,screen,type],i)=>{let el=document.createElement('div');el.className='wireframe-card';el.innerHTML=`<div class="wireframe-phone">${wireframeSkeleton(type)}</div><b>${String(i+1).padStart(2,'0')} · ${title}</b><small></small>`;el.querySelector('small').textContent=`Reference: ${screen}`;out.append(el)})}

function initFlowStudio(){
 if(!studioRoot()||studioInit)return;studioInit=true;
 buildStudioTabs();
 ['rental','shopping','service','amc'].forEach(key=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.dataset.wireframe=key;b.textContent=FLOW_TITLES[key];b.addEventListener('click',()=>renderWireframe(key));studioEl('wireframe-tabs').append(b)});
 switchStudioFlow('rental');renderWireframe('rental');
 studioEl('studio-play').onclick=studioPlay;
 studioEl('studio-restart').onclick=()=>{stopStudioPlay();setStudioStep(0);studioEl('studio-schematic').scrollTo({left:0,behavior:studioReduced.matches?'auto':'smooth'})};
 studioEl('studio-prev').onclick=()=>{stopStudioPlay();setStudioStep(studioIndex-1)};
 studioEl('studio-next').onclick=()=>{stopStudioPlay();setStudioStep(studioIndex+1)};
 studioResizeObs=new ResizeObserver(()=>{const width=studioEl('studio-schematic').clientWidth;if(Math.abs(width-studioLastWidth)>2){studioLastWidth=width;requestAnimationFrame(drawStudio)}});
 studioResizeObs.observe(studioEl('studio-schematic'));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stopStudioPlay()});
}
document.addEventListener('DOMContentLoaded',initFlowStudio);


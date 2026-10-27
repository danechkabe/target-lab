// Day routing keeps lesson DOM and workbook input intact between visits.
(()=>{
'use strict';
const header=document.querySelector('header');
const toolbar=document.createElement('header');toolbar.className='course-toolbar';
const tabs=document.querySelector('.tab-row'),dict=document.querySelector('#viewDict'),course=document.querySelector('#viewCourse');
toolbar.append(tabs,course,dict);header.replaceWith(toolbar);
const progress=document.createElement('p');progress.id='daily-progress';progress.className='muted';
const label=document.createElement('label');label.htmlFor='day-select';label.textContent='Обери день навчання';
const select=document.createElement('select');select.id='day-select';
weeks.forEach((week,wi)=>{const group=document.createElement('optgroup');group.label=`Тиждень ${wi+1}: ${week[0]}`;week[1].forEach((d,di)=>{const option=document.createElement('option');option.value=wi*5+di;option.textContent=d[0];group.append(option);});select.append(group);});
nav.replaceChildren(label,select,progress);nav.setAttribute('aria-label','Навігація навчальними днями');
const lessons=[...document.querySelectorAll('.day[data-id]')];
lessons.forEach(day=>{const old=day.querySelector('.focus'),heading=document.createElement('h2');heading.className='focus';heading.innerHTML=old.innerHTML;old.replaceWith(heading);day.setAttribute('aria-label',day.querySelector('.time').textContent);});
document.querySelectorAll('.week').forEach(w=>[...w.children].filter(x=>!x.classList.contains('day')).forEach(x=>x.remove()));
const oldSetView=setView;
setView=function(view){oldSetView(view);document.querySelector('.layout').hidden=view!=='course';};
function update(){progress.textContent=`Пройдено днів: ${done.size} / 40. Прогрес зберігається у цьому браузері.`;lessons.forEach((day,id)=>{const next=day.querySelector('.next'),message=day.querySelector('.next-hint');if(next)next.hidden=!done.has(id);if(message)message.hidden=done.has(id);});}
meter=update;
function openDay(id,focus=false){if(!Number.isInteger(id)||id<0||id>=40)id=0;currentDay=id;document.title=`${lessons[id].querySelector('.time').textContent} · Target Lab`;lessons.forEach((day,i)=>{day.hidden=i!==id;});document.querySelectorAll('.week').forEach((w,wi)=>w.classList.toggle('active',wi===Math.floor(id/5)));select.value=id;setView('course');update();if(focus){scrollTo({top:0,behavior:'auto'});const title=lessons[id].querySelector('.focus');title.tabIndex=-1;title.focus({preventScroll:true});}}
function route(){const match=location.hash.match(/^#day-(\d+)$/);const id=match?+match[1]-1:0;openDay(id);if(!match||id<0||id>=40)history.replaceState(null,'','#day-1');}
function go(id){if(id<0||id>=40)return;if(location.hash===`#day-${id+1}`)openDay(id,true);else{location.hash=`day-${id+1}`;openDay(id,true);}}
select.addEventListener('change',()=>go(+select.value));
lessons.forEach((day,id)=>{const prev=day.querySelector('.prev'),next=day.querySelector('.next');prev.disabled=id===0;prev.onclick=()=>go(id-1);if(id===39){next.remove();const end=document.createElement('p');end.className='course-end';end.textContent='Це останній день курсу. Повернись до будь-якого дня через вибір угорі.';day.querySelector('.day-nav').append(end);}else{next.textContent='Перейти до наступного →';next.onclick=()=>{if(done.has(id))go(id+1);};const hint=document.createElement('p');hint.className='next-hint';hint.textContent='Дай правильну відповідь на контрольне питання дня, щоб відкрити кнопку переходу.';day.querySelector('.day-nav').before(hint);}const check=day.querySelector('.quiz .check');check.addEventListener('click',update);});
window.addEventListener('storage',e=>{if(e.key==='pm-course-8w'){try{JSON.parse(e.newValue||'[]').forEach(id=>done.add(id));update();}catch{}}});
window.addEventListener('hashchange',route);route();
})();

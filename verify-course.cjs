// NODE_PATH must point to Playwright. COURSE_URL optionally tests deployed site.
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try {
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const url=process.env.COURSE_URL||'file://'+path.join(__dirname,'index.html');
 await page.goto(url);await page.evaluate(()=>{localStorage.clear();localStorage.setItem('pm-course-8w','[0,1,8]');localStorage.setItem('pm-workbook-8','Мій збережений план');localStorage.setItem('pm-prep','["access"]');localStorage.setItem('pm-section-quizzes-v2','{"8-0-0":0}');});await page.reload();
 await page.waitForSelector('#day-select');
 assert.equal(await page.locator('#day-select option').count(),40);
 assert.equal(await page.locator('.day:visible').count(),1);
 assert.equal(await page.locator('header h1').count(),0);
 assert.equal(await page.locator('.learning-section').count(),85);
 assert.equal(await page.locator('.section-quiz').count(),255);
 assert.equal(await page.locator('.day[data-id="0"] .prev').isDisabled(),true);
 assert.equal(await page.locator('.day[data-id="0"] .next').isVisible(),true);
 console.log('PASS 40 day routes, 85 sections, 255 questions, no pre-course intro');
 await page.locator('#day-select').selectOption('8');
 const day=page.locator('.day[data-id="8"]');
 assert.equal(await day.locator('textarea').inputValue(),'Мій збережений план');
 assert.equal(await day.locator('.learning-section').count(),3);
 assert.ok(await day.locator('.section-quiz input:checked').count());
 const term=day.locator('.term-link').first();await term.click();assert.ok(await page.locator('#glossModal').evaluate(e=>e.classList.contains('show')));await page.keyboard.press('Escape');assert.ok(await term.evaluate(e=>document.activeElement===e));
 const question=day.locator('.section-quiz').first();await question.locator('.section-check').click();
 await question.locator('input').first().check();await question.locator('.section-check').click();assert.ok((await question.locator('[role="status"]').textContent()).length>30);
 await day.locator('textarea').fill('Збережений квитковий план');await page.waitForTimeout(350);
 await page.locator('#day-select').selectOption('9');
 const nextDay=page.locator('.day[data-id="9"]');assert.equal(await nextDay.locator('.next').isVisible(),false);
 const correct=await page.evaluate(()=>quizBank[9].ok);await nextDay.locator('.quiz .ans').nth((correct+1)%3).click();await nextDay.locator('.quiz .check').click();assert.equal(await nextDay.locator('.next').isVisible(),false);
 await nextDay.locator('.quiz .ans').nth(correct).click();await nextDay.locator('.quiz .check').click();await nextDay.locator('.next').click();assert.equal(await page.locator('#day-select').inputValue(),'10');
 await page.goBack();assert.equal(await page.locator('#day-select').inputValue(),'9');await page.goForward();assert.equal(await page.locator('#day-select').inputValue(),'10');
 await page.goto(url+'#day-9');assert.equal(await page.locator('#day-select').inputValue(),'8');assert.equal(await page.locator('.day[data-id="8"] textarea').inputValue(),'Збережений квитковий план');
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('pm-course-8w'))),[0,1,8,9]);assert.equal(await page.evaluate(()=>localStorage.getItem('pm-prep')),'["access"]');
 await page.locator('#tabDict').click();assert.equal(await page.locator('.day:visible').count(),0);await page.locator('#dictSearch').fill('checkout');assert.ok(await page.locator('#dictTable tbody tr').count());const link=page.locator('#dictTable tbody a').first();await link.click();await page.keyboard.press('Escape');assert.ok(await link.evaluate(e=>document.activeElement===e));await page.locator('#tabCourse').click();assert.equal(await page.locator('.day:visible').count(),1);
 console.log('PASS correct/wrong final quiz gating, next, browser back/forward, deep link, glossary, saved workbooks/checklists/answers');
 for(let id=0;id<40;id++){await page.locator('#day-select').selectOption(String(id));assert.equal(await page.locator('.day:visible').count(),1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Mobile overflow day '+(id+1));}
 assert.equal(await page.locator('.day[data-id="39"] .next').count(),0);
 await page.goto(url+'#day-999');await page.waitForURL('**/#day-1');assert.equal(await page.locator('#day-select').inputValue(),'0');assert.match(page.url(),/#day-1$/);
 await page.setViewportSize({width:1280,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.screenshot({path:process.env.SCREENSHOT_PATH||path.join(process.env.JCODE_SCRATCH_DIR||__dirname,'target-daily-desktop.png')});
 const second=await context.newPage();await second.goto(url+'#day-12');const correct12=await second.evaluate(()=>quizBank[11].ok);await second.locator('.day:visible .quiz .ans').nth(correct12).click();await second.locator('.day:visible .quiz .check').click();await page.locator('#day-select').selectOption('12');const correct13=await page.evaluate(()=>quizBank[12].ok);await page.locator('.day:visible .quiz .ans').nth(correct13).click();await page.locator('.day:visible .quiz .check').click();await second.reload();const both=await second.evaluate(()=>JSON.parse(localStorage.getItem('pm-course-8w')));assert.ok(both.includes(11)&&both.includes(12));await second.close();console.log('PASS completion progress preserved across two tabs');
 assert.equal(errors.length,0,errors.join('\n'));
 console.log('PASS all 40 mobile days, desktop, final day, invalid route, no page errors');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});

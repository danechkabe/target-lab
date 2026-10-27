const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={};vm.createContext(context);vm.runInContext(fs.readFileSync(__dirname+'/course-expansion.js','utf8')+';globalThis.rows=COURSE_EXPANSION',context);
const prohibited=[/кошторис/iu,/корпоратив/iu,/івент[- ]агенц/iu,/організаці[яїю] (?:івент|корпоратив)/iu,/HR/u];
const violations=[];
for(const row of context.rows){for(const [i,s] of row.sections.entries()){const content=JSON.stringify(s);for(const re of prohibited){if(re.test(content))violations.push(`day ${row.id+1} section ${i+1}: ${re}`);}}}
assert.deepEqual(violations,[],'Obsolete event-service examples remain');
const total=JSON.stringify(context.rows);assert.match(total,/квитк/);assert.match(total,/оплат/);assert.match(total,/повернен/);assert.match(total,/ділян/);assert.match(total,/order_id|transaction_id/);
console.log('PASS no obsolete event-organizer examples in teaching sections, FAQs or tests; ticket payment/refunds/order identifiers and land retained');

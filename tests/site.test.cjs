const test=require('node:test'),assert=require('node:assert/strict'),{quoteStyle,demoDays}=require('../site.js');
test('style estimates use only the approved options and never accumulate on repeated selection',()=>{
 assert.deepEqual(quoteStyle('berry','gloss'),{label:'Gel · Cereza · Brillo',amount:450,tone:'berry',finish:'gloss'});
 assert.equal(quoteStyle('rose','matte').amount,500);assert.equal(quoteStyle('pearl','accent').amount,550);assert.equal(quoteStyle('rose','gloss').amount,450);
 for(const bad of ['__proto__','constructor','<script>','',null,undefined]){assert.equal(quoteStyle(bad,'gloss'),null);assert.equal(quoteStyle('rose',bad),null);}
});
test('sample calendar crosses month and year boundaries and skips Sundays without duplicating days',()=>{
 const days=demoDays(new Date(2026,11,31,23),5);assert.deepEqual(days.map(d=>d.value),['2027-01-01','2027-01-02','2027-01-04','2027-01-05','2027-01-06']);
 assert.equal(new Set(days.map(d=>d.value)).size,5);assert.equal(demoDays(new Date(2028,1,28))[0].value,'2028-02-29');
 assert.deepEqual(demoDays(new Date('invalid')),[]);assert.deepEqual(demoDays(new Date(),1000000),[]);
});

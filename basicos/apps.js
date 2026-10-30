/* Small, dependency-free exercises. Nothing is sent or stored remotely. */
(() => {
 'use strict';
 function calculate(expression){
  if(typeof expression!=='string'||expression.length>120)throw Error('Escribe una operación más corta.');
  const tokens=expression.match(/\d*\.?\d+|[()+\-*/%]/g)||[];
  if(tokens.join('')!==expression.replace(/\s/g,'')||!tokens.length)throw Error('Revisa la operación.');
  let at=0;
  function atom(){let value,token=tokens[at++];
   if(token==='+'||token==='-')value=(token==='-'?-1:1)*atom();
   else if(token==='('){value=sum();if(tokens[at++]!==')')throw Error('Falta cerrar un paréntesis.');}
   else{if(!/^\d*\.?\d+$/.test(token||''))throw Error('Falta un número.');value=Number(token);}
   while(tokens[at]==='%'){value/=100;at++;}return value;
  }
  function product(){let value=atom();while(['*','/'].includes(tokens[at])){const op=tokens[at++],right=atom();if(op==='/'&&right===0)throw Error('No se puede dividir entre cero.');value=op==='*'?value*right:value/right;}return value;}
  function sum(){let value=product();while(['+','-'].includes(tokens[at])){const op=tokens[at++],right=product();value+=op==='+'?right:-right;}return value;}
  const value=sum();if(at!==tokens.length||!Number.isFinite(value)||Math.abs(value)>1e12)throw Error('Resultado fuera de rango.');return Number(value.toPrecision(12));
 }
 function createMemoryGame(random=Math.random){
  const symbols=['☀','☾','★','♠','♥','♦','♣','✿'],deck=[...symbols,...symbols];
  for(let i=deck.length-1;i>0;i--){const j=Math.min(i,Math.max(0,Math.floor(random()*(i+1))));[deck[i],deck[j]]=[deck[j],deck[i]];}
  const found=new Set();let open=[],moves=0;
  return {choose(index){if(!Number.isInteger(index)||index<0||index>=16||found.has(index)||open.includes(index)||open.length===2)return false;open.push(index);if(open.length===2){moves++;if(deck[open[0]]===deck[open[1]]){open.forEach(i=>found.add(i));open=[];}}return true;},hide(){open=[];},snapshot(){return {cards:deck.map((symbol,i)=>({symbol,visible:found.has(i)||open.includes(i),matched:found.has(i)})),moves,pairs:found.size/2,locked:open.length===2,won:found.size===16};}};
 }
 if(typeof module!=='undefined'&&module.exports)module.exports={calculate,createMemoryGame};
 if(typeof document==='undefined')return;
 const $=id=>document.getElementById(id),app=document.body.dataset.app;
 if(app==='calculator'){
  const input=$('expression'),status=$('calc-status');let history=[];
  function run(){try{const raw=input.value,value=calculate(raw);input.value=String(value);status.textContent='Resultado: '+value;history.unshift(raw+' = '+value);history=history.slice(0,5);$('history').replaceChildren(...history.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));}catch(e){status.textContent=e.message;}}
  $('calculator').addEventListener('submit',e=>{e.preventDefault();run();});
  document.querySelectorAll('[data-key]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.key;if(key==='clear'){input.value='';status.textContent='Lista para otra cuenta.';}else if(key==='back')input.value=input.value.slice(0,-1);else if(key==='=')run();else if(input.value.length<120)input.value+=key;}));
  input.addEventListener('input',()=>{status.textContent='';});input.addEventListener('keydown',e=>{if(e.key==='Escape'){input.value='';status.textContent='';}});
 }
 if(app==='memory'){
  let game,timer=null,buttons=[];
  function paint(){const state=game.snapshot();buttons.forEach((b,i)=>{const card=state.cards[i];b.textContent=card.visible?card.symbol:'?';b.classList.toggle('revealed',card.visible);b.classList.toggle('matched',card.matched);b.setAttribute('aria-label',card.matched?`Pareja encontrada: ${card.symbol}`:card.visible?`Carta ${i+1}: ${card.symbol}`:`Descubrir carta ${i+1}`);b.setAttribute('aria-disabled',String(card.matched||card.visible||state.locked));});$('moves').textContent=String(state.moves);$('pairs').textContent=String(state.pairs);$('game-status').textContent=state.won?`¡Las ocho parejas! Lo lograste en ${state.moves} intentos.`:state.locked?'No coinciden. Recuerda sus lugares.':`${state.pairs} de 8 parejas encontradas.`;}
  function start(){if(timer!==null)clearTimeout(timer);timer=null;game=createMemoryGame();$('board').replaceChildren();buttons=Array.from({length:16},(_,i)=>{const b=document.createElement('button');b.type='button';b.addEventListener('click',()=>{if(!game.choose(i))return;paint();if(game.snapshot().locked)timer=setTimeout(()=>{timer=null;game.hide();paint();},1000);});$('board').append(b);return b;});paint();}
  $('restart').addEventListener('click',start);start();
 }
 if(app==='tasks'){
  let tasks=[],next=0;
  function render(){const list=$('task-list');list.replaceChildren();for(const task of tasks){const li=document.createElement('li'),label=document.createElement('label'),check=document.createElement('input'),span=document.createElement('span'),remove=document.createElement('button');check.type='checkbox';check.checked=task.done;span.textContent=task.text;check.addEventListener('change',()=>{task.done=check.checked;li.classList.toggle('done',task.done);summary();});label.append(check,span);remove.type='button';remove.textContent='Quitar';remove.setAttribute('aria-label','Quitar: '+task.text);remove.addEventListener('click',()=>{tasks=tasks.filter(t=>t.id!==task.id);render();$('task-input').focus();});li.classList.toggle('done',task.done);li.append(label,remove);list.append(li);}summary();}
  function summary(){const done=tasks.filter(t=>t.done).length;$('task-status').textContent=tasks.length?`${done} de ${tasks.length} listas. ${tasks.length-done} pendientes.`:'Tu lista está vacía. Empieza por una cosa.';$('clear-done').disabled=!done;$('export-tasks').disabled=!tasks.length;}
  $('tasks').addEventListener('submit',e=>{e.preventDefault();const input=$('task-input'),text=input.value.trim();if(!text||text.length>120)return;if(tasks.length>=30){$('task-status').textContent='Máximo 30 tareas. Quita alguna antes de añadir más.';return;}tasks.push({id:++next,text,done:false});input.value='';render();input.focus();});
  $('clear-done').addEventListener('click',()=>{tasks=tasks.filter(t=>!t.done);render();});
  $('export-tasks').addEventListener('click',()=>{const content=tasks.map(t=>(t.done?'[x] ':'[ ] ')+t.text).join('\n'),url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='mi-lista.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});render();
 }
})();

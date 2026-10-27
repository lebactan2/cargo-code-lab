const $=id=>document.getElementById(id);
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const sharedCSS=`/* Shared foundation — copy this with the lesson rules.\n   Scoped to this example; it does not reset the whole Cargo site. */\n.cargo-lab {\n  display: block;\n  padding: 24px;\n  font: 18px/1.5 Arial, sans-serif;\n  color: #172A28;\n  overflow-wrap: anywhere;\n}\n.cargo-lab, .cargo-lab * { box-sizing: border-box; }\n.cargo-lab h2, .cargo-lab h3 {\n  font-family: inherit;\n  font-weight: bold;\n  line-height: 1.2;\n  margin: 0 0 16px;\n}\n.cargo-lab h2 { font-size: 28px; }\n.cargo-lab h3 { font-size: 22px; }\n.cargo-lab p { margin: 0 0 16px; }\n\n`;
const cargoDefault='Paste HTML into the page’s Code View and click Update. Paste CSS at the end of Site Settings → CSS/HTML → CSS, without <style> tags. Keep your existing code. Keep the cargo-lab wrapper and class names shown. These are standard HTML/CSS, supported in Cargo Code View; a template’s stronger or inline styles can still override them.';
const lessons=[
{name:'Hex colours',title:'A colour is a value you can change.',desc:'Choose a colour or type a six-digit hex code. Both the preview and CSS update together.',conceptTitle:'Selector → property → value',concept:'.lab-card selects the element with class="lab-card". background is the property; the hex colour is its value. In #RRGGBB, the pairs control red, green and blue: 00 is the lowest value and FF the highest.',challenge:'Make a warm background with dark text. Then try #000000 and #FFFFFF. Which colour pair is easiest to read?',controls:[['bg','Background','color','#DDF19A'],['fg','Text colour','color','#214D3E']],build:v=>({html:'<div class="lab-card">\n  <h2>Ideas take shape.</h2>\n  <p>My design process, one experiment at a time.</p>\n</div>',css:`/* Target this card, not every element on the site. */\n.cargo-lab .lab-card {\n  background: ${v.bg};\n  color: ${v.fg};\n  padding: 28px;\n  border-radius: 16px;\n}`})},
{name:'HTML structure',title:'Give your content a clear structure.',desc:'Change the words and their HTML tags. CSS can style a heading, but HTML tells the browser what it is.',conceptTitle:'Opening tag + content + closing tag',concept:'<h2> introduces a heading; <p> introduces a paragraph. The class attribute connects an element to its CSS rule. Choose a heading level for the document hierarchy, not just its visual size.',challenge:'Switch the heading from h2 to h3. Notice that the font size stays the same because our CSS sets it explicitly.',controls:[['heading','Heading text','text','Making space for ideas'],['tag','Heading element','select','h2',['h2','h3']],['text','Paragraph text','text','Research. Experiment. Reflect. Repeat.']],build:v=>({html:`<${v.tag} class="lab-title">${esc(v.heading)}</${v.tag}>\n<p class="lab-copy">${esc(v.text)}</p>`,css:'.cargo-lab .lab-title {\n  font-size: 32px;\n  color: #214D3E;\n}\n\n.cargo-lab .lab-copy {\n  font-size: 18px;\n  line-height: 1.6;\n}'})},
{name:'Type & spacing',title:'Make the same words easier to read.',desc:'Explore size, line height and letter spacing. Change one variable, then explain the result.',conceptTitle:'A number needs the right unit',concept:'px is a fixed CSS length. A unitless line-height is multiplied by the font size: 20px × 1.5 gives a 30px line box. Letter spacing changes the space between letters.',challenge:'Try large text in the narrow preview. Find a combination that reads well without making the lines feel crowded.',controls:[['size','Font size','range',24,14,42,'px'],['line','Line height','range',1.5,1,2.2,'',0.1],['spacing','Letter spacing','range',0,-1,4,'px',0.5],['family','Font family','select','Arial',['Arial','Georgia','monospace']]],build:v=>({html:'<p class="lab-type">A process journal makes your thinking visible. Show what you tried, what changed, and why.</p>',css:`.cargo-lab .lab-type {\n  font-family: ${v.family};\n  font-size: ${v.size}px;\n  line-height: ${v.line};\n  letter-spacing: ${v.spacing}px;\n  color: #214D3E;\n}`})},
{name:'The box model',title:'Space inside. Space outside.',desc:'See how padding, margin and border change the space around one piece of content.',conceptTitle:'Content → padding → border → margin',concept:'Padding sits between content and border. Margin separates this box from its neighbours. The dotted preview area belongs to this teaching page; it is not part of the copied CSS.',challenge:'Set padding to 0 and margin to 30px, then reverse them. Explain why the green background covers a different area.',controls:[['padding','Padding','range',24,0,48,'px'],['margin','Margin','range',12,0,40,'px'],['border','Border width','range',2,0,12,'px'],['radius','Corner radius','range',12,0,50,'px']],build:v=>({html:'<div class="lab-box">\n  Room for a new idea.\n</div>',css:`.cargo-lab .lab-box {\n  padding: ${v.padding}px;\n  margin: ${v.margin}px;\n  border: ${v.border}px solid #214D3E;\n  border-radius: ${v.radius}px;\n  background: #DDF19A;\n  color: #214D3E;\n}`})},
{
name: 'Cargo hover',
title: 'Style your Cargo button and its hover state.',
desc: 'Change the wording, symbols, typeface and underline. Hover the button or focus it with Tab to compare states.',
conceptTitle: 'One link, two visual states',
concept: 'Keep your existing Cargo button and destination. The normal and hover spans hold alternative labels. CSS switches the visible label on hover and keyboard focus. The link keeps a consistent accessible name. Use the same action in both labels; a symbol should support the words.',
challenge: 'Try a wavy underline, Georgia on hover, and an arrow changing from → to ↗. Compare readability and avoid a large change in label width. Touchscreens use the normal state, so keep its wording complete.',
cargo: 'In Code View, preserve your existing Cargo button classes and link attributes. Add lab-button to its styled link, keep the cargo-lab wrapper, and replace only its inner label with the two spans shown. Set aria-label to the button’s action. Paste the complete CSS into the CSS editor. These system fonts need no import; load any custom font in Cargo before using its family name.',
controls: [
 ['label','Button text','text','Explore my journal'],
 ['hoverLabel','Text on hover / focus','text','View my journal'],
 ['symbol','Normal symbol','select','→',['None','→','↗','+','✦','↓']],
 ['hoverSymbol','Hover / focus symbol','select','↗',['None','→','↗','+','✦','↓']],
 ['family','Normal typeface','select','Arial',['Arial','Georgia','Verdana','Courier New']],
 ['hoverFamily','Hover / focus typeface','select','Georgia',['Arial','Georgia','Verdana','Courier New']],
 ['underline','Hover underline style','select','solid',['none','solid','double','dotted','dashed','wavy']],
 ['bg','Button fill','color','#DDF19A'],
 ['effect','Hover colour effect','select','hue',['none','hue','brightness']],
 ['hue','Hue rotation','range',60,0,360,'°'],
 ['brightness','Brightness','range',0.85,0.4,1.4,'',0.05]
],
build: v => ({
 html: `<!-- Keep your Cargo button’s original classes and link attributes.
     These two spans replace only the label inside that button. -->
<a class="lab-button" href="#journal" aria-label="${esc(v.label)}">
  <span class="lab-label-normal" aria-hidden="true">${esc(v.label)}${v.symbol==='None'?'':' '+esc(v.symbol)}</span>
  <span class="lab-label-hover" aria-hidden="true">${esc(v.hoverLabel)}${v.hoverSymbol==='None'?'':' '+esc(v.hoverSymbol)}</span>
</a>
<p id="journal">Journal destination — replace with your own page link.</p>`,
 css: `/* 1. Normal state: preserve your Cargo link; add this class. */
.cargo-lab .lab-button {
  display: inline-block;
  background: ${v.bg};
  color: #172A28;
  padding: 16px 26px;
  border: 1px solid #172A28;
  border-radius: 40px;
  font-family: "${v.family}", ${v.family==='Georgia'?'serif':v.family==='Courier New'?'monospace':'sans-serif'};
  font-size: 18px;
  font-weight: bold;
  line-height: 1.5;
  text-decoration: none;
  transition: filter 180ms ease;
}
/* Show the normal wording until hover or keyboard focus. */
.cargo-lab .lab-label-hover { display: none; }

/* 2. Hover and keyboard focus: font, underline and colour. */
.cargo-lab .lab-button:hover,
.cargo-lab .lab-button:focus-visible {
  font-family: "${v.hoverFamily}", ${v.hoverFamily==='Georgia'?'serif':v.hoverFamily==='Courier New'?'monospace':'sans-serif'};
  text-decoration-line: ${v.underline==='none'?'none':'underline'};
  text-decoration-style: ${v.underline==='none'?'solid':v.underline};
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
  filter: ${v.effect==='none'?'none':v.effect==='hue'?`hue-rotate(${v.hue}deg)`:`brightness(${v.brightness})`};
}
/* 3. Switch words and symbols without changing the destination. */
.cargo-lab .lab-button:hover .lab-label-normal,
.cargo-lab .lab-button:focus-visible .lab-label-normal { display: none; }
.cargo-lab .lab-button:hover .lab-label-hover,
.cargo-lab .lab-button:focus-visible .lab-label-hover { display: inline; }

/* Keep a visible keyboard focus indicator. */
.cargo-lab .lab-button:focus-visible {
  outline: 3px solid #2457D6;
  outline-offset: 4px;
}
@media (prefers-reduced-motion: reduce) {
  .cargo-lab .lab-button { transition: none; }
}`
})
},
{name:'Dropdown menu',title:'Structure can create interaction.',desc:'Click Work in the preview. A native HTML disclosure works without JavaScript.',conceptTitle:'details + summary = disclosure',concept:'<summary> is the clickable label inside <details>. The browser opens and closes the remaining content. This example expands in the layout. It is a submenu, not the Cargo overlay-opening mechanism.',challenge:'Use Tab to focus Work and Enter to open it. Switch the layout to column: how could you use this inside your Week 3 overlay?',cargo:'Paste this HTML into your navigation page or inside your existing Cargo overlay page. Replace the example # links with real destinations using Link to Page. Set up the overlay trigger and Close Overlay link through Cargo’s Link menu. The CSS below styles only this submenu.',controls:[['direction','Layout direction','select','row',['row','column']],['gap','Gap','range',16,0,40,'px'],['bg','Submenu fill','color','#EEF2E8']],build:v=>({html:'<nav class="lab-nav" aria-label="Example navigation">\n  <a href="#home">Home</a>\n  <details>\n    <summary>Work</summary>\n    <div class="lab-submenu">\n      <a href="#project-one">Project One</a>\n      <a href="#project-two">Project Two</a>\n    </div>\n  </details>\n  <a href="#about">About</a>\n</nav>',css:`.cargo-lab .lab-nav {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: ${v.direction};\n  gap: ${v.gap}px;\n  align-items: flex-start;\n}\n.cargo-lab .lab-nav a, .cargo-lab .lab-nav summary {\n  color: #214D3E;\n  padding: 8px;\n}\n.cargo-lab .lab-nav summary { cursor: pointer; }\n.cargo-lab .lab-submenu {\n  background: ${v.bg};\n  padding: 8px;\n  border-radius: 8px;\n}\n.cargo-lab .lab-submenu a { display: block; }\n.cargo-lab .lab-nav :focus-visible {\n  outline: 3px solid #2457D6;\n  outline-offset: 2px;\n}`})}
];
let active=0,values={},current={},dirty=false;
lessons.forEach((l,i)=>{const b=document.createElement('button');b.textContent=`0${i+1}  ${l.name}`;b.onclick=()=>select(i);$('lessons').append(b)});
function select(i){active=i;values={};const l=lessons[i];l.controls.forEach(c=>values[c[0]]=c[3]);[...$('lessons').children].forEach((b,j)=>b.setAttribute('aria-current',i===j));$('step').textContent=`LESSON 0${i+1} / 06`;$('title').textContent=l.title;$('description').textContent=l.desc;$('conceptTitle').textContent=l.conceptTitle;$('concept').textContent=l.concept;$('challenge').textContent=l.challenge;$('cargo').textContent=l.cargo||cargoDefault;$('controls').replaceChildren();l.controls.forEach(control);$('status').textContent='';generate()}
function control(c){const [key,label,type,initial,min,max,unit,step]=c;const wrap=document.createElement('div');wrap.className='control';const lab=document.createElement('label');lab.htmlFor='control-'+key;lab.textContent=label;wrap.append(lab);let input=document.createElement(type==='select'?'select':'input');input.id='control-'+key;
 if(type==='select'){min.forEach(x=>{const o=document.createElement('option');o.value=x;o.textContent=x;input.append(o)})}else input.type=type;
 input.value=initial;
 if(type==='range'){input.min=min;input.max=max;input.step=step||1;input.value=initial;const o=document.createElement('output');o.textContent=initial+(unit||'');lab.append(o);input.oninput=()=>{values[key]=Number(input.value);o.textContent=input.value+(unit||'');generate()};wrap.append(input)}
 else if(type==='color'){const row=document.createElement('div');row.className='colorrow';const hex=document.createElement('input');hex.type='text';hex.value=initial;hex.setAttribute('aria-label',label+' hex code');hex.maxLength=7;input.oninput=()=>{values[key]=input.value.toUpperCase();hex.value=values[key];hex.setCustomValidity('');generate()};hex.oninput=()=>{if(/^#[0-9a-f]{6}$/i.test(hex.value)){values[key]=hex.value.toUpperCase();input.value=hex.value;hex.setCustomValidity('');generate()}else{hex.setCustomValidity('Use # and six hexadecimal digits, e.g. #DDF19A');$('status').textContent='Enter a valid six-digit hex colour, such as #DDF19A.'}};row.append(input,hex);wrap.append(row)}
 else{input.oninput=()=>{values[key]=input.value;generate()};wrap.append(input)}$('controls').append(wrap)}
function generate(){current=lessons[active].build(values);$('html').value='<div class="cargo-lab">\n'+current.html+'\n</div>';$('css').value=sharedCSS+current.css;dirty=false;$('mode').textContent='Synced with controls';$('status').textContent='';render()}
function render(){const h=$('html').value;const c=$('css').value;$('preview').srcdoc=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:"><style>${c.replace(/<\/style/gi,'')}</style></head><body>${h}</body></html>`}
['html','css'].forEach(id=>$(id).oninput=()=>{dirty=true;$('mode').textContent='Code edited — apply to preview';$('status').textContent='Changing a visual control will regenerate the code.'});
$('apply').onclick=()=>{render();$('mode').textContent='Custom code applied';$('status').textContent='Applied the HTML and CSS shown. Invalid CSS rules are ignored by the browser.'};
$('reset').onclick=()=>select(active);
$('wide').onclick=()=>size(false);$('narrow').onclick=()=>size(true);function size(n){$('preview').style.width=n?'320px':'100%';$('preview').style.maxWidth='100%';$('wide').setAttribute('aria-pressed',!n);$('narrow').setAttribute('aria-pressed',n)}
document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=async()=>{const el=$(b.dataset.copy);try{await navigator.clipboard.writeText(el.value);$('status').textContent=b.dataset.copy.toUpperCase()+' copied.'}catch{el.focus();el.select();$('status').textContent='Code selected. Press Ctrl+C (or Cmd+C) to copy.'}});
$('download').onclick=()=>{const text=`CARGO CODE LAB — ${lessons[active].name}\n\nHTML\n${$('html').value}\n\nCSS\n${$('css').value}\n\nIN CARGO\n${lessons[active].cargo||cargoDefault}`;const u=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=u;a.download='cargo-'+lessons[active].name.toLowerCase().replaceAll(' ','-')+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)};
select(0);

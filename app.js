/* CARGO CODE LAB: interactive lessons.
   Edit lesson content in the lessons array below.
   Paste this script into Site Settings > CSS/HTML > HTML. */
(function () {
  const initialisedRoots = new WeakMap();
  function initialiseCodeLab(force = false) {
    const root = document.body;
    if (!root || !root.querySelector("#title")) return;
    // Cargo may remove empty textarea elements when saving page HTML.
    // Restore the two editors beside their labels before loading lessons.
    for (const id of ['html', 'css']) {
      if (!root.querySelector('#' + id)) {
        const heading = root.querySelector('label[for="' + id + '"]')?.closest('.codeheading');
        if (!heading) return;
        const editor = document.createElement('textarea');
        editor.id = id;
        editor.spellcheck = false;
        editor.setAttribute('aria-label', id.toUpperCase() + ' code');
        heading.after(editor);
      }
    }
    if (initialisedRoots.get(root) === root.querySelector("#html") && (!force || root.querySelector("#html").value)) return;
    initialisedRoots.set(root, root.querySelector("#html"));
    root.querySelector("#lessons").replaceChildren();
    const $ = (id) => root.querySelector("#" + id);
    const esc = (s) =>
      s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
    const sharedCSS = `/* Shared foundation — copy this with the lesson rules.\n   Scoped to this example; it does not reset the whole Cargo site. */\n.cargo-lab {\n  display: block;\n  padding: 24px;\n  font: 18px/1.5 Arial, sans-serif;\n  color: #172A28;\n  overflow-wrap: anywhere;\n}\n.cargo-lab, .cargo-lab * { box-sizing: border-box; }\n.cargo-lab h2, .cargo-lab h3 {\n  font-family: inherit;\n  font-weight: bold;\n  line-height: 1.2;\n  margin: 0 0 16px;\n}\n.cargo-lab h2 { font-size: 28px; }\n.cargo-lab h3 { font-size: 22px; }\n.cargo-lab p { margin: 0 0 16px; }\n\n`;
    const cargoDefault =
      "Paste HTML into the page’s Code View and click Update. Paste CSS at the end of Site Settings → CSS/HTML → CSS, without <style> tags. Keep your existing code. Keep the cargo-lab wrapper and class names shown. These are standard HTML/CSS, supported in Cargo Code View; a template’s stronger or inline styles can still override them.";
    const lessons = [
      {
        name: "Hex colours",
        title: "A colour is a value you can change.",
        desc: "Choose a colour or type a six-digit hex code. Both the preview and CSS update together.",
        conceptTitle: "Selector → property → value",
        concept:
          '.lab-card selects the element with class="lab-card". background is the property; the hex colour is its value. In #RRGGBB, the pairs control red, green and blue: 00 is the lowest value and FF the highest.',
        challenge:
          "Make a warm background with dark text. Then try #000000 and #FFFFFF. Which colour pair is easiest to read?",
        controls: [
          ["bg", "Background", "color", "#DDF19A"],
          ["fg", "Text colour", "color", "#214D3E"],
        ],
        build: (v) => ({
          html: '<div class="lab-card">\n  <h2>Ideas take shape.</h2>\n  <p>My design process, one experiment at a time.</p>\n</div>',
          css: `/* Target this card, not every element on the site. */\n.cargo-lab .lab-card {\n  background: ${v.bg};\n  color: ${v.fg};\n  padding: 28px;\n  border-radius: 16px;\n}`,
        }),
      },
      {
        name: "HTML structure",
        title: "Give your content a clear structure.",
        desc: "Change the words and their HTML tags. CSS can style a heading, but HTML tells the browser what it is.",
        conceptTitle: "Opening tag + content + closing tag",
        concept:
          "<h2> introduces a heading; <p> introduces a paragraph. The class attribute connects an element to its CSS rule. Choose a heading level for the document hierarchy, not just its visual size.",
        challenge:
          "Switch the heading from h2 to h3. Notice that the font size stays the same because our CSS sets it explicitly.",
        controls: [
          ["heading", "Heading text", "text", "Making space for ideas"],
          ["tag", "Heading element", "select", "h2", ["h2", "h3"]],
          [
            "text",
            "Paragraph text",
            "text",
            "Research. Experiment. Reflect. Repeat.",
          ],
        ],
        build: (v) => ({
          html: `<${v.tag} class="lab-title">${esc(v.heading)}</${v.tag}>\n<p class="lab-copy">${esc(v.text)}</p>`,
          css: ".cargo-lab .lab-title {\n  font-size: 32px;\n  color: #214D3E;\n}\n\n.cargo-lab .lab-copy {\n  font-size: 18px;\n  line-height: 1.6;\n}",
        }),
      },
      {
        name: "Type & spacing",
        title: "Make the same words easier to read.",
        desc: "Explore size, line height and letter spacing. Change one variable, then explain the result.",
        conceptTitle: "A number needs the right unit",
        concept:
          "px is a fixed CSS length. A unitless line-height is multiplied by the font size: 20px × 1.5 gives a 30px line box. Letter spacing changes the space between letters.",
        challenge:
          "Try large text in the narrow preview. Find a combination that reads well without making the lines feel crowded.",
        controls: [
          ["size", "Font size", "range", 24, 14, 42, "px"],
          ["line", "Line height", "range", 1.5, 1, 2.2, "", 0.1],
          ["spacing", "Letter spacing", "range", 0, -1, 4, "px", 0.5],
          [
            "family",
            "Font family",
            "select",
            "Arial",
            ["Arial", "Georgia", "monospace"],
          ],
        ],
        build: (v) => ({
          html: '<p class="lab-type">A process journal makes your thinking visible. Show what you tried, what changed, and why.</p>',
          css: `.cargo-lab .lab-type {\n  font-family: ${v.family};\n  font-size: ${v.size}px;\n  line-height: ${v.line};\n  letter-spacing: ${v.spacing}px;\n  color: #214D3E;\n}`,
        }),
      },
      {
        name: "The box model",
        title: "Space inside. Space outside.",
        desc: "See how padding, margin and border change the space around one piece of content.",
        conceptTitle: "Content → padding → border → margin",
        concept:
          "Padding sits between content and border. Margin separates this box from its neighbours. The dotted preview area belongs to this teaching page; it is not part of the copied CSS.",
        challenge:
          "Set padding to 0 and margin to 30px, then reverse them. Explain why the green background covers a different area.",
        controls: [
          ["padding", "Padding", "range", 24, 0, 48, "px"],
          ["margin", "Margin", "range", 12, 0, 40, "px"],
          ["border", "Border width", "range", 2, 0, 12, "px"],
          ["radius", "Corner radius", "range", 12, 0, 50, "px"],
        ],
        build: (v) => ({
          html: '<div class="lab-box">\n  Room for a new idea.\n</div>',
          css: `.cargo-lab .lab-box {\n  padding: ${v.padding}px;\n  margin: ${v.margin}px;\n  border: ${v.border}px solid #214D3E;\n  border-radius: ${v.radius}px;\n  background: #DDF19A;\n  color: #214D3E;\n}`,
        }),
      },
      {
name: 'Button hover',
title: 'Style a button and its hover state.',
desc: 'Change the wording, symbols, typeface and underline. Hover the button or focus it with Tab to compare states.',
conceptTitle: 'One link, two visual states',
concept: 'Use a link styled as a button. The normal and hover spans hold alternative labels. CSS switches the visible label on hover and keyboard focus. The link keeps a consistent accessible name. Use the same action in both labels; a symbol should support the words.',
challenge: 'Try a wavy underline, Georgia on hover, and an arrow changing from → to ↗. Compare readability and avoid a large change in label width. Touchscreens use the normal state, so keep its wording complete.',
cargo: 'Paste the example HTML into Code View. Replace the link destination and edit the two label spans. Set aria-label to the button’s action. Paste the complete CSS into the CSS editor. These system fonts need no import; load any custom font in Cargo before using its family name.',
controls: [
 ['label','Button text','text','Explore my journal'],
 ['hoverLabel','Text on hover / focus','text','View my journal'],
 ['symbol','Normal symbol','select','→',['None','→','↗','+','✦','↓']],
 ['hoverSymbol','Hover / focus symbol','select','↗',['None','→','↗','+','✦','↓']],
 ["fontStyle", "Normal button style", "select", "normal", ["normal", "italic"]],
["hoverFontStyle", "Hover / focus button style", "select", "italic", ["normal", "italic"]],
['family','Normal typeface','select','Arial',['Arial','Georgia','Verdana','Courier New']],
 ['hoverFamily','Hover / focus typeface','select','Georgia',['Arial','Georgia','Verdana','Courier New']],
 ['underline','Hover underline style','select','solid',['none','solid','double','dotted','dashed','wavy']],
 ['bg','Button fill','color','#DDF19A'],
 ['effect','Hover colour effect','select','hue',['none','hue','brightness']],
 ['hue','Hue rotation','range',60,0,360,'°'],
 ['brightness','Brightness','range',0.85,0.4,1.4,'',0.05]
],
build: v => ({
 html: `<!-- The link below is styled as a button by the lab-button class.
     These two spans define its normal and hover labels. -->
<a class="lab-button" href="#journal" aria-label="${esc(v.label)}">
  <span class="lab-label-normal" aria-hidden="true">${esc(v.label)}${v.symbol==='None'?'':' '+esc(v.symbol)}</span>
  <span class="lab-label-hover" aria-hidden="true">${esc(v.hoverLabel)}${v.hoverSymbol==='None'?'':' '+esc(v.hoverSymbol)}</span>
</a>
<p id="journal">Journal destination — replace with your own page link.</p>`,
 css: `/* 1. Normal state: style the link with this class. */
.cargo-lab .lab-button {
  display: inline-block;
  background: ${v.bg};
  color: #172A28;
  padding: 16px 26px;
  border: 1px solid #172A28;
  border-radius: 40px;
  font-family: "${v.family}", ${v.family==='Georgia'?'serif':v.family==='Courier New'?'monospace':'sans-serif'};
  font-size: 18px;
  font-style: ${v.fontStyle}; /* normal or italic */
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
  font-style: ${v.hoverFontStyle}; /* normal or italic */
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
{
        name: "Dropdown menu",
        title: "Build a dropdown menu.",
        desc: "Click Work in the preview. A native HTML disclosure works without JavaScript.",
        conceptTitle: "details + summary = disclosure",
        concept:
          "<summary> is the clickable label inside <details>. The browser opens and closes the remaining content. This example expands in the layout. It is a submenu, not the Cargo overlay-opening mechanism.",
        challenge:
          "Use Tab to focus Work and Enter to open it. Compare vertical and horizontal layouts. Choose vertical for a stacked menu inside your Week 3 overlay.",
        cargo:
          "Paste this HTML into your navigation page or inside your existing Cargo overlay page. Replace the example # links with real destinations using Link to Page. Set up the overlay trigger and Close Overlay link through Cargo’s Link menu. The CSS below styles only this submenu.",
        controls: [
          ["menuStyle", "Menu text style", "select", "normal", ["normal", "italic"]],
["submenuStyle", "Submenu text style", "select", "italic", ["normal", "italic"]],
["direction", "Menu variation", "select", "horizontal", ["horizontal", "vertical"]],
          ["gap", "Gap", "range", 16, 0, 40, "px"],
          ["bg", "Submenu fill", "color", "#EEF2E8"],
        ],
        build: (v) => ({
          html: '<nav class="lab-nav" aria-label="Example navigation">\n  <a href="#home">Home</a>\n  <details>\n    <summary>Work</summary>\n    <div class="lab-submenu">\n      <a href="#project-one">Project One</a>\n      <a href="#project-two">Project Two</a>\n    </div>\n  </details>\n  <a href="#about">About</a>\n</nav>',
          css: `.cargo-lab .lab-nav {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: ${v.direction === 'vertical' ? 'column' : 'row'};\n  gap: ${v.gap}px;\n  align-items: flex-start;\n}\n.cargo-lab .lab-nav a, .cargo-lab .lab-nav summary {\n  color: #214D3E;\n  font-style: ${v.menuStyle}; /* normal or italic */\n  padding: 8px;\n}\n.cargo-lab .lab-nav summary { cursor: pointer; }\n.cargo-lab .lab-submenu {\n  background: ${v.bg};\n  padding: 8px;\n  border-radius: 8px;\n}\n.cargo-lab .lab-submenu a {\n  display: block;\n  font-style: ${v.submenuStyle}; /* Override the main menu style. */\n}\n.cargo-lab .lab-nav :focus-visible {\n  outline: 3px solid #2457D6;\n  outline-offset: 2px;\n}`,
        }),
      },
    ];
    const htmlNotes = [
      '<!-- class="lab-card" connects this card to its CSS. h2 is a heading; p is a paragraph. -->',
      '<!-- Heading and paragraph tags describe content. Their classes select the matching CSS rules. -->',
      '<!-- The paragraph class connects its words to the font and spacing rules. -->',
      '<!-- This div groups content into one box. CSS controls its padding, border and outer margin. -->',
      '<!-- Both labels belong to the same link. Change its href to your destination. -->',
      '<!-- nav groups links. details opens and closes; summary is its clickable label. Replace # links in Cargo. -->'
    ];
    lessons.push({
      name: 'Paste & debug',
      title: 'Paste Cargo HTML and CSS. Inspect one change at a time.',
      desc: 'Paste page Code View HTML on the left and its CSS below. Colours separate tags, attributes, values and comments. Check code, then apply to the preview.',
      conceptTitle: 'Your pasted code stays yours',
      concept: 'This workspace adds no cargo-lab wrapper or foundation styles. cargo-lab is just our custom example class, not a Cargo requirement. Keep the classes used in your own code and match them in CSS. Checks report common structural issues; they do not automatically repair your work.',
      challenge: 'Paste a small section first. Remove a closing brace from CSS, click Check code, then restore it. Use the reported line number to find the problem. Copy your corrected source back to Cargo after testing.',
      cargo: 'HTML: copy from your Cargo page Code View. CSS: copy the relevant rules from its CSS tab or the site CSS editor. Keep a backup. Cargo page IDs, custom components, overlays, external assets and scripts may not render here. Use Cargo preview for the final check. Pasted code stays in this browser session and is not uploaded by the lab.',
      controls: [], raw: true,
      build: () => ({html: '<!-- Replace this sample with your Cargo page HTML. -->\n<div class="my-example">\n  <h2>My Cargo test</h2>\n  <p>Edit, check, then preview.</p>\n</div>', css: '/* Replace these rules with your Cargo CSS. */\n.my-example {\n  padding: 24px;\n  background: #F6F2E6;\n  color: #172A28;\n  font: 18px/1.5 Arial, sans-serif;\n}'})
    });
    let active = 0,
      values = {},
      current = {},
      dirty = false;
// Colour is a visual aid: the textarea remains the editable, copyable source.
const editorLayers = {};
function colourCode(source, language) {
  const token = (kind, text) => `<span class="syntax-${kind}">${esc(text)}</span>`;
  if (language === 'html') {
    return source.split(/(<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>|<![^>]*>)/g).map(part => {
      if (part.startsWith('<!--')) return token('comment', part);
      if (!part.startsWith('<')) return esc(part);
      return part.split(/("[^"]*"|'[^']*'|\b[\w:-]+(?=\s*=))/g).map(piece => {
        if (/^["']/.test(piece)) return token('string', piece);
        if (/^[\w:-]+$/.test(piece)) return token('attribute', piece);
        return token('tag', piece);
      }).join('');
    }).join('');
  }
  return source.split(/(\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[\da-fA-F]{3,8}\b|--?[\w-]+(?=\s*:)|[a-zA-Z-]+(?=\s*:)|-?\d*\.?\d+(?:px|rem|em|%|deg|ms|s)?\b|[{}:;])/g).map(part => {
    if (part.startsWith('/*')) return token('comment', part);
    if (/^["']/.test(part) || /^#[\da-fA-F]+$/.test(part)) return token('string', part);
    if (/^-?\d/.test(part)) return token('number', part);
    if (/^[{}:;]$/.test(part)) return token('punctuation', part);
    if (/^[a-zA-Z-]+$/.test(part)) return token('attribute', part);
    return esc(part);
  }).join('');
}
function paintEditor(id) {
  const layer = editorLayers[id];
  if (!layer) return;
  layer.pre.innerHTML = colourCode($(id).value, id) + '\n';
  layer.pre.scrollTop = $(id).scrollTop;
  layer.pre.scrollLeft = $(id).scrollLeft;
  const line = $(id).value.slice(0, $(id).selectionStart).split('\n').length;
  layer.info.textContent = `${id.toUpperCase()} · line ${line} · ${$(id).value.split('\n').length} lines`;
}
for (const id of ['html', 'css']) {
  const input = $(id);
  let shell = input.closest('.syntax-editor');
  if (!shell) {
    shell = document.createElement('div');
    shell.className = 'syntax-editor';
    input.before(shell);
    const pre = document.createElement('pre');
    pre.className = 'syntax-layer';
    pre.setAttribute('aria-hidden', 'true');
    shell.append(pre, input);
    const info = document.createElement('div');
    info.className = 'editor-location';
    shell.after(info);
  }
  input.wrap = 'off';
  input.autocapitalize = 'off';
  input.setAttribute('autocorrect', 'off');
  editorLayers[id] = {pre: shell.querySelector('pre'), info: shell.nextElementSibling};
  input.onscroll = () => paintEditor(id);
  input.onkeyup = () => paintEditor(id);
  input.onclick = () => paintEditor(id);
}
// Diagnostics never alter the pasted source and are not a full HTML/CSS validator.
let diagnostics = $('diagnostics');
if (!diagnostics) {
  diagnostics = document.createElement('section');
  diagnostics.id = 'diagnostics';
  diagnostics.className = 'code-diagnostics';
  diagnostics.setAttribute('aria-live', 'polite');
  $('status').after(diagnostics);
}
let checkButton = $('check-code');
if (!checkButton) {
  checkButton = document.createElement('button');
  checkButton.id = 'check-code';
  checkButton.textContent = 'Check code';
  $('apply').before(checkButton);
}
function checkCode() {
  const html = $('html').value, css = $('css').value, issues = [];
  const lineAt = (text, pos) => text.slice(0, pos).split('\n').length;
  const cleanCSS = css.replace(/\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, m => m.replace(/[^\n]/g, ' '));
  const braces = [];
  for (let i = 0; i < cleanCSS.length; i++) {
    if (cleanCSS[i] === '{') braces.push(i);
    if (cleanCSS[i] === '}') {
      if (braces.length) braces.pop();
      else issues.push(`CSS line ${lineAt(css, i)}: closing } has no opening {.`);
    }
  }
  braces.forEach(i => issues.push(`CSS line ${lineAt(css, i)}: opening { needs a closing }.`));
  if (/<\/?style\b/i.test(css)) issues.push('CSS: remove <style> tags; this box expects CSS rules only.');
  const stack = [], ids = new Set();
  const htmlSource = html.replace(/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, m => m.replace(/[^\n]/g, ' '));
  for (const match of htmlSource.matchAll(/<(\/?)(([a-zA-Z][\w-]*))\b[^>]*>/g)) {
    const tag = match[2].toLowerCase();
    if (/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/.test(tag) || /\/>$/.test(match[0])) continue;
    if (match[1]) {
      const previous = stack.pop();
      if (!previous || previous.tag !== tag) issues.push(`HTML line ${lineAt(html, match.index)}: check </${tag}> nesting${previous ? `; expected </${previous.tag}>` : ''}.`);
    } else stack.push({tag, line: lineAt(html, match.index)});
  }
  stack.slice(-5).forEach(item => issues.push(`HTML line ${item.line}: check whether <${item.tag}> needs a closing tag.`));
  for (const match of htmlSource.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) {
    if (ids.has(match[1])) issues.push(`HTML: duplicate id="${match[1]}". IDs should be unique.`);
    ids.add(match[1]);
  }
  if (/<script\b/i.test(html)) issues.push('Preview: scripts are blocked. This editor checks HTML and CSS only.');
  if (/<(?:column-set|column-unit|media-item|gallery-|cargo-)/i.test(html)) issues.push('Cargo components need Cargo’s runtime; this standalone preview may differ.');
  if (/\[id\s*=/.test(css)) issues.push('Cargo page-ID selectors only match if that page wrapper is also in your pasted HTML.');
  if (/\b(?:src|href)\s*=|url\s*\(/i.test(html + css)) issues.push('Preview blocks remote assets and navigation. Fonts, images and links may differ on Cargo.');
  diagnostics.replaceChildren();
  const heading = document.createElement('strong');
  heading.textContent = issues.length ? 'Checks and preview notes' : 'No common structural issues detected';
  diagnostics.append(heading);
  const list = document.createElement('ul');
  issues.slice(0, 12).forEach(message => {const li = document.createElement('li'); li.textContent = message; list.append(li);});
  diagnostics.append(list);
  const note = document.createElement('p');
  note.textContent = 'Basic checks only: optional HTML closing tags can produce warnings. This does not validate every CSS property or replace testing on Cargo.';
  diagnostics.append(note);
}
checkButton.onclick = checkCode;

// Expand only the editors; the original textareas and their contents stay in place.
const codePanel = root.querySelector('.codepanel');
let expandCode = $('expand-code');
if (!expandCode) {
  expandCode = document.createElement('button');
  expandCode.id = 'expand-code';
  expandCode.textContent = 'Expand code';
  expandCode.setAttribute('aria-expanded', 'false');
  codePanel.querySelector('.panelhead').append(expandCode);
}
let previousOverflow = '';
let previousScroll = 0;
function toggleCodeView(open) {
  codePanel.classList.toggle('code-fullscreen', open);
  expandCode.textContent = open ? 'Close full view · Esc' : 'Expand code';
  expandCode.setAttribute('aria-expanded', String(open));
  if (open) { previousOverflow = document.body.style.overflow; previousScroll = window.scrollY; window.scrollTo(0, 0); document.body.style.overflow = 'hidden'; }
  else { document.body.style.overflow = previousOverflow; window.scrollTo(0, previousScroll); expandCode.focus({preventScroll:true}); }
  paintEditor('html'); paintEditor('css');
}
expandCode.onclick = () => toggleCodeView(!codePanel.classList.contains('code-fullscreen'));
codePanel.onkeydown = event => {
  if (!codePanel.classList.contains('code-fullscreen')) return;
  if (event.key === 'Escape') { event.preventDefault(); toggleCodeView(false); }
  if (event.key === 'Tab') {
    const items = [...codePanel.querySelectorAll('button, textarea')].filter(el => !el.disabled);
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
  }
};


    lessons.forEach((l, i) => {
      const b = document.createElement("button");
      b.textContent = `0${i + 1}  ${l.name}`;
      b.onclick = () => select(i);
      $("lessons").append(b);
    });
    function select(i) {
      if (typeof active === 'number' && lessons[active]?.raw && dirty && i !== active) {
        if (!confirm('Leave the paste workspace and discard your edits? Copy or download them first if you need them.')) return;
      }
      active = i;
      values = {};
      const l = lessons[i];
      l.controls.forEach((c) => (values[c[0]] = c[3]));
      [...$("lessons").children].forEach((b, j) =>
        b.setAttribute("aria-current", i === j),
      );
      $("step").textContent = `LESSON 0${i + 1} / ${String(lessons.length).padStart(2, "0")}`;
      $("title").textContent = l.title;
      $("description").textContent = l.desc;
      $("conceptTitle").textContent = l.conceptTitle;
      $("concept").textContent = l.concept;
      $("challenge").textContent = l.challenge;
      $("cargo").textContent = l.cargo || cargoDefault;
      $("controls").replaceChildren();
      l.controls.forEach(control);
      $("status").textContent = "";
      generate();
    }
    function control(c) {
      const [key, label, type, initial, min, max, unit, step] = c;
      const wrap = document.createElement("div");
      wrap.className = "control";
      const lab = document.createElement("label");
      lab.htmlFor = "control-" + key;
      lab.textContent = label;
      wrap.append(lab);
      let input = document.createElement(
        type === "select" ? "select" : "input",
      );
      input.id = "control-" + key;
      if (type === "select") {
        min.forEach((x) => {
          const o = document.createElement("option");
          o.value = x;
          o.textContent = x;
          input.append(o);
        });
      } else input.type = type;
      input.value = initial;
      if (type === "range") {
        input.min = min;
        input.max = max;
        input.step = step || 1;
        input.value = initial;
        const o = document.createElement("output");
        o.textContent = initial + (unit || "");
        lab.append(o);
        input.oninput = () => {
          values[key] = Number(input.value);
          o.textContent = input.value + (unit || "");
          generate();
        };
        wrap.append(input);
      } else if (type === "color") {
        const row = document.createElement("div");
        row.className = "colorrow";
        const hex = document.createElement("input");
        hex.type = "text";
        hex.value = initial;
        hex.setAttribute("aria-label", label + " hex code");
        hex.maxLength = 7;
        input.oninput = () => {
          values[key] = input.value.toUpperCase();
          hex.value = values[key];
          hex.setCustomValidity("");
          generate();
        };
        hex.oninput = () => {
          if (/^#[0-9a-f]{6}$/i.test(hex.value)) {
            values[key] = hex.value.toUpperCase();
            input.value = hex.value;
            hex.setCustomValidity("");
            generate();
          } else {
            hex.setCustomValidity(
              "Use # and six hexadecimal digits, e.g. #DDF19A",
            );
            $("status").textContent =
              "Enter a valid six-digit hex colour, such as #DDF19A.";
          }
        };
        row.append(input, hex);
        wrap.append(row);
      } else {
        input.oninput = () => {
          values[key] = input.value;
          generate();
        };
        wrap.append(input);
      }
      $("controls").append(wrap);
    }
    function generate() {
      current = lessons[active].build(values);
      $("html").value = lessons[active].raw ? current.html : '<!-- cargo-lab is our custom wrapper, not a Cargo requirement. It scopes the example CSS. -->\n<div class="cargo-lab">\n' + htmlNotes[active] + '\n' + current.html + "\n</div>";
      $("css").value = (lessons[active].raw ? "" : sharedCSS) + current.css;
      paintEditor("html"); paintEditor("css");
      diagnostics.replaceChildren();
      dirty = false;
      $("mode").textContent = "Synced with controls";
      $("status").textContent = "";
      render();
    }
    function render() {
      $("preview").setAttribute("sandbox", "");
      const h = $("html").value;
      const c = $("css").value;
      $("preview").srcdoc =
        `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:"><style>${c.replace(/<\/style/gi, "")}</style></head><body>${h}</body></html>`;
    }
    ["html", "css"].forEach(
      (id) =>
        ($(id).oninput = () => {
          dirty = true;
          paintEditor(id);
          $("mode").textContent = "Code edited — apply to preview";
          $("status").textContent =
            lessons[active].raw ? "Edits stay here until you reset or leave this workspace. Check code, then apply." : "Changing a visual control will regenerate the code.";
        }),
    );
    $("apply").onclick = () => {
      render();
      checkCode();
      $("mode").textContent = "Custom code applied";
      $("status").textContent =
        "Applied the HTML and CSS shown. Invalid CSS rules are ignored by the browser.";
    };
    $("reset").onclick = () => { if (!dirty || confirm("Reset this lesson and discard edited code?")) select(active); };
    $("wide").onclick = () => size(false);
    $("narrow").onclick = () => size(true);
    function size(n) {
      $("preview").style.width = n ? "320px" : "100%";
      $("preview").style.maxWidth = "100%";
      $("wide").setAttribute("aria-pressed", !n);
      $("narrow").setAttribute("aria-pressed", n);
    }
    root.querySelectorAll("[data-copy]").forEach(
      (b) =>
        (b.onclick = async () => {
          const el = $(b.dataset.copy);
          try {
            await navigator.clipboard.writeText(el.value);
            $("status").textContent = b.dataset.copy.toUpperCase() + " copied.";
          } catch {
            el.focus();
            el.select();
            $("status").textContent =
              "Code selected. Press Ctrl+C (or Cmd+C) to copy.";
          }
        }),
    );
    $("download").onclick = () => {
      const text = `CARGO CODE LAB — ${lessons[active].name}\n\nHTML\n${$("html").value}\n\nCSS\n${$("css").value}\n\nIN CARGO\n${lessons[active].cargo || cargoDefault}`;
      const u = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
      const a = document.createElement("a");
      a.href = u;
      a.download =
        "cargo-" +
        lessons[active].name.toLowerCase().replaceAll(" ", "-") +
        ".txt";
      a.click();
      setTimeout(() => URL.revokeObjectURL(u), 1000);
    };
    select(0);
  }
  initialiseCodeLab();
  [500, 1500, 3000].forEach(delay => setTimeout(() => initialiseCodeLab(true), delay));
  new MutationObserver(() => initialiseCodeLab()).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();

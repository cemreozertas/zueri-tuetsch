/*
 * Züritüütsch, a guide to Zurich German: app logic
 * All content comes from data.js. No libraries, no build step.
 */
(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const ruleById = Object.fromEntries(RULES.map((r) => [r.id, r]));
  const ruleNo = (id) => String(RULES.findIndex((r) => r.id === id) + 1).padStart(2, "0");
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === undefined || v === null) continue;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v);
      }
    }
    (children || []).forEach((c) => node.append(c));
    return node;
  }

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Browser storage can be unavailable (private mode, some embeds), so it must never break the app.
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    }
  };

  /* ------------------------------------------------------- Split-flap tiles */

  const FLAP_CHARS = "ABCDEFGHIKLMNOPRSTUZÄÖÜ";
  const MAX_FLAPS = 14;

  // Which letters of `to` are new compared with `from` (longest common subsequence).
  function changedMask(from, to) {
    const a = from.toLowerCase(), b = to.toLowerCase();
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) {
      for (let j = n - 1; j >= 0; j--) {
        dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    const mask = new Array(n).fill(true);
    let i = 0, j = 0;
    while (i < m && j < n) {
      if (a[i] === b[j]) { mask[j] = false; i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
      else j++;
    }
    return mask;
  }

  function setTile(tile, ch) {
    const blank = !ch || ch === " ";
    tile.textContent = blank ? " " : ch;
    tile.classList.toggle("is-blank", blank);
  }

  // Lays out a row of flaps showing `from`, then flips each tile to `to`.
  function flapTo(container, from, to, opts) {
    const animate = !(opts && opts.animate === false) && !reduceMotion;
    const run = (container._run = (container._run || 0) + 1);
    const n = Math.max(from.length, to.length, 1);
    const mask = changedMask(from, to);
    container.style.setProperty("--n", n);
    container.innerHTML = "";
    container.setAttribute("role", "img");
    container.setAttribute("aria-label", from === to ? to : from + " becomes " + to);

    const tiles = [];
    for (let i = 0; i < n; i++) {
      const tile = el("span", { class: "flap", "aria-hidden": "true" });
      setTile(tile, animate ? from[i] : to[i]);
      if (!animate && mask[i]) tile.classList.add("is-changed");
      container.append(tile);
      tiles.push(tile);
    }
    if (!animate) return;

    tiles.forEach((tile, i) => {
      const target = to[i] || " ";
      const start = from[i] || " ";
      const willChange = target.toLowerCase() !== start.toLowerCase() || mask[i];
      if (!willChange) return;
      const spins = target === " " ? 1 : 3;
      let k = 0;
      setTimeout(function step() {
        if (container._run !== run) return;
        tile.classList.remove("is-ticking");
        void tile.offsetWidth;
        tile.classList.add("is-ticking");
        if (k < spins) {
          setTile(tile, FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)]);
          k++;
          setTimeout(step, 70);
        } else {
          setTile(tile, target);
          tile.classList.toggle("is-changed", !!mask[i]);
        }
      }, 120 + i * 60);
    });
  }

  function flapText(text) {
    return text.split(" (")[0].split(" / ")[0].split(", ")[0].trim();
  }

  /* -------------------------------------------------------------- Router */

  const VIEWS = ["start", "decode", "rules", "cards", "quiz", "plan", "story"];
  let currentView = null;

  function route() {
    const hash = decodeURIComponent(location.hash.slice(1));
    let view = VIEWS.includes(hash) ? hash : "start";
    let target = null;
    if (hash.startsWith("rule-")) { view = "rules"; target = document.getElementById(hash); }
    if (hash.startsWith("story-")) { view = "story"; target = document.getElementById(hash); if (target) openStory(target, true); }

    const changed = view !== currentView;
    currentView = view;
    $$(".view").forEach((s) => { s.hidden = s.dataset.view !== view; });
    $$(".tabs a").forEach((a) => {
      if (a.dataset.view === view) {
        a.setAttribute("aria-current", "page");
        if (a.parentElement.scrollWidth > a.parentElement.clientWidth) a.scrollIntoView({ block: "nearest", inline: "center" });
      }
      else a.removeAttribute("aria-current");
    });
    const label = { start: "Start", story: "Story", decode: "Decode", rules: "Rules", cards: "Vocabulary", quiz: "Quiz", plan: "Listening plan" }[view];
    document.title = view === "start" ? "Züritüütsch · A guide to Zurich German" : label + " · Züritüütsch";

    if (target) target.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    else if (changed) window.scrollTo(0, 0);

    if (view === "decode") demo.resume(); else demo.pause();
    if (view === "start") startLoop.resume(); else startLoop.pause();
  }

  /* --------------------------------------------------------------- Rules */

  // Little tram used wherever the app points from one language to the other.
  const TRAM_SVG = '<svg class="tram" viewBox="0 0 30 18" aria-hidden="true" focusable="false"><path d="M11 .8h8L15 4.2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path fill="currentColor" fill-rule="evenodd" d="M4 4.5h20.5c2.5 0 4.5 2 4.5 4.5v5H1V7.5a3 3 0 0 1 3-3ZM3.5 7h4v3.2h-4Zm6.5 0h4v3.2h-4Zm6.5 0h4v3.2h-4Zm6.5 0h3.2a1.8 1.8 0 0 1 1.8 1.8v1.4h-5Z"/><circle cx="7" cy="15.6" r="1.8" fill="currentColor"/><circle cx="23" cy="15.6" r="1.8" fill="currentColor"/></svg>';
  // Ticket used as the open/close toggle on the Story page: it gets stamped when opened.
  const TICKET_SVG = '<svg viewBox="0 0 36 22" aria-hidden="true" focusable="false"><path class="t-body" d="M3 2h30a1 1 0 0 1 1 1v5a3 3 0 0 0 0 6v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5a3 3 0 0 0 0-6V3a1 1 0 0 1 1-1Z"/><path class="t-perf" d="M24 4v14"/><g class="t-stamp"><circle cx="13" cy="11" r="4.2"/><path d="M11 11.1l1.5 1.5 3-3.1"/></g></svg>';
  function ticket() { const t = document.createElement("template"); t.innerHTML = '<span class="story-ticket">' + TICKET_SVG + '</span>'; return t.content.firstChild; }
  function tram() { const t = document.createElement("template"); t.innerHTML = TRAM_SVG; return t.content.firstChild; }

  function renderRules() {
    const list = $("#rules-list");
    RULES.forEach((r, i) => {
      const body = el("div", { class: "rule-body" }, [
        el("ul", { class: "pairs" }, r.examples.map(([hd, zd]) => el("li", null, [
          el("span", { class: "hd", text: hd + " → " }),
          el("span", { class: "zd", text: zd })
        ]))),
        el("p", { class: "reverse", text: r.reverse })
      ]);
      if (r.caveat) body.append(el("p", { class: "caveat", text: r.caveat }));
      list.append(el("li", { class: "rule", id: "rule-" + r.id }, [
        el("span", { class: "rule-tile", "aria-label": "Rule " + (i + 1), text: String(i + 1).padStart(2, "0") }),
        el("h3", null, [
          el("span", { class: "from", text: r.from }),
          el("span", { class: "arrow", "aria-label": "in Züritüütsch:" }, [tram()]),
          el("span", { class: "from", text: r.to })
        ]),
        el("p", { class: "rule-explain", text: r.explain }),
        body
      ]));
    });

    const g = $("#grammar-grid");
    GRAMMAR.forEach((item) => {
      g.append(el("div", { class: "grammar" }, [
        el("h4", { text: item.title }),
        el("p", { text: item.text }),
        el("ul", null, item.examples.map(([hd, zd]) => el("li", null, [
          el("span", { class: "zd", text: zd }),
          document.createTextNode(" = " + hd)
        ])))
      ]));
    });
  }

  const strip = (t) => t.replace(/ \(.*\)/, "").replace(" / nothing", "");
  const shortShift = (id) => strip(ruleById[id].to) + " → " + strip(ruleById[id].from);

  function ruleChip(id, forward) {
    const r = ruleById[id];
    return el("a", { class: "rule-chip", href: "#rule-" + id }, [
      el("span", { class: "rule-no", text: ruleNo(id) }),
      document.createTextNode(forward ? strip(r.from) + " → " + strip(r.to) : shortShift(id))
    ]);
  }

  /* ------------------------------------------------------------- Decoder */

  const EXTRA_WORDS = {
    "isch": "ist", "bisch": "bist", "bi": "bin", "ha": "habe", "häsch": "hast", "hät": "hat",
    "gsi": "gewesen", "gha": "gehabt", "cho": "kommen / gekommen", "gaa": "gehen",
    "mer": "wir / man", "mir": "wir (or: mir)", "hüt": "heute", "au": "auch", "no": "noch",
    "uf": "auf", "us": "aus", "kei": "kein, keine", "züri": "Zürich", "dä": "der (dieser)",
    "de": "der", "d": "die", "s": "das", "en": "ein", "e": "eine", "es": "ein (neutral) / es",
    "gseh": "gesehen", "chunnsch": "kommst du", "lueg": "schau!", "los": "hör zu!",
    "mueter": "Mutter", "vatter": "Vater", "spiil": "Spiel", "iichaufe": "einkaufen",
    "wii": "Wein", "miin": "mein", "ziit": "Zeit", "gschänk": "Geschenk", "aabig": "Abend", "strass": "Strasse", "meitli": "Mädchen",
    "höi": "Heu", "föif": "fünf", "nöii": "neue"
  };

  const LEXICON = new Map();
  const clean = (t) => t.toLowerCase().replace(/[.,!?;:"']/g, "").replace(/\s+/g, " ").trim();
  function addToLexicon(zd, hd, source) {
    zd.split("/").map(clean).filter(Boolean)
      .forEach((key) => { if (!LEXICON.has(key)) LEXICON.set(key, { hd, source }); });
  }
  VOCAB.forEach((v) => addToLexicon(v.zd, v.hd, "vocab"));
  QUIZ.filter((q) => !q.zd.includes(" ")).forEach((q) => addToLexicon(q.zd, q.hd[0], "rules:" + q.rules.join(",")));
  Object.entries(EXTRA_WORDS).forEach(([zd, hd]) => addToLexicon(zd, hd, "small"));
  RULES.forEach((r) => r.examples.forEach(([hd, zd]) => addToLexicon(zd, hd, "rules:" + r.id)));

  // The same word list the other way round: Hochdeutsch → Züritüütsch.
  const LEXICON_HD = new Map();
  const firstVariant = (zd) => zd.split(" / ")[0].trim();
  function addToLexiconHd(hd, zd, source) {
    hd.replace(/\s*\(.*?\)/g, "").split(/ \/ |, /).map(clean).filter(Boolean)
      .forEach((key) => { if (!LEXICON_HD.has(key)) LEXICON_HD.set(key, { zd: firstVariant(zd), source }); });
  }
  RULES.forEach((r) => r.examples.forEach(([hd, zd]) => addToLexiconHd(hd, zd, "rules:" + r.id)));
  QUIZ.filter((q) => !q.zd.includes(" ")).forEach((q) => q.hd.forEach((hd) => addToLexiconHd(hd, q.zd, "rules:" + q.rules.join(","))));
  VOCAB.forEach((v) => addToLexiconHd(v.hd, v.zd, "vocab"));
  Object.entries(EXTRA_WORDS).forEach(([zd, hd]) => addToLexiconHd(hd, zd, "small"));

  // Forward rules: a best guess at how a Hochdeutsch word sounds in Zurich.
  const FORWARD = [
    { id: "ge", apply: (w) => w.length >= 6 && w !== "gegen" && /^ge[bcdfhklmnpqrstvwxz]/.test(w) && /(t|en)$/.test(w) ? "g" + w.slice(2) : null },
    { id: "k", apply: (w) => /^g?k/.test(w) ? w.replace(/^(g?)k/, "$1ch") : null },
    { id: "ung", apply: (w) => /.{2,}ung(en)?$/.test(w) ? w.replace(/ung(en)?$/, (m, pl) => pl ? "ige" : "ig") : null },
    { id: "li", apply: (w, noun) => /lein$/.test(w) || (noun && /.{2,}chen$/.test(w)) ? w.replace(/(lein|chen)$/, "li") : null },
    { id: "ei", apply: (w) => w.includes("ei") ? w.replace(/ei/g, "ii") : null },
    { id: "au", apply: (w) => w.includes("au") ? w.replace(/au/g, "uu") : null },
    { id: "eu", apply: (w) => /eu|äu/.test(w) ? w.replace(/eu|äu/g, "üü") : null },
    { id: "ue", apply: (w) => /uh|(?<!u)u[bdgfs]e|^[^aeiouäöü]*ut$/.test(w) ? w.replace(/uh/g, "ue").replace(/(?<!u)u([bdgfs])e/g, "ue$1e").replace(/ut$/, "uet") : null },
    { id: "ueh", apply: (w) => /üh|ü[bdgs]e/.test(w) ? w.replace(/üh/g, "üe").replace(/ü([bdgs])e/g, "üe$1e") : null },
    { id: "st", apply: (w) => /.st/.test(w) ? w.replace(/(.)st/g, (m, c) => c === "s" ? m : c + "scht") : null },
    { id: "en", apply: (w) => w.length >= 4 && /[^e]en$/.test(w) ? w.slice(0, -1) : null }
  ];

  function encode(input) {
    const raw = input.trim();
    const key = clean(raw).replace(/ß/g, "ss");
    if (!key) return null;
    if (LEXICON_HD.has(key)) {
      const hit = LEXICON_HD.get(key);
      return { type: "known", input: raw, out: matchCase(raw, hit.zd), source: hit.source };
    }
    const noun = raw[0] !== raw[0].toLowerCase();
    let word = key;
    const steps = [];
    FORWARD.forEach((rule) => {
      const next = rule.apply(word, noun);
      if (next && next !== word) { steps.push({ id: rule.id }); word = next; }
    });
    return { type: steps.length ? "guess" : "none", input: raw, out: matchCase(raw, word), steps };
  }

  // Reverse rules, applied in order. Each returns the new word, or null if it doesn't apply.
  const REVERSE = [
    { id: "ge", apply: (w) => /^g[bcdfhjkmnpqstvwxz]/.test(w) ? "ge" + w.slice(1) : null },
    { id: "k", apply: (w) => /^ch[aeiouäöülr]/.test(w) ? "k" + w.slice(2) : null },
    { id: "st", apply: (w) => w.includes("scht") && !w.startsWith("scht") ? w.replace(/scht/g, "st") : null },
    { id: "ei", apply: (w) => w.includes("ii") ? w.replace(/ii/g, "ei") : null },
    { id: "au", apply: (w) => w.includes("uu") ? w.replace(/uu/g, "au") : null },
    { id: "eu", apply: (w) => w.includes("üü") ? w.replace(/üü/g, "eu") : null, alt: (w) => w.replace(/eu/g, "äu") },
    { id: "ueh", apply: (w) => w.includes("üe") ? w.replace(/üe/g, "ü") : null },
    { id: "ue", apply: (w) => /(^|[^q])ue/.test(w) ? w.replace(/([^q]|^)ue/g, "$1u") : null },
    { id: "ung", apply: (w) => w.length >= 5 && /ig$/.test(w) ? w.replace(/ig$/, "ung") : null },
    { id: "li", apply: (w) => w.length >= 5 && /li$/.test(w) ? w.replace(/li$/, "chen") : null },
    { id: "ae", apply: (w) => /(^|[^ä])ä(?!ä)/.test(w) ? w.replace(/(^|[^ä])ä(?!ä)/g, "$1e") : null },
    { id: "en", apply: (w) => w.length >= 4 && /[^e]e$/.test(w) ? w + "n" : null }
  ];

  function matchCase(original, word) {
    const first = original[0];
    return first === first.toUpperCase() && first !== first.toLowerCase()
      ? word[0].toUpperCase() + word.slice(1)
      : word;
  }

  function decode(input) {
    const raw = input.trim();
    const key = clean(raw);
    if (!key) return null;
    if (LEXICON.has(key)) {
      const hit = LEXICON.get(key);
      return { type: "known", input: raw, out: hit.hd, source: hit.source };
    }
    let word = key;
    const steps = [];
    let altWord = null;
    REVERSE.forEach((rule, idx) => {
      const next = rule.apply(word);
      if (next && next !== word) {
        steps.push({ id: rule.id, before: word, after: next });
        if (rule.alt) altWord = { word: rule.alt(next), from: idx };
        word = next;
      }
    });
    let alt = null;
    if (altWord) {
      let a = altWord.word;
      REVERSE.slice(altWord.from + 1).forEach((rule) => { const n = rule.apply(a); if (n) a = n; });
      if (a !== word) alt = matchCase(raw, a);
    }
    return { type: steps.length ? "guess" : "none", input: raw, out: matchCase(raw, word), alt, steps };
  }

  function showResult(result, opts) {
    const flaps = $("#board-flaps");
    const foot = $("#board-foot");
    const status = $("#board-status");
    foot.innerHTML = "";
    status.className = "board-status";
    const fwd = decoderDir === "hd2zd";

    if (result.type === "known") {
      const target = flapText(result.out);
      if (result.input.length > MAX_FLAPS || target.length > MAX_FLAPS) {
        // Whole phrases are too long for the board: show them as a line of text instead.
        flaps._run = (flaps._run || 0) + 1;
        flaps.style.removeProperty("--n");
        flaps.removeAttribute("role");
        flaps.removeAttribute("aria-label");
        flaps.innerHTML = "";
        flaps.append(el("p", { class: "board-text", text: result.out }));
      } else {
        flapTo(flaps, result.input, target, opts);
      }
      status.textContent = "Word list";
      status.classList.add("is-known");
      if (result.source.startsWith("rules:")) {
        result.source.slice(6).split(",").filter(Boolean).forEach((id) => foot.append(ruleChip(id, fwd)));
      } else if (result.source === "vocab") {
        foot.append(el("p", { text: "No rule explains this one, so it's on the flashcards." }));
      } else {
        foot.append(el("p", { text: result.input + " = " + result.out }));
      }
    } else if (result.type === "guess") {
      const fits = result.out.length <= MAX_FLAPS && result.input.length <= MAX_FLAPS;
      flapTo(flaps, result.input, fits ? result.out : result.input, opts);
      status.textContent = "Best guess";
      status.classList.add("is-guess");
      result.steps.forEach((s) => foot.append(ruleChip(s.id, fwd)));
      if (!fits) foot.append(el("p", { text: result.out }));
      foot.append(el("p", { text: fwd
        ? "The rules don't fit every word (zwei stays zwei, Baum stays Baum), so treat this as a guess."
        : (result.alt ? "Or: " + result.alt + ". " : "") + "Rules run backwards, so it's a guess." }));
    } else {
      flapTo(flaps, result.input.slice(0, MAX_FLAPS), result.input.slice(0, MAX_FLAPS), opts);
      status.textContent = "No rule fits";
      foot.append(el("p", { text: fwd
        ? "None of the sound shifts applies. It may sound almost the same in Züritüütsch, or it's a word with its own dialect form."
        : "None of the sound shifts applies. It's a word to learn by heart, or it's spelled the same in Standard German." }));
    }
  }

  // The board plays examples on its own until the visitor takes over.
  const DEMO = [["Ziitig", "Zeitung", ["ei", "ung"]], ["Huus", "Haus", ["au"]], ["Chuchi", "Küche", ["k"]], ["Lüüt", "Leute", ["eu"]], ["Brueder", "Bruder", ["ue"]], ["gmacht", "gemacht", ["ge"]], ["Fescht", "Fest", ["st"]]];
  const demo = {
    i: 0, timer: null, stopped: false,
    show() {
      const [zd, hd, rules] = DEMO[this.i % DEMO.length];
      const fwd = decoderDir === "hd2zd";
      flapTo($("#board-flaps"), fwd ? hd : zd, fwd ? zd : hd);
      const status = $("#board-status");
      status.className = "board-status";
      status.textContent = "Example " + (this.i % DEMO.length + 1) + "/" + DEMO.length;
      const foot = $("#board-foot");
      foot.innerHTML = "";
      rules.forEach((id) => foot.append(ruleChip(id, fwd)));
      this.i++;
    },
    resume() {
      if (this.stopped || this.timer) return;
      if (reduceMotion) { if (this.i === 0) this.show(); return; }
      if (this.i === 0) this.show();
      this.timer = setInterval(() => { if (!document.hidden) this.show(); }, 3600);
    },
    pause() { clearInterval(this.timer); this.timer = null; },
    stop() { this.stopped = true; this.pause(); }
  };

  /* --------------------------------------------------------------- Start */

  // A small board on the start page that keeps flipping through examples.
  const startLoop = {
    i: 0, timer: null,
    show() {
      const [zd, hd] = DEMO[this.i % DEMO.length];
      flapTo($("#start-flaps"), zd, hd);
      this.i++;
    },
    resume() {
      if (this.timer) return;
      if (this.i === 0) this.show();
      if (reduceMotion) return;
      this.timer = setInterval(() => { if (!document.hidden) this.show(); }, 3200);
    },
    pause() { clearInterval(this.timer); this.timer = null; }
  };

  /* --------------------------------------------------------------- Story */

  // Turns *word* into italics without ever inserting raw HTML.
  function richText(node, text) {
    text.split("*").forEach((part, i) => {
      if (!part) return;
      node.append(i % 2 ? el("em", { text: part }) : document.createTextNode(part));
    });
    return node;
  }

  function openStory(item, open) {
    const btn = item.querySelector(".story-q");
    const panel = item.querySelector(".story-a");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
    item.classList.toggle("is-open", open);
    syncStoryToggle();
  }

  function syncStoryToggle() {
    const all = $$("#story-list > li");
    const allOpen = all.length && all.every((li) => li.classList.contains("is-open"));
    const t = $("#story-toggle-all");
    if (t) t.textContent = allOpen ? "Close all" : "Open all";
  }

  function renderStory() {
    const list = $("#story-list");
    STORY.forEach((s, i) => {
      const n = String(i + 1).padStart(2, "0");
      const id = "story-" + (i + 1);
      const btn = el("button", { type: "button", class: "story-q", "aria-expanded": "false", "aria-controls": id + "-a" });
      btn.append(el("span", { class: "story-num", text: n }), richText(el("span", { class: "story-title" }), s.title), ticket());
      const panel = el("div", { class: "story-a", id: id + "-a", role: "region", "aria-labelledby": id + "-q" });
      btn.id = id + "-q";
      panel.hidden = true;
      s.text.forEach((t) => panel.append(richText(el("p"), t)));
      const src = el("p", { class: "story-src" });
      src.append(el("span", { class: "story-src-label", text: "Sources" }));
      s.sources.forEach(([label, url], k) => {
        if (k) src.append(document.createTextNode(" · "));
        src.append(el("a", { href: url, target: "_blank", rel: "noopener", text: label }));
      });
      panel.append(src);
      const li = el("li", { id });
      li.append(el("h3", {}, [btn]), panel);
      btn.addEventListener("click", () => openStory(li, btn.getAttribute("aria-expanded") !== "true"));
      list.append(li);
    });
    $("#story-toggle-all").addEventListener("click", () => {
      const all = $$("#story-list > li");
      const open = !all.every((li) => li.classList.contains("is-open"));
      all.forEach((li) => openStory(li, open));
    });
  }

  let decoderDir = "zd2hd";
  const DIRS = {
    zd2hd: { from: "Züri", to: "Hochdeutsch", label: "Type a word you heard", placeholder: "e.g. Ziitig, Chuchi, Hüüser",
      examples: ["Gschänk", "Chrüüz", "Buuch", "schmöcke", "Wurscht", "Hüüsli"], run: decode },
    hd2zd: { from: "Hochdeutsch", to: "Züri", label: "Type a Hochdeutsch word", placeholder: "e.g. Zeitung, Küche, Häuser",
      examples: ["Geschenk", "Kreuz", "Bauch", "schmecken", "Wurst", "Häuschen"], run: encode }
  };

  function initDecoder() {
    const form = $("#decoder-form");
    const input = $("#decoder-input");
    const examples = $("#decoder-examples");
    const run = (word) => { const r = DIRS[decoderDir].run(word); if (r) { demo.stop(); showResult(r); } };
    form.addEventListener("submit", (e) => { e.preventDefault(); run(input.value); });
    input.addEventListener("focus", () => demo.pause());
    input.addEventListener("blur", () => { if (!input.value) demo.resume(); });

    function setDir(dir) {
      decoderDir = dir;
      const d = DIRS[dir];
      $("#dir-toggle").setAttribute("aria-label", "Direction: " + d.from + " to " + d.to + ". Click to switch.");
      $("#dir-toggle").title = "Switch direction";
      $("#board-from").textContent = d.from;
      $("#board-to").textContent = d.to;
      $("#decoder-label").textContent = d.label;
      input.placeholder = d.placeholder;
      examples.innerHTML = "";
      d.examples.forEach((w) => examples.append(el("button", {
        class: "chip", type: "button", text: w,
        onclick: () => { input.value = w; run(w); }
      })));
      store.set("zd-dir", dir);
      input.value = "";
      demo.stopped = false; demo.pause(); demo.i = 0;
      if (currentView === "decode") demo.resume();
    }
    $("#dir-toggle").addEventListener("click", () => setDir(decoderDir === "zd2hd" ? "hd2zd" : "zd2hd"));
    setDir(store.get("zd-dir", "zd2hd") === "hd2zd" ? "hd2zd" : "zd2hd");
    $("#vocab-count").textContent = VOCAB.length;
  }

  /* ---------------------------------------------------------- Levels */

  const SWAP_SVG = '<svg class="swap" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 5h10.5M10 2l3 3-3 3M14 11H3.5M6 8l-3 3 3 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // Three little bars, filled 1, 2 or 3 times: the level at a glance.
  function pips(lvl) {
    return el("span", { class: "pips", "aria-hidden": "true" }, [el("i"), el("i"), el("i")]);
  }
  function levelBadge(lvl) {
    return el("span", { class: "lvl-badge lvl-" + lvl, title: "Level: " + LEVELS[lvl].name }, [pips(lvl), el("span", { text: LEVELS[lvl].name })]);
  }

  // A row of level buttons. counts(level) gives the number shown on each button.
  function levelBar(container, opts) {
    container.innerHTML = "";
    const keys = (opts.all ? ["all"] : []).concat(["1", "2", "3"]);
    keys.forEach((k) => {
      const lvl = k === "all" ? null : Number(k);
      const btn = el("button", { type: "button", class: "level-btn" + (lvl ? " lvl-" + lvl : " lvl-all"), "data-lvl": k, "aria-pressed": String(k) === String(opts.current) ? "true" : "false" }, [
        el("span", { class: "level-top" }, [lvl ? pips(lvl) : el("span", { class: "pips pips-all", "aria-hidden": "true" }, [el("i"), el("i"), el("i")]), el("span", { class: "level-name", text: lvl ? LEVELS[lvl].name : "All levels" })]),
        el("span", { class: "level-count", text: opts.counts(lvl) + " " + opts.unit })
      ]);
      btn.addEventListener("click", () => {
        $$(".level-btn", container).forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
        opts.onChange(k);
      });
      container.append(btn);
    });
  }
  const levelText = (k) => k === "all" ? "Everything, from easy to impossible." : LEVELS[k].text;

  /* ---------------------------------------------------------- Words (flashcards and list) */

  const cards = {
    level: store.get("zd-level", "all"),
    filter: "all",
    mode: store.get("zd-mode", "cards"),
    direction: "zd2hd",
    queue: [],
    current: null,
    known: new Set(store.get("zd-known", [])),
    flipped: false
  };

  const inLevel = (v) => cards.level === "all" || v.lvl === Number(cards.level);
  const deck = () => VOCAB.filter((v) => inLevel(v) && (cards.filter === "all" || v.cat === cards.filter));

  function renderTopics() {
    const filters = $("#card-filters");
    filters.innerHTML = "";
    const pool = VOCAB.filter(inLevel);
    if (cards.filter !== "all" && !pool.some((v) => v.cat === cards.filter)) cards.filter = "all";
    [["all", "All topics"]].concat(Object.entries(CATEGORIES)).forEach(([id, label]) => {
      const n = id === "all" ? pool.length : pool.filter((v) => v.cat === id).length;
      if (!n) return;
      filters.append(el("button", {
        class: "chip" + (id === "false-friends" ? " chip-false" : ""), type: "button", "aria-pressed": id === cards.filter ? "true" : "false",
        onclick: (e) => {
          cards.filter = id;
          $$(".chip", filters).forEach((b) => b.setAttribute("aria-pressed", b === e.currentTarget ? "true" : "false"));
          refreshWords();
        }
      }, [document.createTextNode(label + " "), el("span", { class: "chip-count", text: String(n) })]));
    });
  }

  function refreshWords() {
    $("#word-level-desc").textContent = levelText(cards.level);
    $("#cards-mode").hidden = cards.mode !== "cards";
    $("#list-mode").hidden = cards.mode !== "list";
    $("#card-direction").hidden = cards.mode !== "cards";
    $$(".seg [data-mode]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.mode === cards.mode ? "true" : "false"));
    if (cards.mode === "cards") buildQueue(); else renderList();
  }

  function renderList() {
    const wrap = $("#word-list");
    wrap.innerHTML = "";
    const words = deck();
    Object.entries(CATEGORIES).forEach(([id, label]) => {
      const group = words.filter((v) => v.cat === id);
      if (!group.length) return;
      const ul = el("ul", { class: "word-rows" });
      group.forEach((v) => {
        const li = el("li", { class: cards.known.has(v.zd) ? "is-known" : "" }, [
          el("span", { class: "w-zd", text: v.zd }),
          el("span", { class: "w-hd", text: v.hd }),
          levelBadge(v.lvl)
        ]);
        const extra = [v.note, v.ex].filter(Boolean).join(" · ");
        if (extra) li.append(el("span", { class: "w-extra", text: extra }));
        ul.append(li);
      });
      wrap.append(el("section", { class: "word-group" + (id === "false-friends" ? " is-false" : "") }, [
        el("h3", null, [document.createTextNode(label + " "), el("span", { class: "chip-count", text: String(group.length) })]),
        ul
      ]));
    });
  }

  function buildQueue() {
    cards.queue = shuffle(deck().filter((v) => !cards.known.has(v.zd)));
    nextCard();
  }

  function nextCard() {
    cards.current = cards.queue.shift() || null;
    cards.flipped = false;
    renderCard();
  }

  function renderCard() {
    const card = $("#flashcard");
    const front = $("#card-front");
    const back = $("#card-back");
    card.classList.toggle("is-flipped", cards.flipped);
    front.innerHTML = "";
    back.innerHTML = "";
    const total = deck().length;
    const learned = deck().filter((v) => cards.known.has(v.zd)).length;
    $("#card-progress").textContent = learned + " of " + total + " learned";

    const c = cards.current;
    const knownBtn = $("#card-known");
    const againBtn = $("#card-again");
    if (!c) {
      knownBtn.disabled = againBtn.disabled = true;
      front.append(
        el("span", { class: "card-cat", text: "All done" }),
        el("span", { class: "card-word", text: "Super gmacht!" }),
        el("span", { class: "card-hint", text: "You know every card in this set. Click to start it again." })
      );
      card.setAttribute("aria-label", "All cards learned. Activate to start again.");
      return;
    }
    knownBtn.disabled = againBtn.disabled = false;
    const zdFirst = cards.direction === "zd2hd";
    const frontText = zdFirst ? c.zd : c.hd;
    const backText = zdFirst ? c.hd : c.zd;
    const catClass = "card-cat" + (c.cat === "false-friends" ? " is-false-friend" : "");
    front.append(
      el("span", { class: "card-corner" }, [levelBadge(c.lvl)]),
      el("span", { class: catClass, text: CATEGORIES[c.cat] }),
      el("span", { class: "card-word", text: frontText }),
      el("span", { class: "card-hint", text: zdFirst ? "What does it mean?" : "How do you say it in Züritüütsch?" })
    );
    back.append(
      el("span", { class: "card-cat", text: zdFirst ? "Hochdeutsch" : "Züritüütsch" }),
      el("span", { class: "card-word", text: backText })
    );
    if (c.note) back.append(el("span", { class: "card-extra", text: c.note }));
    if (c.ex) back.append(el("span", { class: "card-extra", text: c.ex }));
    card.setAttribute("aria-label", cards.flipped ? "Answer: " + backText : "Card: " + frontText + ". Activate to flip.");
  }

  function flip() {
    if (!cards.current) {
      deck().forEach((v) => cards.known.delete(v.zd));
      store.set("zd-known", Array.from(cards.known));
      buildQueue();
      return;
    }
    cards.flipped = !cards.flipped;
    renderCard();
  }

  function markKnown() {
    if (!cards.current) return;
    cards.known.add(cards.current.zd);
    store.set("zd-known", Array.from(cards.known));
    nextCard();
  }

  function markAgain() {
    if (!cards.current) return;
    cards.queue.push(cards.current);
    nextCard();
  }

  function setCardDirection() {
    const zdFirst = cards.direction === "zd2hd";
    const btn = $("#card-direction");
    btn.innerHTML = "";
    btn.append(
      el("span", { text: zdFirst ? "Züri" : "Hochdeutsch" }),
      tram(),
      el("span", { text: zdFirst ? "Hochdeutsch" : "Züri" })
    );
    const t = document.createElement("template"); t.innerHTML = SWAP_SVG; btn.append(t.content.firstChild);
    btn.setAttribute("aria-label", "Card direction: " + (zdFirst ? "Züri to Hochdeutsch" : "Hochdeutsch to Züri") + ". Click to switch.");
    btn.title = "Switch direction";
  }

  function initCards() {
    if (!["all", "1", "2", "3"].includes(String(cards.level))) cards.level = "all";
    if (!["cards", "list"].includes(cards.mode)) cards.mode = "cards";
    levelBar($("#word-levels"), {
      all: true, current: cards.level, unit: "words",
      counts: (lvl) => VOCAB.filter((v) => !lvl || v.lvl === lvl).length,
      onChange: (k) => { cards.level = k; store.set("zd-level", k); renderTopics(); refreshWords(); }
    });
    $$(".seg [data-mode]").forEach((b) => b.addEventListener("click", () => {
      cards.mode = b.dataset.mode; store.set("zd-mode", cards.mode); refreshWords();
    }));
    setCardDirection();
    $("#card-direction").addEventListener("click", () => {
      cards.direction = cards.direction === "zd2hd" ? "hd2zd" : "zd2hd";
      setCardDirection();
      cards.flipped = false;
      renderCard();
    });

    $("#flashcard").addEventListener("click", flip);
    $("#card-known").addEventListener("click", markKnown);
    $("#card-again").addEventListener("click", markAgain);
    $("#card-reset").addEventListener("click", () => {
      cards.known.clear();
      store.set("zd-known", []);
      buildQueue();
    });

    document.addEventListener("keydown", (e) => {
      if (currentView !== "cards" || cards.mode !== "cards" || e.target.closest("input, textarea, select")) return;
      if (e.key === " " && !e.target.closest("button")) { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); markKnown(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); markAgain(); }
    });

    renderTopics();
    refreshWords();
  }

  /* ---------------------------------------------------------------- Quiz */

  const quiz = { level: "1", items: [], index: 0, right: 0, answered: 0, done: false };

  function normalize(s) {
    return s.toLowerCase()
      .replace(/ß/g, "ss")
      .replace(/[.,!?;:"'«»„“”‘’()-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function startQuiz(level) {
    quiz.level = level;
    quiz.items = shuffle(QUIZ.filter((q) => q.lvl === Number(level)));
    $("#quiz-level-desc").textContent = { 1: "Single words, one sound rule each.", 2: "Words with two rules, and short sentences.", 3: "Full sentences at real-life speed, with slang and traps." }[level];
    quiz.index = 0;
    quiz.right = 0;
    quiz.answered = 0;
    showQuestion();
  }

  function updateScore() {
    $("#quiz-score").textContent = quiz.answered ? "Score " + quiz.right + " / " + quiz.answered : "";
    $("#quiz-count").textContent = Math.min(quiz.index + 1, quiz.items.length) + " / " + quiz.items.length;
  }

  function showQuestion() {
    quiz.done = false;
    $("#quiz-prompt").textContent = quiz.items[quiz.index].zd;
    $("#quiz-feedback").innerHTML = "";
    const input = $("#quiz-input");
    input.value = "";
    input.disabled = false;
    $("#quiz-submit").textContent = "Check";
    $("#quiz-submit").disabled = false;
    updateScore();
  }

  function rulesList(item) {
    if (!item.rules.length) return el("p", { text: "No sound rule here: these are flashcard words." });
    return el("ul", { class: "fb-rules" }, item.rules.map((id) => el("li", null, [
      el("a", { class: "rule-no", href: "#rule-" + id, text: ruleNo(id) }),
      el("strong", { text: shortShift(id) }),
      el("span", { text: ruleById[id].reverse })
    ])));
  }

  function nextQuestion() {
    quiz.index++;
    if (quiz.index >= quiz.items.length) {
      $("#quiz-prompt").textContent = "Fertig! " + quiz.right + " / " + quiz.items.length;
      $("#quiz-input").disabled = true;
      $("#quiz-submit").disabled = true;
      const fb = $("#quiz-feedback");
      fb.innerHTML = "";
      fb.append(el("div", { class: "fb-actions" }, [
        el("button", { class: "btn btn-primary", type: "button", text: "Play again", onclick: () => startQuiz(quiz.level) })
      ]));
      updateScore();
      return;
    }
    showQuestion();
    $("#quiz-input").focus();
  }

  function check(e) {
    e.preventDefault();
    if (quiz.done) { nextQuestion(); return; }
    const item = quiz.items[quiz.index];
    const answer = $("#quiz-input").value;
    const ok = item.hd.some((h) => normalize(h) === normalize(answer));
    quiz.done = true;
    quiz.answered++;
    if (ok) quiz.right++;
    $("#quiz-input").disabled = true;
    $("#quiz-submit").textContent = "Next →";

    const fb = $("#quiz-feedback");
    fb.innerHTML = "";
    const box = el("div", { class: "fb " + (ok ? "fb-ok" : "fb-miss") }, [
      el("p", { class: "fb-title", text: ok ? "Genau! That's right." : (answer.trim() ? "Not quite." : "Here's the answer.") })
    ]);
    if (!item.zd.includes(" ") && item.hd[0].length <= MAX_FLAPS) {
      const flaps = el("div", { class: "flaps" });
      box.append(el("div", { class: "fb-board" }, [flaps]));
      flapTo(flaps, item.zd, item.hd[0]);
    } else {
      box.append(el("p", { class: "fb-answer", text: item.hd[0] }));
    }
    box.append(rulesList(item));
    if (!ok && answer.trim()) {
      box.append(el("div", { class: "fb-actions" }, [
        el("button", {
          class: "btn btn-ghost btn-sm", type: "button", text: "I meant that, count it",
          onclick: (ev) => { quiz.right++; updateScore(); ev.currentTarget.remove(); $("#quiz-submit").focus(); }
        })
      ]));
    }
    fb.append(box);
    updateScore();
    $("#quiz-submit").focus();
  }

  function initQuiz() {
    $("#quiz-form").addEventListener("submit", check);
    levelBar($("#quiz-levels"), {
      all: false, current: "1", unit: "questions",
      counts: (lvl) => QUIZ.filter((q) => q.lvl === lvl).length,
      onChange: (k) => startQuiz(k)
    });
    startQuiz("1");
  }

  /* ---------------------------------------------------------------- Plan */

  function renderPlan() {
    const list = $("#plan-list");
    PLAN.forEach((p) => {
      list.append(el("li", null, [
        el("span", { class: "when", text: p.when }),
        el("h3", { text: p.title }),
        el("p", { text: p.text }),
        el("ul", null, p.items.map((t) => el("li", { text: t })))
      ]));
    });
    $("#habit-text").textContent = HABIT;
  }

  /* ---------------------------------------------------------------- Init */

  renderRules();
  initDecoder();
  initCards();
  initQuiz();
  renderPlan();
  renderStory();
  if (typeof REPO_URL === "string") $("#repo-link").href = REPO_URL;
  window.addEventListener("hashchange", route);
  route();
})();

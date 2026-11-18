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
    (children || []).forEach((c) => { if (c !== null && c !== undefined) node.append(c); });
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

  /* ----------------------------------------------------------- Counting */

  // Anonymous visit counting with GoatCounter (no cookies, no personal data).
  // Page views: one per tab. Events: decoder lookups (only the kind of result, never the word),
  // clicks on outside links, and the vote on the "whole messages" idea.
  // One GoatCounter site can serve all of Cemre's GitHub Pages projects, so every path starts
  // with this repo's folder (/zueri-tuetsch/...).
  const BASE = location.pathname.replace(/index\.html$/, "").replace(/\/?$/, "/");
  const SLUG = BASE.split("/").filter(Boolean).pop() || "site";
  const stats = {
    queue: [], ready: false,
    init() {
      if (typeof GOATCOUNTER_CODE !== "string" || !GOATCOUNTER_CODE) return;
      window.goatcounter = { no_onload: true };
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://gc.zgo.at/count.js";
      s.dataset.goatcounter = "https://" + GOATCOUNTER_CODE + ".goatcounter.com/count";
      s.onload = () => { this.ready = true; this.queue.splice(0).forEach((v) => this.send(v)); };
      document.head.append(s);
      this.on = true;
    },
    send(v) {
      if (!this.on) return;
      if (!this.ready || !window.goatcounter || !window.goatcounter.count) { this.queue.push(v); return; }
      try { window.goatcounter.count(v); } catch (e) { /* counting must never break the app */ }
    },
    page(path, title) { this.send({ path: BASE + path, title: title }); },
    event(name, title) { this.send({ path: SLUG + "/" + name, title: title, event: true }); }
  };
  stats.init();

  // Clicks on outside links (Plan sources, GitHub, the feedback form) count as events.
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href^='http']");
    if (!a || a.hostname === location.hostname) return;
    stats.event("out/" + a.hostname.replace(/^www\./, ""), a.textContent.trim().slice(0, 80) || a.hostname);
  });

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

  const VIEWS = ["start", "decode", "rules", "cards", "quiz", "worksheets", "plan", "story"];
  let currentView = null;
  let lastHash = null;

  function route() {
    const hash = decodeURIComponent(location.hash.slice(1));
    let view = VIEWS.includes(hash) ? hash : "start";
    let target = null;
    if (hash.startsWith("rule-")) { view = "rules"; target = document.getElementById(hash); }
    if (hash.startsWith("story-")) { view = "story"; target = document.getElementById(hash); if (target) openStory(target, true); }
    if (hash.startsWith("ws-")) view = "worksheets";
    if (view === "worksheets") showWorksheet(hash.startsWith("ws-") ? hash.slice(3) : null);

    const changed = view !== currentView || (view === "worksheets" && hash !== lastHash);
    lastHash = hash;
    currentView = view;
    $$(".view").forEach((s) => { s.hidden = s.dataset.view !== view; });
    $$(".tabs a").forEach((a) => {
      if (a.dataset.view === view) {
        a.setAttribute("aria-current", "page");
        if (a.parentElement.scrollWidth > a.parentElement.clientWidth) a.scrollIntoView({ block: "nearest", inline: "center" });
      }
      else a.removeAttribute("aria-current");
    });
    const label = { start: "Start", story: "Story", decode: "Decode", rules: "Rules", cards: "Vocabulary", quiz: "Quiz", worksheets: "Worksheets", plan: "Listening and reading plan" }[view];
    document.title = view === "start" ? "Züritüütsch · A guide to Zurich German" : label + " · Züritüütsch";

    if (changed) stats.page(view === "start" ? "" : view === "worksheets" && hash.startsWith("ws-") ? "worksheets/" + hash.slice(3) : view, document.title);

    if (target) target.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    else if (changed) window.scrollTo(0, 0);

    if (view === "decode") demo.resume(); else demo.pause();
    if (view === "start") startLoop.resume(); else startLoop.pause();
    if (WALL_VIEWS.includes(view)) wall.show(view); else wall.hide();
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

  // Background for the practice pages: a wall of faint split-flap tiles.
  // Now and then one flips to a new letter and lights up.
  const WALL_VIEWS = ["decode", "cards", "quiz", "worksheets"];
  const wall = {
    letters: "ZÜRIZIITHUUSCHINDLÜÜTGUETIIUUÜÜSCHTÄCH",
    boxes: { band: null, page: null }, tiles: [], timer: null,
    // Decode: tiles in its big blue band. Vocabulary, Quiz, Worksheets: tiles in the blue header band,
    // plus pale tiles fixed behind the white part of the page, like the map elsewhere.
    mount(view) {
      const bandEl = view === "decode" ? $("#view-decode .band") : $("#view-" + view + " .band-wall");
      this.place("band", bandEl, "flap-wall");
      if (view === "decode") this.hideBox("page");
      else this.place("page", $("main"), "flap-wall is-fixed on-white");
      this.rebuild();
    },
    place(name, parent, cls) {
      let box = this.boxes[name];
      if (!box) box = this.boxes[name] = el("div", { "aria-hidden": "true" });
      if (box.parentElement !== parent) { parent.prepend(box); box.dataset.built = ""; }
      box.className = cls;
      box.hidden = false;
    },
    hideBox(name) { if (this.boxes[name]) this.boxes[name].hidden = true; },
    rebuild() {
      this.tiles = [];
      Object.values(this.boxes).forEach((box) => { if (box && !box.hidden) this.build(box); });
    },
    build(box) {
      const narrow = window.matchMedia("(max-width: 820px)").matches;
      const tw = narrow ? 44 : 54, th = narrow ? 58 : 70;
      const fixed = box.classList.contains("is-fixed");
      const w = Math.max(window.innerWidth, box.parentElement.offsetWidth);
      const h = fixed ? window.innerHeight : Math.max(box.parentElement.offsetHeight, 120);
      const cols = Math.ceil(w / tw) + 1, rows = Math.ceil(h / th) + 1;
      const key = cols + "x" + rows;
      if (box.dataset.built !== key) {
        box.dataset.built = key;
        box.style.setProperty("--cols", cols);
        box.innerHTML = "";
        for (let i = 0; i < cols * rows; i++) {
          const t = el("span", { class: "wall-tile" });
          if (Math.random() < 0.35) t.textContent = this.pick();
          if (Math.random() < 0.035) t.classList.add("is-lit");
          box.append(t);
        }
      }
      this.tiles.push(...box.children);
    },
    pick() { return this.letters[Math.floor(Math.random() * this.letters.length)]; },
    tick() {
      if (document.hidden || !this.tiles.length) return;
      const t = this.tiles[Math.floor(Math.random() * this.tiles.length)];
      t.classList.remove("is-ticking"); void t.offsetWidth; t.classList.add("is-ticking");
      t.textContent = this.pick();
      t.classList.add("is-lit");
      setTimeout(() => t.classList.remove("is-lit"), 2600);
    },
    show(view) {
      document.body.dataset.bg = "wall";
      this.mount(view);
      if (this.timer || reduceMotion) return;
      this.timer = setInterval(() => this.tick(), 700);
    },
    hide() {
      document.body.dataset.bg = "map";
      this.hideBox("band"); this.hideBox("page");
      clearInterval(this.timer); this.timer = null;
    }
  };
  let wallResize = null;
  window.addEventListener("resize", () => { clearTimeout(wallResize); wallResize = setTimeout(() => { if (WALL_VIEWS.includes(currentView)) wall.rebuild(); }, 200); });

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
    // Counted: direction, typed or example, and the kind of result. Never the word itself.
    const RESULT_NAMES = { known: "word list", guess: "best guess", none: "no rule fits" };
    const run = (word, how) => {
      const r = DIRS[decoderDir].run(word);
      if (!r) return;
      demo.stop(); showResult(r);
      const d = DIRS[decoderDir];
      stats.event("decode/" + decoderDir + "/" + how + "/" + r.type,
        "Decode " + d.from + " → " + d.to + " · " + how + " · " + RESULT_NAMES[r.type]);
    };
    form.addEventListener("submit", (e) => { e.preventDefault(); run(input.value, "typed"); });
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
        onclick: () => { input.value = w; run(w, "example"); }
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

  /* ------------------------------------------------------- Next stop vote */

  // A one-click vote on the next feature. The vote is counted once per browser,
  // and the visitor can leave a note in the feedback form if one is set in data.js.
  function initNextStop() {
    const ask = $("#next-stop-ask");
    const thanks = $("#next-stop-thanks");
    const formUrl = typeof FEEDBACK_FORM_URL === "string" ? FEEDBACK_FORM_URL.trim() : "";

    function showThanks(vote) {
      ask.hidden = true;
      thanks.hidden = false;
      thanks.innerHTML = "";
      thanks.append(el("strong", { text: "Merci vilmal! " }),
        document.createTextNode(vote === "yes" ? "Your vote is counted. " : "Good to know, your vote is counted. "));
      if (formUrl) {
        const sep = formUrl.includes("?") ? "&" : "?";
        thanks.append(el("a", {
          href: formUrl + sep + "vote=" + vote, target: "_blank", rel: "noopener",
          text: vote === "yes" ? "Tell me what you'd paste, or get a note when it's ready" : "Tell me what would help you instead"
        }));
      }
    }

    $$("#next-stop [data-vote]").forEach((btn) => btn.addEventListener("click", () => {
      const vote = btn.dataset.vote;
      if (!store.get("zd-next-stop", null)) stats.event("next-stop/whole-message/" + vote, "Next stop: whole-message decoder · " + (vote === "yes" ? "Yes, I'd use it" : "Not really"));
      store.set("zd-next-stop", vote);
      showThanks(vote);
      // The buttons disappear, so keep keyboard focus in the same place.
      thanks.setAttribute("tabindex", "-1");
      thanks.focus({ preventScroll: true });
    }));

    const saved = store.get("zd-next-stop", null);
    if (saved === "yes" || saved === "no") showThanks(saved);
  }

  /* ---------------------------------------------------------- Levels */

  const SWAP_SVG = '<svg class="swap" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 5h10.5M10 2l3 3-3 3M14 11H3.5M6 8l-3 3 3 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // Three little bars, filled 1, 2 or 3 times: the level at a glance.
  function pips(lvl) {
    return el("span", { class: "pips", "aria-hidden": "true" }, [el("i"), el("i"), el("i")]);
  }
  function levelBadge(lvl) {
    return el("span", { class: "lvl-badge lvl-" + lvl, title: "Level: " + LEVELS[lvl].name + " (" + LEVELS[lvl].plain.toLowerCase() + ")" }, [pips(lvl), el("span", { text: LEVELS[lvl].name })]);
  }

  // A row of level buttons. counts(level) gives the number shown on each button.
  function levelBar(container, opts) {
    container.innerHTML = "";
    const keys = (opts.all ? ["all"] : []).concat(["1", "2", "3"]);
    keys.forEach((k) => {
      const lvl = k === "all" ? null : Number(k);
      const btn = el("button", { type: "button", class: "level-btn" + (lvl ? " lvl-" + lvl : " lvl-all"), "data-lvl": k, "aria-pressed": String(k) === String(opts.current) ? "true" : "false" }, [
        el("span", { class: "level-top" }, [lvl ? pips(lvl) : el("span", { class: "pips pips-all", "aria-hidden": "true" }, [el("i"), el("i"), el("i")]), el("span", { class: "level-name", text: lvl ? LEVELS[lvl].name : "All levels" })]),
        el("span", { class: "level-sub" }, [
          el("span", { class: "level-plain", text: lvl ? LEVELS[lvl].plain : "All" }),
          el("span", { class: "level-count", text: " · " + opts.counts(lvl) + " " + opts.unit })
        ])
      ]);
      btn.addEventListener("click", () => {
        $$(".level-btn", container).forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
        opts.onChange(k);
      });
      container.append(btn);
    });
  }
  const levelText = (k) => k === "all" ? "Everything, from Kurzstrecke to Alle Zonen." : LEVELS[k].text;

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

  const KINDS = { listen: "Listen", watch: "Watch", read: "Read", go: "Go out" };
  const plan = { kind: "all", free: false };

  function sourceCard(id) {
    const src = SOURCES[id];
    const free = /^free/i.test(src.cost);
    const card = el("li", { class: "src src-" + src.kind, "data-kind": src.kind, "data-free": free ? "1" : "0" }, [
      el("div", { class: "src-top" }, [
        el("span", { class: "src-kind", text: KINDS[src.kind] }),
        levelBadge(src.lvl)
      ]),
      el("h4", null, [el("a", { href: src.url, target: "_blank", rel: "noopener", text: src.name })]),
      el("p", { class: "src-what", text: src.what }),
      el("p", { class: "src-meta" }, [
        el("span", { text: src.cost }),
        el("span", { text: src.where === "online" ? "Online" : "In Zurich / offline" }),
        el("span", { class: src.dialect.startsWith("Zurich") ? "is-zurich" : "", text: src.dialect })
      ])
    ]);
    if (src.tip) card.append(el("p", { class: "src-tip", text: src.tip }));
    return card;
  }

  function filterPlan() {
    $$("#plan-list .src").forEach((c) => {
      c.hidden = (plan.kind !== "all" && c.dataset.kind !== plan.kind) || (plan.free && c.dataset.free !== "1");
    });
    $$("#plan-list > li").forEach((stage) => {
      const any = $$(".src", stage).some((c) => !c.hidden);
      $(".src-empty", stage).hidden = any;
    });
  }

  function renderPlan() {
    const list = $("#plan-list");
    PLAN.forEach((p, i) => {
      list.append(el("li", { class: "stage" }, [
        el("div", { class: "stage-head" }, [
          el("span", { class: "stage-no", "aria-hidden": "true", text: String(i + 1) }),
          el("div", null, [
            el("p", { class: "when" }, [document.createTextNode(p.when + " "), levelBadge(p.lvl)]),
            el("h3", { text: p.title }),
            el("p", { class: "stage-text", text: p.text })
          ])
        ]),
        el("ul", { class: "src-grid" }, p.sources.map(sourceCard)),
        el("p", { class: "src-empty", hidden: "", text: "Nothing of this kind in this stage." })
      ]));
    });
    $$("#plan-list .src-empty").forEach((e) => { e.hidden = true; });

    const filters = $("#plan-filters");
    [["all", "All sources"]].concat(Object.entries(KINDS)).forEach(([k, label]) => {
      filters.append(el("button", {
        class: "chip", type: "button", text: label, "aria-pressed": k === "all" ? "true" : "false",
        onclick: (e) => {
          plan.kind = k;
          $$(".chip", filters).forEach((b) => b.setAttribute("aria-pressed", b === e.currentTarget ? "true" : "false"));
          filterPlan();
        }
      }));
    });
    $("#plan-free").addEventListener("click", (e) => {
      plan.free = !plan.free;
      e.currentTarget.setAttribute("aria-pressed", String(plan.free));
      filterPlan();
    });
    $("#habit-text").textContent = HABIT;
    $("#plan-checked").textContent = "All sources were last checked in " + PLAN_CHECKED + ". Links and schedules change, so check the source before you go.";
  }

  /* ---------------------------------------------------------- Worksheets */

  const wsStore = (id) => ({
    get: () => store.get("zd-ws-" + id, {}),
    set: (v) => store.set("zd-ws-" + id, v)
  });

  function renderWorksheetList() {
    const list = $("#ws-list");
    list.innerHTML = "";
    WORKSHEETS.forEach((w) => {
      list.append(el("a", { class: "ws-card", href: "#ws-" + w.id }, [
        el("span", { class: "ws-card-top" }, [levelBadge(w.lvl), el("span", { class: "ws-min", text: "about " + w.minutes + " min" })]),
        el("span", { class: "ws-card-title", text: w.title }),
        el("span", { class: "ws-card-sub", text: w.subtitle + " · " + w.sections.length + " exercises" }),
        el("span", { class: "ws-card-go", text: "Open worksheet" })
      ]));
    });
    list.append(el("div", { class: "ws-card ws-card-soon" }, [
      el("span", { class: "ws-card-title", text: "More worksheets are on the way" }),
      el("span", { class: "ws-card-sub", text: "Written by a learner, for learners. Spotted something a Zurich speaker would say differently? Corrections are welcome." })
    ]));
  }

  const same = (a, b) => normalize(a) === normalize(b);

  function showWorksheet(id) {
    const sheet = WORKSHEETS.find((w) => w.id === id);
    $("#ws-index").hidden = !!sheet;
    $("#ws-sheet").hidden = !sheet;
    if (sheet) renderWorksheet(sheet);
  }

  function renderWorksheet(w) {
    const root = $("#ws-sheet");
    root.innerHTML = "";
    const saved = wsStore(w.id);
    const state = saved.get();
    const save = (key, val) => { state[key] = val; saved.set(state); };

    // Header
    root.append(
      el("a", { class: "ws-back no-print", href: "#worksheets", text: "← All worksheets" }),
      el("header", { class: "ws-head" }, [
        el("p", { class: "ws-kicker" }, [levelBadge(w.lvl), el("span", { text: "Worksheet · about " + w.minutes + " min" })]),
        el("h2", { text: w.title }),
        el("p", { class: "ws-sub", text: w.subtitle }),
        w.proofread
          ? el("p", { class: "ws-proof is-done", text: "Proofread by " + w.proofread })
          : el("p", { class: "ws-proof is-pending" }, [
              document.createTextNode("Written by a learner, for learners: "),
              el("a", { href: REPO_URL + "/issues/new?title=" + encodeURIComponent("Correction: " + w.title), target: "_blank", rel: "noopener", text: "corrections welcome" })
            ]),
        el("div", { class: "ws-actions no-print" }, [
          el("label", { class: "ws-key-opt" }, [el("input", { type: "checkbox", id: "ws-key" }), document.createTextNode(" Print with answer key")]),
          el("button", { class: "btn btn-primary btn-sm", type: "button", text: "Print / Save as PDF", onclick: () => {
            root.classList.toggle("print-key", $("#ws-key").checked);
            window.print();
          } }),
          el("button", { class: "btn btn-ghost btn-sm", type: "button", text: "Clear my answers", onclick: () => { saved.set({}); renderWorksheet(w); } })
        ])
      ])
    );

    // Text
    const textBox = el("section", { class: "ws-text" }, [
      el("h3", { text: "Read" }),
      ...w.text.map((t) => el("p", { text: t }))
    ]);
    const trans = el("div", { class: "ws-trans", hidden: "" }, w.translation.map((t) => el("p", { text: t })));
    const transBtn = el("button", { class: "link-btn no-print", type: "button", text: "Show the Hochdeutsch version" });
    transBtn.addEventListener("click", () => {
      trans.hidden = !trans.hidden;
      transBtn.textContent = trans.hidden ? "Show the Hochdeutsch version" : "Hide the Hochdeutsch version";
    });
    textBox.append(transBtn, trans);
    root.append(textBox);

    const key = el("section", { class: "ws-key" }, [el("h3", { text: "Answer key" })]);

    w.sections.forEach((sec, si) => {
      const box = el("section", { class: "ws-sec ws-" + sec.type }, [
        el("h3", null, [el("span", { class: "ws-no", text: String(si + 1) }), document.createTextNode(sec.title)]),
        el("p", { class: "ws-intro", text: sec.intro })
      ]);
      const checks = [];
      const keyList = el("ol");
      const sk = (n) => si + "-" + n;

      if (sec.type === "choice") {
        sec.items.forEach((it, n) => {
          const name = "ws-" + w.id + "-" + sk(n);
          const fs = el("fieldset", { class: "ws-q" }, [el("legend", { text: (n + 1) + ". " + it.q })]);
          it.options.forEach((o, k) => {
            const input = el("input", { type: "radio", name, value: String(k) });
            if (state[sk(n)] === k) input.checked = true;
            input.addEventListener("change", () => save(sk(n), k));
            fs.append(el("label", { class: "ws-opt" }, [input, el("span", { text: o })]));
          });
          box.append(fs);
          checks.push(() => {
            const picked = $("input:checked", fs);
            const ok = picked && Number(picked.value) === it.answer;
            $$(".ws-opt", fs).forEach((l, k) => {
              l.classList.toggle("is-right", k === it.answer);
              l.classList.toggle("is-wrong", !!picked && k === Number(picked.value) && !ok);
            });
            return ok;
          });
          keyList.append(el("li", { text: it.options[it.answer] }));
        });
      }

      if (sec.type === "decode" || sec.type === "match" || sec.type === "gaps") {
        if (sec.type === "gaps") box.append(el("p", { class: "ws-bank" }, [el("span", { text: "Word bank: " }), ...sec.bank.map((b) => el("span", { class: "ws-chip", text: b }))]));
        const rows = el("ol", { class: "ws-rows" });
        sec.items.forEach((it, n) => {
          let field;
          if (sec.type === "match") {
            field = el("select", { "aria-label": "Meaning of " + it.zd }, [el("option", { value: "", text: "Choose…" }), ...sec.options.map((o) => el("option", { value: o, text: o }))]);
            if (state[sk(n)]) field.value = state[sk(n)];
            field.addEventListener("change", () => save(sk(n), field.value));
          } else {
            field = el("input", { type: "text", spellcheck: "false", autocapitalize: "off", "aria-label": sec.type === "decode" ? "Hochdeutsch for " + it.zd : "Gap " + (n + 1) });
            if (state[sk(n)]) field.value = state[sk(n)];
            field.addEventListener("input", () => save(sk(n), field.value));
          }
          const fb = el("span", { class: "ws-fb", "aria-live": "polite" });
          let row;
          if (sec.type === "gaps") {
            const [before, after] = it.text.split("___");
            row = el("li", { class: "ws-row ws-gap" }, [el("span", { text: before }), field, el("span", { text: after }), fb]);
          } else {
            row = el("li", { class: "ws-row" }, [el("span", { class: "ws-zd", text: it.zd }), el("span", { class: "ws-arrow", "aria-hidden": "true" }, [tram()]), field, fb]);
          }
          rows.append(row);
          const answers = sec.type === "match" ? [it.answer] : (sec.type === "gaps" ? it.answer : it.hd);
          checks.push(() => {
            const ok = answers.some((a) => same(a, field.value));
            row.classList.toggle("is-right", ok);
            row.classList.toggle("is-wrong", !ok);
            fb.innerHTML = "";
            fb.append(el("span", { class: "ws-mark " + (ok ? "is-ok" : "is-miss"), text: ok ? "✓" : "✗ " + answers[0] }));
            if (sec.type === "decode") fb.append(it.rule ? ruleChip(it.rule, false) : el("span", { class: "ws-norule", text: "no rule: learn it" }));
            return ok;
          });
          keyList.append(el("li", { text: (sec.type === "gaps" ? it.text.replace("___", answers[0]) : it.zd + " = " + answers[0]) + (it.rule ? " (rule " + ruleNo(it.rule) + ")" : "") }));
        });
        box.append(rows);
      }

      if (sec.type === "listen") {
        box.append(el("p", { class: "ws-source" }, [document.createTextNode("Source: "), el("a", { href: sec.source.url, target: "_blank", rel: "noopener", text: sec.source.name })]));
        const notes = el("ol", { class: "ws-lines" });
        for (let n = 0; n < sec.lines; n++) {
          const input = el("input", { type: "text", "aria-label": "Word " + (n + 1) + " and its rule" });
          if (state[sk(n)]) input.value = state[sk(n)];
          input.addEventListener("input", () => save(sk(n), input.value));
          notes.append(el("li", null, [input]));
        }
        box.append(notes);
        keyList.append(el("li", { text: "Your own answers." }));
      }

      if (sec.type === "write") {
        const ta = el("textarea", { rows: "5", "aria-label": "Your text" });
        if (state[sk(0)]) ta.value = state[sk(0)];
        ta.addEventListener("input", () => save(sk(0), ta.value));
        const ex = el("p", { class: "ws-example", hidden: "" }, [el("strong", { text: "Example: " }), document.createTextNode(sec.example)]);
        const exBtn = el("button", { class: "link-btn no-print", type: "button", text: "Show an example" });
        exBtn.addEventListener("click", () => { ex.hidden = !ex.hidden; exBtn.textContent = ex.hidden ? "Show an example" : "Hide the example"; });
        box.append(ta, exBtn, ex);
        keyList.append(el("li", { text: "Example: " + sec.example }));
      }

      if (checks.length) {
        const result = el("span", { class: "ws-result", "aria-live": "polite" });
        box.append(el("div", { class: "ws-check no-print" }, [
          el("button", { class: "btn btn-ghost btn-sm", type: "button", text: "Check", onclick: () => {
            const right = checks.map((c) => c()).filter(Boolean).length;
            result.textContent = right + " of " + checks.length + " right" + (right === checks.length ? ". Super gmacht!" : "");
          } }),
          result
        ]));
      }
      key.append(el("h4", { text: (si + 1) + ". " + sec.title }), keyList);
      root.append(box);
    });

    root.append(key);
    root.append(el("p", { class: "ws-foot", text: "Züritüütsch · A guide to Zurich German · cemreozertas.github.io/zueri-tuetsch" }));
  }

  /* ---------------------------------------------------------------- Init */

  renderRules();
  initDecoder();
  initNextStop();
  initCards();
  initQuiz();
  renderPlan();
  const COUNTS = { rules: RULES.length, vocab: VOCAB.length, quiz: QUIZ.length, sources: Object.keys(SOURCES).length, story: STORY.length,
    worksheets: WORKSHEETS.length + (WORKSHEETS.length === 1 ? " worksheet" : " worksheets") };
  $$("[data-count]").forEach((n) => { n.textContent = COUNTS[n.dataset.count]; });
  renderWorksheetList();
  renderStory();
  if (typeof REPO_URL === "string") $("#repo-link").href = REPO_URL;
  window.addEventListener("hashchange", route);
  route();
})();

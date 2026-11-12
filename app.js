/*
 * Züri-Tüütsch Decoder: app logic
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

  const VIEWS = ["decode", "rules", "cards", "quiz", "plan"];
  let currentView = null;

  function route() {
    const hash = decodeURIComponent(location.hash.slice(1));
    let view = VIEWS.includes(hash) ? hash : "decode";
    let target = null;
    if (hash.startsWith("rule-")) { view = "rules"; target = document.getElementById(hash); }

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
    const label = { decode: "Decode", rules: "Rules", cards: "Flashcards", quiz: "Quiz", plan: "Listening plan" }[view];
    document.title = view === "decode" ? "Züri-Tüütsch Decoder" : label + " · Züri-Tüütsch Decoder";

    if (target) target.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    else if (changed) window.scrollTo(0, 0);

    if (view === "decode") demo.resume(); else demo.pause();
  }

  /* --------------------------------------------------------------- Rules */

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
          el("span", { class: "arrow", "aria-label": "becomes", text: "→" }),
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

  function ruleChip(id) {
    return el("a", { class: "rule-chip", href: "#rule-" + id }, [
      el("span", { class: "rule-no", text: ruleNo(id) }),
      document.createTextNode(shortShift(id))
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
    "wii": "Wein", "miin": "mein", "ziit": "Zeit"
  };

  const LEXICON = new Map();
  const clean = (t) => t.toLowerCase().replace(/[.,!?;:"']/g, "").replace(/\s+/g, " ").trim();
  function addToLexicon(zd, hd, source) {
    zd.split("/").map(clean).filter(Boolean)
      .forEach((key) => { if (!LEXICON.has(key)) LEXICON.set(key, { hd, source }); });
  }
  VOCAB.forEach((v) => addToLexicon(v.zd, v.hd, "vocab"));
  QUIZ.words.forEach((q) => addToLexicon(q.zd, q.hd[0], "rules:" + q.rules.join(",")));
  Object.entries(EXTRA_WORDS).forEach(([zd, hd]) => addToLexicon(zd, hd, "small"));

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
      return { type: "known", input: raw, hd: hit.hd, source: hit.source };
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
    return { type: steps.length ? "guess" : "none", input: raw, guess: matchCase(raw, word), alt, steps };
  }

  function showResult(result, opts) {
    const flaps = $("#board-flaps");
    const foot = $("#board-foot");
    const status = $("#board-status");
    foot.innerHTML = "";
    status.className = "board-status";

    if (result.type === "known") {
      const target = flapText(result.hd);
      if (result.input.length > MAX_FLAPS || target.length > MAX_FLAPS) {
        // Whole phrases are too long for the board: show them as a line of text instead.
        flaps._run = (flaps._run || 0) + 1;
        flaps.style.removeProperty("--n");
        flaps.removeAttribute("role");
        flaps.removeAttribute("aria-label");
        flaps.innerHTML = "";
        flaps.append(el("p", { class: "board-text", text: result.hd }));
      } else {
        flapTo(flaps, result.input, target, opts);
      }
      status.textContent = "Word list";
      status.classList.add("is-known");
      if (result.source.startsWith("rules:")) {
        result.source.slice(6).split(",").filter(Boolean).forEach((id) => foot.append(ruleChip(id)));
      } else if (result.source === "vocab") {
        foot.append(el("p", { text: "No rule explains this one, so it's on the flashcards." }));
      } else {
        foot.append(el("p", { text: result.input + " = " + result.hd }));
      }
    } else if (result.type === "guess") {
      const fits = result.guess.length <= MAX_FLAPS && result.input.length <= MAX_FLAPS;
      flapTo(flaps, result.input, fits ? result.guess : result.input, opts);
      status.textContent = "Best guess";
      status.classList.add("is-guess");
      result.steps.forEach((s) => foot.append(ruleChip(s.id)));
      foot.append(el("p", { text: (result.alt ? "Or: " + result.alt + ". " : "") + "Rules run backwards, so it's a guess." }));
    } else {
      flapTo(flaps, result.input.slice(0, MAX_FLAPS), result.input.slice(0, MAX_FLAPS), opts);
      status.textContent = "No rule fits";
      foot.append(el("p", { text: "None of the sound shifts applies. It's a word to learn by heart, or it's spelled the same in Standard German." }));
    }
  }

  // The board plays examples on its own until the visitor takes over.
  const DEMO = [["Ziitig", "Zeitung", ["ei", "ung"]], ["Huus", "Haus", ["au"]], ["Chuchi", "Küche", ["k"]], ["Lüüt", "Leute", ["eu"]], ["Brueder", "Bruder", ["ue"]], ["gmacht", "gemacht", ["ge"]], ["Fescht", "Fest", ["st"]]];
  const demo = {
    i: 0, timer: null, stopped: false,
    show() {
      const [zd, hd, rules] = DEMO[this.i % DEMO.length];
      flapTo($("#board-flaps"), zd, hd);
      const status = $("#board-status");
      status.className = "board-status";
      status.textContent = "Example " + (this.i % DEMO.length + 1) + "/" + DEMO.length;
      const foot = $("#board-foot");
      foot.innerHTML = "";
      rules.forEach((id) => foot.append(ruleChip(id)));
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

  function initDecoder() {
    const form = $("#decoder-form");
    const input = $("#decoder-input");
    const run = (word) => { const r = decode(word); if (r) { demo.stop(); showResult(r); } };
    form.addEventListener("submit", (e) => { e.preventDefault(); run(input.value); });
    input.addEventListener("focus", () => demo.pause());
    input.addEventListener("blur", () => { if (!input.value) demo.resume(); });
    const examples = $("#decoder-examples");
    ["Gschänk", "Chrüüz", "Buuch", "schmöcke", "Wurscht", "Hüüsli"].forEach((w) => {
      examples.append(el("button", {
        class: "chip", type: "button", text: w,
        onclick: () => { input.value = w; run(w); }
      }));
    });
    $("#vocab-count").textContent = VOCAB.length;
  }

  /* ---------------------------------------------------------- Flashcards */

  const cards = {
    filter: "all",
    direction: "zd2hd",
    queue: [],
    current: null,
    known: new Set(store.get("zd-known", [])),
    flipped: false
  };

  const deck = () => VOCAB.filter((v) => cards.filter === "all" || v.cat === cards.filter);

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

  function initCards() {
    const filters = $("#card-filters");
    [["all", "All"]].concat(Object.entries(CATEGORIES)).forEach(([id, label]) => {
      filters.append(el("button", {
        class: "chip", type: "button", text: label, "aria-pressed": id === "all" ? "true" : "false",
        onclick: (e) => {
          cards.filter = id;
          $$(".chip", filters).forEach((b) => b.setAttribute("aria-pressed", b === e.currentTarget ? "true" : "false"));
          buildQueue();
        }
      }));
    });

    const dirBtn = $("#card-direction");
    dirBtn.addEventListener("click", () => {
      cards.direction = cards.direction === "zd2hd" ? "hd2zd" : "zd2hd";
      dirBtn.textContent = cards.direction === "zd2hd" ? "Show: Züri → Hochdeutsch" : "Show: Hochdeutsch → Züri";
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
      if (currentView !== "cards" || e.target.closest("input, textarea, select")) return;
      if (e.key === " " && !e.target.closest("button")) { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); markKnown(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); markAgain(); }
    });

    buildQueue();
  }

  /* ---------------------------------------------------------------- Quiz */

  const quiz = { level: "words", items: [], index: 0, right: 0, answered: 0, done: false };

  function normalize(s) {
    return s.toLowerCase()
      .replace(/ß/g, "ss")
      .replace(/[.,!?;:"'«»„“”‘’()-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function startQuiz(level) {
    quiz.level = level;
    quiz.items = shuffle(QUIZ[level]);
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
    if (quiz.level === "words" && item.hd[0].length <= MAX_FLAPS) {
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
    $$("[data-level]").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$("[data-level]").forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
        startQuiz(btn.dataset.level);
      });
    });
    startQuiz("words");
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
  if (typeof REPO_URL === "string") $("#repo-link").href = REPO_URL;
  window.addEventListener("hashchange", route);
  route();
})();

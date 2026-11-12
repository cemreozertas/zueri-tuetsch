/*
 * Zürichdeutsch Decoder: app logic
 * All content comes from data.js. No libraries, no build step.
 */
(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const ruleById = Object.fromEntries(RULES.map((r) => [r.id, r]));

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
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

  // Browser storage can be unavailable (private mode, some embeds), so never let it break the app.
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    }
  };

  /* ---------------------------------------------------------------- Rules */

  function renderRules() {
    const grid = $("#rules-grid");
    RULES.forEach((r) => {
      const examples = el("ul", { class: "rule-examples" },
        r.examples.map(([hd, zd]) => el("li", null, [
          el("span", { class: "hd", text: hd }),
          el("span", { class: "zd", text: zd })
        ])));
      const card = el("article", { class: "rule", id: "rule-" + r.id }, [
        el("div", { class: "rule-shift" }, [
          document.createTextNode(r.from),
          el("span", { class: "arrow", text: "→", "aria-label": "becomes" }),
          document.createTextNode(r.to)
        ]),
        el("p", { text: r.explain }),
        examples
      ]);
      if (r.caveat) card.append(el("p", { class: "rule-caveat", text: r.caveat }));
      card.append(el("p", { class: "rule-reverse", text: r.reverse }));
      grid.append(card);
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

  /* -------------------------------------------------------------- Decoder */

  // Known words: flashcard vocabulary, quiz words and common small words.
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
  function addToLexicon(zd, hd, source) {
    zd.split("/").map((s) => s.trim().toLowerCase()).filter(Boolean)
      .forEach((key) => { if (!LEXICON.has(key)) LEXICON.set(key, { hd, source }); });
  }
  VOCAB.forEach((v) => addToLexicon(v.zd, v.hd, "vocab"));
  QUIZ.words.forEach((q) => addToLexicon(q.zd, q.hd[0], "rules:" + q.rules.join(",")));
  Object.entries(EXTRA_WORDS).forEach(([zd, hd]) => addToLexicon(zd, hd, "small"));

  // Reverse rules, applied in order. Each returns the new word or null if it doesn't apply.
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
    return original[0] === original[0].toUpperCase() && original[0] !== original[0].toLowerCase()
      ? word[0].toUpperCase() + word.slice(1)
      : word;
  }

  function decode(input) {
    const raw = input.trim();
    const key = raw.toLowerCase();
    if (!key) return null;
    if (LEXICON.has(key)) return { type: "known", input: raw, hd: LEXICON.get(key).hd, source: LEXICON.get(key).source };

    let word = key;
    const steps = [];
    let altWord = null;
    REVERSE.forEach((rule) => {
      const next = rule.apply(word);
      if (next && next !== word) {
        steps.push({ id: rule.id, before: word, after: next });
        if (rule.alt) altWord = rule.alt(next);
        word = next;
      }
    });
    if (altWord) {
      // Re-run the later steps on the alternative so both spellings match.
      let alt = altWord;
      const altIndex = REVERSE.findIndex((r) => r.alt);
      REVERSE.slice(altIndex + 1).forEach((rule) => { const n = rule.apply(alt); if (n) alt = n; });
      altWord = alt;
    }
    return {
      type: steps.length ? "guess" : "none",
      input: raw,
      guess: matchCase(raw, word),
      alt: altWord && altWord !== word ? matchCase(raw, altWord) : null,
      steps
    };
  }

  function renderDecode(result) {
    const out = $("#decoder-result");
    out.innerHTML = "";
    if (!result) return;
    const card = el("div", { class: "result-card" });

    if (result.type === "known") {
      card.append(
        el("span", { class: "result-tag tag-known", text: "In the word list" }),
        el("p", { class: "result-main" }, [
          el("span", { class: "from", text: result.input }),
          el("span", { class: "arrow", text: "→" }),
          document.createTextNode(result.hd)
        ])
      );
      if (result.source.startsWith("rules:")) {
        const ids = result.source.slice(6).split(",").filter(Boolean);
        card.append(el("ul", { class: "result-steps" }, ids.map((id) => el("li", null, [
          el("strong", { text: "Rule: " }),
          el("a", { href: "#rule-" + id, text: ruleById[id].title })
        ]))));
      } else if (result.source === "vocab") {
        card.append(el("p", { class: "result-note", text: "The rules don't explain this one, so it's a flashcard word." }));
      }
    } else if (result.type === "guess") {
      const main = [
        el("span", { class: "from", text: result.input }),
        el("span", { class: "arrow", text: "→" }),
        document.createTextNode(result.guess)
      ];
      if (result.alt) main.push(el("span", { class: "from", text: " or " + result.alt }));
      card.append(
        el("span", { class: "result-tag tag-guess", text: "Best guess" }),
        el("p", { class: "result-main" }, main),
        el("ul", { class: "result-steps" }, result.steps.map((s) => el("li", null, [
          el("strong", { text: s.before + " → " + s.after }),
          document.createTextNode(" · "),
          el("a", { href: "#rule-" + s.id, text: ruleById[s.id].title })
        ]))),
        el("p", { class: "result-note", text: "This is the rules run backwards, so it's a guess. Real words sometimes break the pattern." })
      );
    } else {
      card.append(
        el("span", { class: "result-tag tag-guess", text: "No rule fits" }),
        el("p", { class: "result-main", text: result.input }),
        el("p", { class: "result-note", text: "None of the sound shifts applies. It's probably a word to learn by heart, or it's spelled the same in Standard German." })
      );
    }
    out.append(card);
  }

  function initDecoder() {
    const form = $("#decoder-form");
    const input = $("#decoder-input");
    form.addEventListener("submit", (e) => { e.preventDefault(); renderDecode(decode(input.value)); });
    const examples = $("#decoder-examples");
    ["Ziitig", "Gschänk", "Chrüüz", "Buuch", "schmöcke", "Wurscht"].forEach((w) => {
      examples.append(el("button", {
        class: "chip", type: "button", text: w,
        onclick: () => { input.value = w; renderDecode(decode(w)); }
      }));
    });
  }

  /* ----------------------------------------------------------- Flashcards */

  const cards = {
    filter: "all",
    direction: "zd2hd",
    queue: [],
    current: null,
    known: new Set(store.get("zd-known", [])),
    flipped: false
  };

  function deck() {
    return VOCAB.filter((v) => cards.filter === "all" || v.cat === cards.filter);
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
        el("span", { class: "card-extra", text: "You know every card in this set. Click to start it again." })
      );
      card.setAttribute("aria-label", "All cards learned. Activate to start again.");
      return;
    }
    knownBtn.disabled = againBtn.disabled = false;
    const zdFirst = cards.direction === "zd2hd";
    const frontText = zdFirst ? c.zd : c.hd;
    const backText = zdFirst ? c.hd : c.zd;
    front.append(
      el("span", { class: "card-cat", text: CATEGORIES[c.cat] }),
      el("span", { class: "card-word", text: frontText }),
      el("span", { class: "card-hint", text: zdFirst ? "What does it mean?" : "How do you say it in Züritüütsch?" })
    );
    back.append(
      el("span", { class: "card-cat", text: zdFirst ? "Standard German" : "Zürichdeutsch" }),
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
    const options = [["all", "All"]].concat(Object.entries(CATEGORIES));
    options.forEach(([id, label]) => {
      filters.append(el("button", {
        class: "chip" + (id === "all" ? " is-active" : ""), type: "button", text: label, "data-cat": id,
        "aria-pressed": id === "all" ? "true" : "false",
        onclick: (e) => {
          cards.filter = id;
          filters.querySelectorAll(".chip").forEach((b) => {
            const on = b === e.currentTarget;
            b.classList.toggle("is-active", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
          buildQueue();
        }
      }));
    });

    const dirBtn = $("#card-direction");
    dirBtn.addEventListener("click", () => {
      cards.direction = cards.direction === "zd2hd" ? "hd2zd" : "zd2hd";
      dirBtn.textContent = cards.direction === "zd2hd" ? "Show: Zürich → Standard" : "Show: Standard → Zürich";
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

    // Keyboard shortcuts work while the flashcard section is on screen.
    let cardsVisible = false;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => { cardsVisible = entries[0].isIntersecting; }, { threshold: 0.4 })
        .observe($("#cards"));
    }
    document.addEventListener("keydown", (e) => {
      if (!cardsVisible || e.target.closest("input, textarea")) return;
      if (e.key === " " && e.target.id !== "flashcard") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); markKnown(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); markAgain(); }
    });

    buildQueue();
  }

  /* ----------------------------------------------------------------- Quiz */

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
    $("#quiz-score").textContent = quiz.answered
      ? "Score: " + quiz.right + " / " + quiz.answered
      : quiz.items.length + " items, in random order";
  }

  function showQuestion() {
    quiz.done = false;
    const item = quiz.items[quiz.index];
    $("#quiz-prompt").textContent = item.zd;
    $("#quiz-feedback").innerHTML = "";
    const input = $("#quiz-input");
    input.value = "";
    input.disabled = false;
    $("#quiz-submit").textContent = "Check";
    $("#quiz-submit").disabled = false;
    updateScore();
  }

  function rulesList(item) {
    if (!item.rules.length) {
      return el("p", { class: "fb-rules", text: "No sound rule here: these are flashcard words." });
    }
    return el("ul", { class: "fb-rules" }, item.rules.map((id) => {
      const r = ruleById[id];
      return el("li", null, [
        el("a", { href: "#rule-" + id, text: r.from + " → " + r.to }),
        document.createTextNode(" · " + r.reverse)
      ]);
    }));
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
      el("p", { class: "fb-title", text: ok ? "Genau! That's right." : (answer.trim() ? "Not quite." : "Here's the answer.") }),
      el("p", { text: (ok ? "" : "Answer: ") + item.hd[0] }),
      rulesList(item)
    ]);
    if (!ok && answer.trim()) {
      box.append(el("div", { class: "fb-actions" }, [
        el("button", {
          class: "btn btn-ghost", type: "button", text: "I meant that, count it",
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
    document.querySelectorAll("[data-level]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-level]").forEach((b) => b.classList.toggle("is-active", b === btn));
        startQuiz(btn.dataset.level);
      });
    });
    startQuiz("words");
  }

  /* ----------------------------------------------------------------- Plan */

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

  /* ----------------------------------------------------------------- Init */

  renderRules();
  initDecoder();
  initCards();
  initQuiz();
  renderPlan();
  if (typeof REPO_URL === "string") $("#repo-link").href = REPO_URL;
})();

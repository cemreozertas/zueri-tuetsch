/*
 * Züritüütsch: the German version of the site.
 * ---------------------------------------------
 * The English stays in index.html, data.js and worksheets.js. This file holds the German,
 * and the app swaps it in on the German page (de/index.html), which is built from index.html by tools/make-de.js.
 * Anything that is missing here simply stays English, so a gap never breaks the page.
 *
 *   ui          short texts from app.js, keyed by their English original ({n} = a number or name)
 *   html        texts in index.html, keyed by a CSS selector (innerHTML)
 *   attrs       attributes in index.html (aria-label, placeholder, …)
 *   meta        page title and description
 *   rules, grammar, categories, levels, vocab, sources, plan, habit, story
 *               content from data.js, matched by id (or by position for plan, grammar and story)
 *
 * Zurich German words and the Hochdeutsch answers are the same in both languages and live only in data.js.
 */
const I18N_DE = {
  meta: {
    title: "Züritüütsch · Wegweiser ins Zürichdeutsche",
    description: "Ein Wegweiser ins Zürichdeutsche für alle, die schon Deutsch können: Lautmuster, ein Decoder in beide Richtungen, Karteikarten, ein Quiz, ein Lernplan und die Geschichte hinter dem Dialekt."
  },

  html: {
    ".skip": "Zum Inhalt springen",
    ".brand-name": "Züritüütsch <span>Wegweiser ins Zürichdeutsche</span>",
    ".tabs a[data-view='decode']": "Decoder",
    ".tabs a[data-view='rules']": "Regeln",
    ".tabs a[data-view='cards']": "Wortschatz",
    ".tabs a[data-view='worksheets']": "Arbeitsblätter",
    ".tabs a[data-view='plan']": "Lernplan",
    ".tabs a[data-view='story']": "Geschichte",

    // Start
    "#view-start .kicker": "Für alle, die in und um Zürich Deutsch sprechen",
    "#start-title": "Das meiste kannst du schon. <span>Du hörst es nur noch nicht.</span>",
    "#view-start .lede": "Zürichdeutsch (Züritüütsch) ist keine Spielart des Hochdeutschen, sondern ein enger Verwandter: Beide stammen aus dem mittelalterlichen Deutsch und sind ihre eigenen Wege gegangen. Wer mit Übersetzerohren hinhört, merkt: Die meisten Unterschiede folgen festen Mustern. Diese Seite hilft dir, die Sprache der Stadt zu verstehen und selbst zu sprechen, wenn du schon Deutsch kannst und dich in Zürich auch sprachlich zu Hause fühlen möchtest.",
    "#view-start .start-actions .btn-light": "Zum ganzen Decoder",
    "#start-label": "Probier's aus: Tipp ein Wort, das du gehört hast",
    "#start-form button[type='submit']": "Entschlüsseln",

    // Your first 15 minutes
    "#path-title": "Deine ersten 15 Minuten",
    ".path-stop:nth-child(1) .path-time": "5 Min.",
    ".path-stop:nth-child(1) h2": "Drei Wörter entschlüsseln",
    ".path-stop:nth-child(1) p": "Tipp Wörter ein, die du in der Stadt aufgeschnappt hast, oder wähl ein Beispiel, und sieh zu, wie sie wieder zu Hochdeutsch werden.",
    ".path-stop:nth-child(1) .link-arrow": "Zum Decoder",
    ".path-stop:nth-child(2) .path-time": "5 Min.",
    ".path-stop:nth-child(2) h2": "Die ersten fünf Lautmuster lesen",
    ".path-stop:nth-child(2) p": "<span lang=\"gsw\">Ziit</span>, <span lang=\"gsw\">Huus</span>, <span lang=\"gsw\">Lüüt</span>, <span lang=\"gsw\">Brueder</span>, <span lang=\"gsw\">Füess</span>: fünf Muster, die Hunderte Wörter erschließen.",
    ".path-stop:nth-child(2) .link-arrow": "Zu den Regeln",
    ".path-stop:nth-child(3) .path-time": "5 Min.",
    ".path-stop:nth-child(3) h2": "Eine Quizrunde spielen",
    ".path-stop:nth-child(3) p": "Zehn Wörter auf Stufe Kurzstrecke. Am Ende bekommst du ein Ticket mit deinem Ergebnis, das du teilen kannst.",
    ".path-stop:nth-child(3) .link-arrow": "Zum Quiz",
    "#view-start .start-actions .btn-on-blue": "Zur Geschichte",
    "#view-start .section-label": "Was dich hier erwartet",
    "#view-start .intro-card:nth-child(1) h2": "Lautmuster",
    "#view-start .intro-card:nth-child(1) p": "Viele Laute im Zürichdeutschen entsprechen dem Hochdeutschen nach festen Mustern. Wer sie einmal kennt, kann unzählige Wörter selbst entschlüsseln.",
    "#view-start .intro-card:nth-child(1) .link-arrow": "Zu den Regeln",
    "#view-start .intro-card:nth-child(2) h2": "Wörter und Wendungen zum Lernen",
    "#view-start .intro-card:nth-child(2) p": "Manche Alltagswörter folgen keiner Regel: luege, poschte, Rüebli. Die kommen auf Karteikarten.",
    "#view-start .intro-card:nth-child(2) .link-arrow": "Wortschatz üben",
    "#view-start .intro-card:nth-child(3) h2": "Rückwärts-Quiz",
    "#view-start .intro-card:nth-child(3) p": "Lies das Zürichdeutsche, tipp das Hochdeutsche und schau, welche Regel dir geholfen hat.",
    "#view-start .intro-card:nth-child(3) .link-arrow": "Zum Quiz",
    "#view-start .start-more": "Dazu ein <a href=\"#decode\">Decoder</a> für jedes Wort, das du aufschnappst, ein <a href=\"cheat-sheet-de.pdf\" download>Spickzettel</a> mit allen Lautmustern auf einer Seite zum Ausdrucken, ein <a href=\"#plan\">Lernplan in vier Etappen</a> mit echten Quellen, online und in Zürich, <a href=\"#worksheets\">Arbeitsblätter</a> zum Üben und <a href=\"#story\">die Geschichte</a>, woher das Züritüütsch kommt.",
    "#about-title": "Warum es diese Seite gibt",
    "#view-start .about-note p": "Hinter diesem Wegweiser steht eine mehrsprachige Übersetzerin, die zur Functional Consultant wurde: mit türkischen Wurzeln, einem Berufsleben auf Deutsch und Englisch und einer Faszination, die nie nachgelassen hat. Wie können zwei Sprachen aus denselben Wurzeln wachsen und trotzdem wie zwei Welten klingen? Nach zehn Jahren Studium und Arbeit in Deutschland führte sie ein neues Kapitel nach Zürich, und vom ersten Tag an schnappte sie Wörter auf. Mit dem Blick einer Übersetzerin für Muster und dem Ohr einer Musikerin für Klang merkte sie, wie regelmäßig sich Zürichdeutsch und Hochdeutsch entsprechen, und hörte immer genauer hin. Was ihr dabei geholfen hat, ist hier versammelt: die Lautmuster, die Alltagswörter, Übungen, ein Lernplan und die Geschichte hinter dem Dialekt. Für alle, die Zürichdeutsch schneller verstehen und sprechen wollen.",

    // Decode
    "#view-decode .kicker": "Für alle, die in und um Zürich Deutsch sprechen",
    "#decode-title": "Tipp ein Wort ein, <span>die Anzeigetafel entschlüsselt es.</span>",
    "#decoder-form button[type='submit']": "Entschlüsseln",
    "#board-status": "Beispiel",
    ".next-stop-tag": "Nächster Halt?",
    "#next-stop-title": "Ganze Nachrichten entschlüsseln, nicht nur einzelne Wörter",
    ".next-stop-body > p:not([class])": "Füg einen Chat, eine SMS oder einen Zettel von den Nachbarn ein, etwa <span lang=\"gsw\" class=\"next-stop-sample\">«Häsch morn Ziit? Gömmer go poschte?»</span>, und lass dir jedes Wort erklären, auch die zusammengezogenen wie <span lang=\"gsw\">häsch</span> und <span lang=\"gsw\">gömmer</span>.",
    ".next-stop-q": "Würdest du das nutzen?",
    "#next-stop [data-vote='yes']": "Ja, auf jeden Fall",
    "#next-stop [data-vote='no']": "Eher nicht",

    // Rules
    "#view-rules .kicker": "Muster lernen · <span data-count=\"rules\"></span> Lautmuster",
    "#rules-title": "Die Lautmuster",
    "#view-rules .head-actions": "<a class=\"btn btn-light btn-sm\" href=\"cheat-sheet-de.pdf\" download>Spickzettel herunterladen (PDF)</a>",
    "#view-rules .page-head p:not(.kicker)": "Jede Regel stellt einem hochdeutschen Laut den zürichdeutschen gegenüber, den du an seiner Stelle hörst, mit Beispielen und einem Tipp für den Rückweg. Die Nummer bleibt überall in der App dieselbe.",
    "#view-rules .note": "Die Regeln sind eine Abkürzung zum Lernen, keine Sprachgeschichte: Zürichdeutsch ist nicht aus dem Hochdeutschen entstanden. Beide sind aus dem mittelalterlichen Deutsch gewachsen, und bei den Vokalen hat sich sogar das Hochdeutsche verändert, während das Zürichdeutsche den älteren Klang bewahrt hat. <a href=\"#story-4\">Wie das kam, erzählt die Geschichte.</a>",
    "#view-rules h3.sub": "Grammatik in Kürze",

    // Vocabulary
    "#view-cards .kicker": "Üben · <span data-count=\"vocab\"></span> Wörter und Wendungen",
    "#cards-title": "Wortschatz",
    "#view-cards .page-head p:not(.kicker)": "Die Wörter, die keine Lautregel erklärt, sortiert nach Thema und Schwierigkeit. Üb sie mit Karteikarten oder stöbere in der ganzen Liste.",
    ".seg [data-mode='cards']": "Karteikarten",
    ".seg [data-mode='list']": "Liste",
    "#card-again": "Nochmal <kbd>←</kbd>",
    "#card-known": "Gewusst <kbd>→</kbd>",
    "#cards-mode .small-print": "Klick auf die Karte oder drück die Leertaste, um sie umzudrehen. Dein Fortschritt wird nur in diesem Browser gespeichert. <button class=\"link-btn\" id=\"card-reset\" type=\"button\">Fortschritt zurücksetzen</button>",

    // Quiz
    "#view-quiz .kicker": "Teste dich · <span data-count=\"quiz\"></span> Fragen",
    "#quiz-title": "Zurück ins Hochdeutsche",
    "#view-quiz .page-head p:not(.kicker)": "Lies das Züritüütsch und tipp das Hochdeutsche. Danach siehst du, welche Regel dir geholfen hat.",
    "label[for='quiz-input']": "Deine Antwort auf Hochdeutsch",
    "#quiz-submit": "Prüfen",

    // Plan
    "#view-plan .kicker": "Hören und lesen · <span data-count=\"sources\"></span> Quellen",
    "#plan-title": "Lernplan",
    "#view-plan .page-head p:not(.kicker)": "Ein Plan in Etappen, von kurz und vorhersehbar bis schnell und frei gesprochen, mit echten Quellen online und in Zürich. Jede Karte sagt dir, was du wirklich hörst, denn nicht alles in Schweizer Medien ist Zürichdeutsch.",
    "#plan-free": "Nur kostenlose",
    ".habit-label": "Die Gewohnheit, mit der es hängen bleibt",

    // Worksheets
    "#view-worksheets .kicker": "Lesen und schreiben · <span data-count=\"worksheets\"></span>",
    "#ws-title": "Arbeitsblätter",
    "#view-worksheets .page-head p:not(.kicker)": "Längere Texte mit Übungen: lesen, entschlüsseln, zuordnen, Lücken füllen, dann echtes Zürichdeutsch hören und selbst schreiben. Am Bildschirm oder ausgedruckt, mit Stift in der Hand.",

    // Story
    "#view-story .kicker": "Hintergrund · <span data-count=\"story\"></span> Kapitel",
    "#story-title": "Die Geschichte des Züritüütsch",
    "#view-story .page-head p:not(.kicker)": "Woher der Dialekt kommt, warum er so klingt und warum die Deutschschweiz etwas anderes schreibt, als sie spricht. Die Überschriften erzählen die Kurzfassung, jedes Kapitel öffnet sich für Details und Quellen.",
    "#story-toggle-all": "Alle öffnen",

    // Footer
    ".footer-bio": "<a href=\"https://github.com/cemreozertas\">Cemre</a> ist Tüftlerin aus Leidenschaft und lebt in Zürich. Sie baut Automatisierungen, Vorlagen und Apps für kreative Köpfe, die ein gut organisiertes Leben lieben.",
    ".footer-meta p:first-child": "Für Schweizerdeutsch gibt es keine offizielle Rechtschreibung, im Alltag begegnen dir also auch andere Schreibweisen.",
    ".footer-meta p:last-child": "<a href=\"https://github.com/cemreozertas\">@cemreozertas</a> · <a href=\"https://github.com/\" id=\"repo-link\">Quellcode auf GitHub</a> · MIT-Lizenz<br>Besuche werden anonym mit <a href=\"https://www.goatcounter.com/\">GoatCounter</a> gezählt: ohne Cookies, ohne persönliche Daten.<br>Kartendaten © <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap-Mitwirkende</a><br>Die Stufennamen sind von ZVV-Tickets geborgt. Diese Seite steht in keiner Verbindung zum ZVV."
  },

  attrs: {
    ".brand": { "aria-label": "Züritüütsch, Wegweiser ins Zürichdeutsche: Startseite" },
    ".tabs": { "aria-label": "Bereiche" },
    "#dir-toggle": { "aria-label": "Richtung wechseln" },
    "#decoder-examples": { "aria-label": "Probier ein Beispiel" },
    "#start-input": { "placeholder": "z. B. Ziit, luege, poschte" },
    "#start-examples": { "aria-label": "Probier ein Beispiel" },
    "#word-levels": { "aria-label": "Stufe" },
    "#card-filters": { "aria-label": "Thema" },
    ".seg": { "aria-label": "Ansicht" },
    "#quiz-levels": { "aria-label": "Quiz-Stufe" },
    "#quiz-input": { "placeholder": "Hochdeutsch …" },
    "#plan-filters": { "aria-label": "Quellen anzeigen" },
    "#ws-levels": { "aria-label": "Stufe der Arbeitsblätter" }
  },

  ui: {
    // Page titles
    "Start": "Start",
    "Story": "Geschichte",
    "Decode": "Decoder",
    "Rules": "Regeln",
    "Vocabulary": "Wortschatz",
    "Quiz": "Quiz",
    "Worksheets": "Arbeitsblätter",
    "Learning plan": "Lernplan",
    "Züritüütsch · A guide to Zurich German": "Züritüütsch · Wegweiser ins Zürichdeutsche",

    // Board and decoder
    "{from} becomes {to}": "{from} wird zu {to}",
    "Rule {n}": "Regel {n}",
    "in Züritüütsch:": "auf Züritüütsch:",
    "Word list": "Wortliste",
    "No rule explains this one, so it's on the flashcards.": "Dafür gibt es keine Regel, deshalb steht es auf den Karteikarten.",
    "Best guess": "Beste Vermutung",
    "The rules don't fit every word (zwei stays zwei, Baum stays Baum), so treat this as a guess.": "Die Regeln passen nicht auf jedes Wort (zwei bleibt zwei, Baum bleibt Baum), nimm es also als Vermutung.",
    "Or: {alt}. ": "Oder: {alt}. ",
    "Rules run backwards, so it's a guess.": "Rückwärts angewandt sind die Regeln nur eine Vermutung.",
    "No rule fits": "Keine Regel passt",
    "None of the sound shifts applies. It may sound almost the same in Züritüütsch, or it's a word with its own dialect form.": "Keine Lautregel greift. Vielleicht klingt das Wort auf Züritüütsch fast gleich, oder es hat eine ganz eigene Dialektform.",
    "None of the sound shifts applies. It's a word to learn by heart, or it's spelled the same in Standard German.": "Keine Lautregel greift. Entweder ist es ein Wort zum Auswendiglernen, oder es wird im Hochdeutschen gleich geschrieben.",
    "Example {n}/{total}": "Beispiel {n}/{total}",
    "Example": "Beispiel",
    "Try:": "Probier:",

    // Hear it differently in your Kreis?
    "Hear it differently in your Kreis?": "Hörst du es in deinem Kreis anders?",
    "Zurich German changes from Kreis to Kreis and from family to family. If you'd say a word differently, or a word you hear all the time is missing, ": "Zürichdeutsch klingt von Kreis zu Kreis und von Familie zu Familie anders. Wenn du ein Wort anders sagen würdest oder eines fehlt, das du ständig hörst, ",
    "tell me": "sag es mir",

    // Quiz ticket at the end of a round
    "Fertig!": "Fertig!",
    "Züritüütsch quiz · {level}": "Züritüütsch-Quiz · {level}",
    "Can you hear it?": "Hörst du's?",
    "Copied. Paste it anywhere.": "Kopiert. Füg es ein, wo du willst.",
    "Copy this:": "Kopier das hier:",
    "Copy your result": "Ergebnis kopieren",
    "Share…": "Teilen …",
    "Try {next} →": "Weiter mit {next} →",
    "Züritüütsch · Quiz ticket": "Züritüütsch · Quizticket",
    "{right} of {n} right": "{right} von {n} richtig",
    "Perfect round. Ready for {next}?": "Perfekte Runde. Bereit für {next}?",
    "Perfect round on Alle Zonen. Respect.": "Alle Zonen ohne Fehler. Respekt.",
    "Genau! You're hearing it.": "Genau! Du hörst es schon.",
    "Good ride. A few more rounds and the patterns stick.": "Gute Fahrt. Noch ein paar Runden, dann sitzen die Muster.",
    "Every line starts at the first stop. The rules page helps.": "Jede Linie beginnt an der ersten Haltestelle. Die Regeln helfen dir weiter.",
    "Type a word you heard": "Tipp ein Wort, das du gehört hast",
    "Type a Hochdeutsch word": "Tipp ein hochdeutsches Wort",
    "e.g. Ziitig, Chuchi, Hüüser": "z. B. Ziitig, Chuchi, Hüüser",
    "e.g. Zeitung, Küche, Häuser": "z. B. Zeitung, Küche, Häuser",
    "Direction: {from} to {to}. Click to switch.": "Richtung: {from} nach {to}. Zum Wechseln klicken.",
    "Switch direction": "Richtung wechseln",

    // Next stop vote
    "Your vote is counted. ": "Deine Stimme ist gezählt. ",
    "Good to know, your vote is counted. ": "Gut zu wissen, deine Stimme ist gezählt. ",
    "Tell me what you'd paste, or get a note when it's ready": "Erzähl mir, was du einfügen würdest, oder lass dich benachrichtigen, sobald es so weit ist",
    "Tell me what would help you instead": "Erzähl mir, was dir stattdessen helfen würde",

    // Story
    "Close all": "Alle schließen",
    "Open all": "Alle öffnen",
    "Sources": "Quellen",

    // Levels
    "Level: {name} ({plain})": "Stufe: {name} ({plain})",
    "All levels": "Alle Stufen",
    "All": "Alle",
    "words": "Wörter",
    "questions": "Fragen",
    "sheets": "Blätter",
    "Everything, from Kurzstrecke to Alle Zonen.": "Alles, von Kurzstrecke bis Alle Zonen.",

    // Vocabulary
    "All topics": "Alle Themen",
    "{n} of {total} learned": "{n} von {total} gelernt",
    "All done": "Alles geschafft",
    "You know every card in this set. Click to start it again.": "Du kennst alle Karten dieses Stapels. Klick, um von vorn zu beginnen.",
    "All cards learned. Activate to start again.": "Alle Karten gelernt. Aktivieren, um neu zu beginnen.",
    "What does it mean?": "Was heißt das?",
    "How do you say it in Züritüütsch?": "Wie sagt man das auf Züritüütsch?",
    "Answer: {w}": "Antwort: {w}",
    "Card: {w}. Activate to flip.": "Karte: {w}. Zum Umdrehen aktivieren.",
    "Card direction: {from} to {to}. Click to switch.": "Kartenrichtung: {from} nach {to}. Zum Wechseln klicken.",

    // Quiz
    "Single words, one sound rule each.": "Einzelne Wörter, je eine Lautregel.",
    "Words with two rules, and short sentences.": "Wörter mit zwei Regeln und kurze Sätze.",
    "Full sentences at real-life speed, with slang and traps.": "Ganze Sätze im Alltagstempo, mit Slang und Stolperfallen.",
    "Score {right} / {n}": "Punkte {right} / {n}",
    "Check": "Prüfen",
    "No sound rule here: these are flashcard words.": "Hier hilft keine Lautregel: Das sind Wörter für die Karteikarten.",
    "Play again": "Nochmal spielen",
    "Next →": "Weiter →",
    "Genau! That's right.": "Genau, richtig!",
    "Not quite.": "Nicht ganz.",
    "Here's the answer.": "Hier ist die Lösung.",
    "I meant that, count it": "So war's gemeint, bitte zählen",

    // Plan
    "Listen": "Hören",
    "Watch": "Schauen",
    "Read": "Lesen",
    "Go out": "Hingehen",
    "Online": "Online",
    "In Zurich / offline": "In Zürich / vor Ort",
    "Nothing of this kind in this stage.": "In dieser Etappe gibt es nichts davon.",
    "All sources": "Alle Quellen",
    "All sources were last checked in {date}. Links and schedules change, so check the source before you go.": "Alle Quellen wurden zuletzt im {date} geprüft. Links und Termine ändern sich, also schau vor dem Hingehen noch einmal nach.",

    // Worksheets: index
    "about {m} min": "ca. {m} Min.",
    "{sub} · {n} exercises": "{sub} · {n} Übungen",
    "Open worksheet": "Arbeitsblatt öffnen",
    "Spotted something?": "Etwas entdeckt?",
    "These texts are written by a learner, for learners.": "Diese Texte hat eine Lernende für Lernende geschrieben.",
    "If a Zurich speaker would say something differently, ": "Wenn man in Zürich etwas anders sagen würde, ",
    "corrections are welcome": "freue ich mich über Korrekturen",
    "{n} worksheet": "{n} Arbeitsblatt",
    "{n} worksheets": "{n} Arbeitsblätter",

    // Worksheets: one sheet
    "← All worksheets": "← Alle Arbeitsblätter",
    "Worksheet · about {m} min": "Arbeitsblatt · ca. {m} Min.",
    "Proofread by {name}": "Korrektur gelesen von {name}",
    "Written by a learner, for learners: ": "Von einer Lernenden für Lernende: ",
    "corrections welcome": "Korrekturen willkommen",
    " Print with answer key": " Mit Lösungen drucken",
    "Print / Save as PDF": "Drucken / als PDF speichern",
    "Clear my answers": "Meine Antworten löschen",
    "Show the Hochdeutsch version": "Hochdeutsche Fassung zeigen",
    "Hide the Hochdeutsch version": "Hochdeutsche Fassung ausblenden",
    "Answer key": "Lösungen",
    "Word bank: ": "Wortkasten: ",
    "Meaning of {w}": "Bedeutung von {w}",
    "Choose…": "Auswählen …",
    "Hochdeutsch for {w}": "Hochdeutsch für {w}",
    "Gap {n}": "Lücke {n}",
    "no rule: learn it": "keine Regel: lernen",
    " (rule {n})": " (Regel {n})",
    "Source: ": "Quelle: ",
    "Word {n} and its rule": "Wort {n} und seine Regel",
    "Your own answers.": "Deine eigenen Antworten.",
    "Your text": "Dein Text",
    "Example: ": "Beispiel: ",
    "Show an example": "Beispiel zeigen",
    "Hide the example": "Beispiel ausblenden",
    "{right} of {n} right": "{right} von {n} richtig",
    "Next worksheet": "Nächstes Arbeitsblatt",
    "Next: {title} ": "Weiter: {title} ",
    "Züritüütsch · A guide to Zurich German · cemreozertas.github.io/zurituutsch": "Züritüütsch · Wegweiser ins Zürichdeutsche · cemreozertas.github.io/zurituutsch",

    // Worksheets: section titles and instructions (shared)
    "Did you get it?": "Alles verstanden?",
    "Read the text, then choose the right answer.": "Lies den Text und wähl die richtige Antwort.",
    "Decode the sounds": "Laute entschlüsseln",
    "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. One word follows no rule at all.": "Schreib jedes Wort auf Hochdeutsch. Nach dem Prüfen siehst du, welche Regel geholfen hat. Ein Wort folgt keiner Regel.",
    "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. Two words follow no rule at all.": "Schreib jedes Wort auf Hochdeutsch. Nach dem Prüfen siehst du, welche Regel geholfen hat. Zwei Wörter folgen keiner Regel.",
    "Words to learn by heart": "Wörter zum Auswendiglernen",
    "Pick the Hochdeutsch meaning of each word from the text.": "Wähl für jedes Wort aus dem Text die hochdeutsche Bedeutung.",
    "Fill the gaps": "Lücken füllen",
    "Complete the sentences in Zurich German. The word bank helps.": "Ergänze die Sätze auf Zürichdeutsch. Der Wortkasten hilft dir.",
    "Now with real sound": "Jetzt mit echtem Ton",
    "Your turn": "Jetzt du",

    // Worksheets: subtitles
    "A Saturday in Zurich": "Ein Samstag in Zürich",
    "At the café": "Im Café",
    "My week": "Meine Woche",
    "Moving day": "Umzugstag",
    "A trip up the Uetliberg": "Ein Ausflug auf den Uetliberg",
    "Dinner at a friend's": "Abendessen bei einer Freundin",
    "A phone call with my godfather": "Ein Telefonat mit dem Patenonkel",
    "After work at the pub": "Feierabend in der Kneipe",
    "A mess in the attic": "Chaos auf dem Dachboden",

    // Worksheets: listening and writing tasks
    "Watch one SRF Meteo weather forecast. Note three words you understood and the rule that helped you.": "Schau dir eine Wetterprognose von SRF Meteo an. Notier drei Wörter, die du verstanden hast, und die Regel, die dir geholfen hat.",
    "Describe your own Saturday in three or four sentences of Zurich German, and read them out loud. Use at least two words from this worksheet.": "Beschreib deinen eigenen Samstag in drei oder vier Sätzen auf Zürichdeutsch und lies sie laut vor. Verwende mindestens zwei Wörter von diesem Arbeitsblatt.",
    "Watch one Easy German street interview filmed in Zurich. Write down three greetings or polite phrases you hear.": "Schau dir ein Straßeninterview von Easy German an, das in Zürich gedreht wurde. Schreib drei Grüße oder Höflichkeitsformeln auf, die du hörst.",
    "Order something in a café in Zurich German: greet, order two things, ask for the bill and say goodbye. Read it out loud.": "Bestell auf Zürichdeutsch etwas im Café: grüßen, zwei Dinge bestellen, nach der Rechnung fragen, dich verabschieden. Lies es laut vor.",
    "Listen to one song by Schtärneföifi. Write down the days of the week or other everyday words you catch.": "Hör dir ein Lied von Schtärneföifi an. Schreib die Wochentage oder andere Alltagswörter auf, die du verstehst.",
    "Describe your own week in Zurich German, one sentence per day. Use at least three days of the week.": "Beschreib deine eigene Woche auf Zürichdeutsch, einen Satz pro Tag. Verwende mindestens drei Wochentage.",
    "Listen to one report on the Regionaljournal Zürich Schaffhausen. Write down two place names and one word that ends in -ig, like Wonig.": "Hör dir eine Meldung im Regionaljournal Zürich Schaffhausen an. Schreib zwei Ortsnamen auf und ein Wort, das auf -ig endet, wie Wonig.",
    "Tell the story of a move or a new home in four sentences, in the past tense (gsi, gmacht, cho …).": "Erzähl in vier Sätzen von einem Umzug oder einem neuen Zuhause, in der Vergangenheit (gsi, gmacht, cho …).",
    "Watch a few minutes of SRF bi de Lüt. Write down three words about places or nature, like Bärg, See or Wald, and how they sound.": "Schau ein paar Minuten SRF bi de Lüt. Schreib drei Wörter über Orte oder Natur auf, etwa Bärg, See oder Wald, und wie sie klingen.",
    "Describe a trip you made in Switzerland in four sentences. Use the past tense and at least one of Zmorge, Znüni or Zvieri.": "Beschreib in vier Sätzen einen Ausflug in der Schweiz. Erzähl in der Vergangenheit und verwende mindestens eines dieser Wörter: Zmorge, Znüni oder Zvieri.",
    "Watch the first ten minutes of an episode of Neumatt. Find a scene at the table and write down three words you understood.": "Schau die ersten zehn Minuten einer Folge Neumatt. Such eine Szene am Tisch und schreib drei Wörter auf, die du verstanden hast.",
    "Invite someone to dinner in Zurich German: when, where and what you'll cook. Then write their answer.": "Lade jemanden auf Zürichdeutsch zum Abendessen ein: wann, wo und was du kochst. Schreib dann die Antwort dazu.",
    "Listen to ten minutes of Radio 24. Write down two slang words or exclamations and guess what they mean.": "Hör zehn Minuten Radio 24. Schreib zwei Slangwörter oder Ausrufe auf und rate, was sie bedeuten.",
    "Write a short phone call: ask how someone is, tell them about your week and make a plan. Use at least three words from this worksheet.": "Schreib ein kurzes Telefonat: Frag, wie es jemandem geht, erzähl von deiner Woche und verabredet euch. Verwende mindestens drei Wörter von diesem Arbeitsblatt.",
    "Watch one TalkTäglich discussion on TeleZüri. Write down how the guests agree or disagree, and one phrase you'd like to use yourself.": "Schau eine Diskussion in TalkTäglich auf TeleZüri. Schreib auf, wie die Gäste zustimmen oder widersprechen, und eine Wendung, die du selbst verwenden möchtest.",
    "Write a short after-work scene in Zurich German: who's there, what you order and what you talk about. Use at least two words from this worksheet.": "Schreib eine kurze Feierabend-Szene auf Zürichdeutsch: Wer ist dabei, was bestellt ihr, worüber redet ihr? Verwende mindestens zwei Wörter von diesem Arbeitsblatt.",
    "Listen to one episode of Dini Mundart – Schnabelweid. Write down one word from a region outside Zurich and how it differs from Zurich German.": "Hör dir eine Folge Dini Mundart – Schnabelweid an. Schreib ein Wort aus einer Region außerhalb Zürichs auf und wie es sich vom Zürichdeutschen unterscheidet.",
    "Describe a room at home that's a Puff, in four sentences: what's in it, what you'd throw away and what you'd keep.": "Beschreib in vier Sätzen einen Raum bei dir zu Hause, in dem ein Puff herrscht: was drin ist, was du wegwerfen und was du behalten würdest."
  },

  rules: {
    ei: {
      explain: "Viele Wörter mit ei haben noch das alte lange i, aus dem im Hochdeutschen ei wurde.",
      reverse: "Du hörst ii? Probier's mit ei.",
      caveat: "Nicht jedes ei wandert: zwei, heiß und Fleisch bleiben gleich."
    },
    au: {
      explain: "Dieselbe Geschichte wie bei ei: ein altes langes u, das im Hochdeutschen zu au wurde.",
      reverse: "Du hörst uu (oder ein kurzes u wie in uf, us)? Probier's mit au.",
      caveat: "Manche au-Wörter bleiben au: Baum, kaufen → chaufe."
    },
    eu: {
      explain: "Das Gegenstück mit Umlaut zu au und uu.",
      reverse: "Du hörst üü? Probier's mit eu oder äu.",
      caveat: "Ein paar eu-Wörter gehen eigene Wege: neu heißt nöi, Freude Fröid, Heu Höi."
    },
    ue: {
      from: "u (lang)",
      explain: "Ein gleitendes u-e, wo das Hochdeutsche ein schlichtes langes u hat.",
      reverse: "Du hörst ue? Lass das e weg."
    },
    ueh: {
      from: "ü (lang)",
      explain: "Die Umlaut-Variante von ue. Sie steckt auch in Grüezi (grüßen).",
      reverse: "Du hörst üe? Lass das e weg."
    },
    ie: {
      explain: "Gleich geschrieben, aber du hörst i-e (oft fast i-ä), kein langes i.",
      reverse: "Du hörst i-e oder i-ä? Dann ist es ein ganz normales ie-Wort."
    },
    k: {
      from: "k (am Wortanfang)",
      explain: "Am Wortanfang wird k zum kehligen ch, wie in Bach.",
      reverse: "Du hörst ch am Wortanfang? Probier's mit k.",
      caveat: "Jüngere Lehnwörter behalten ihr k: Kafi (Kaffee), Kiosk, Konto."
    },
    en: {
      explain: "Verben (und viele Nomen) verlieren ihr End-n. Manche kurzen Verben schrumpfen noch mehr.",
      reverse: "Das Wort endet auf e? Wahrscheinlich endet es eigentlich auf -en."
    },
    ge: {
      from: "ge- (Partizip)", to: "g- / gar nichts",
      explain: "Vom ge- im Partizip bleibt nur ein g, oder gar nichts.",
      reverse: "g und ein Konsonant am Wortanfang? Mach ein ge- daraus."
    },
    st: {
      explain: "Im Hochdeutschen sagt man scht nur am Wortanfang. In Zürich überall.",
      reverse: "Du hörst scht in der Wortmitte oder am Ende? Probier's mit st."
    },
    ung: {
      explain: "Eine der leichtesten Verschiebungen, sobald du sie einmal kennst.",
      reverse: "Ein Nomen endet auf -ig? Probier's mit -ung."
    },
    li: {
      explain: "Verkleinert wird immer mit -li, und das hörst du überall.",
      reverse: "Endet auf -li? Denk an -chen."
    },
    ae: {
      from: "e (kurz)",
      explain: "Viele kurze e werden offener gesprochen, fast wie das ä in Männer.",
      reverse: "Du hörst ä, wo es seltsam klingt? Probier's mit e."
    }
  },

  grammar: [
    { title: "Kein Präteritum", text: "Ein Präteritum gibt es nicht, alles steht im Perfekt." },
    { title: "Klein ist -li", text: "Verkleinert wird mit -li, und in der Schweiz passiert das ständig." },
    { title: "mer = wir oder man", text: "Mer kann «wir» heißen oder das unpersönliche «man». Was gemeint ist, verrät der Zusammenhang." },
    { title: "Kurze Artikel", text: "Artikel schrumpfen auf einen einzigen Laut, den man kaum hört." }
  ],

  categories: {
    "greetings": "Grüße und Höflichkeit",
    "phrases": "Nützliche Sätze",
    "small": "Kleine Wörter",
    "verbs": "Verben",
    "feelings": "Gefühle und Eigenschaften",
    "home": "Zuhause und Menschen",
    "city": "Unterwegs",
    "food": "Essen und Trinken",
    "time": "Tage, Zeit und Feiertage",
    "false-friends": "Falsche Freunde"
  },

  levels: {
    1: { plain: "Leicht", text: "Ein kurzer Hüpfer: nah am Hochdeutschen. Mit den Lautregeln errätst du vieles davon." },
    2: { plain: "Schwer", text: "Die ganze Stadt: Alltagswörter ohne Hinweis im Hochdeutschen. Die lernst du auswendig." },
    3: { plain: "Unmöglich", text: "Der ganze Kanton: Stolperfallen, Slang und Alltagstempo. Darüber stolpern sogar Leute, die schon lange hier wohnen." }
  },

  // Matched by the Zurich German word. hd only where the English version has an English note in brackets.
  vocab: {
    "Grüezi": { hd: "Guten Tag (förmlich)" },
    "Grüezi mitenand": { hd: "Guten Tag zusammen (an eine Gruppe)" },
    "Hoi / Sali": { hd: "Hallo (locker)" },
    "Sali zäme": { hd: "Hallo zusammen (locker)" },
    "Adieu": { note: "Betont auf der ersten Silbe: A-dieu." },
    "Exgüsi": { note: "Vom französischen excusez." },
    "Chönd Sie das nomal säge?": { note: "Der nützlichste Satz für diese ganze App." },
    "Gopfertelli!": { note: "Ein milder Fluch, salonfähig." },
    "nöd": { note: "In Bern sagt man nid." },
    "oder?": { note: "Damit endet gefühlt die Hälfte aller Schweizer Sätze." },
    "nöi": { note: "Nicht nüü: eine der Ausnahmen von Regel 03." },
    "Chuchichäschtli": { note: "Das klassische Testwort." },
    "Wöschchuchi": { note: "Die gemeinsame Waschküche, mit Waschplan." },
    "Estrich": { note: "Nicht der Bodenbelag!" },
    "Chabis": { note: "Heißt auch Unsinn: Das isch Chabis!" },
    "föifi": { note: "föif = fünf. Für die Uhrzeit kommt ein -i dazu: am föifi = um fünf." },
    "Ziischtig": { note: "Klingt überhaupt nicht nach Dienstag, also auswendig lernen." },
    "Bärchtelistag": { note: "Der Tag nach Neujahr: in Zürich und vielen anderen Kantonen ein freier Tag." },
    "Peperoni": { note: "Nicht die scharfe Peperoni, die man in Deutschland kennt." },
    "springe": { note: "Nicht «springen»!" },
    "schmöcke": { note: "Nicht «schmecken»!" },
    "laufe": { note: "Nicht «rennen»!" },
    "äxtra": { note: "Nicht «extra» im Sinn von zusätzlich." },
    "Hafe": { note: "Kein Hafen." },
    "Schale": { note: "Keine Schüssel: E Schale ist eine Tasse Milchkaffee." },
    "glatt": { note: "Nicht «glatt» wie eine Oberfläche: Das isch glatt! = Das ist lustig!" }
  },

  planChecked: "November 2026",

  sources: {
    meteo: {
      cost: "Kostenlos", dialect: "Schweizerdeutsch, verschiedene Regionen",
      what: "Die Wetterprognose nach den Abendnachrichten, seit 2005 frei auf Schweizerdeutsch moderiert. Vier Minuten, jeden Tag dieselben Wörter: perfekt fürs erste Hinhören.",
      tip: "Schau dieselbe Prognose zweimal: einmal für den groben Inhalt, einmal für die Wörter."
    },
    easygerman: {
      name: "Easy German: Folgen aus Zürich", cost: "Kostenlos", dialect: "Zürichdeutsch, mit Untertiteln",
      what: "Straßeninterviews mit Untertiteln. Such nach «13 Swiss Words That Germans Don't Understand» (538), «How the Swiss Feel about Standard German» (543) und «Introduce Yourself in Slow Swiss German» (Super Easy German 248)."
    },
    schtaerne: {
      cost: "Kostenlos streamen", dialect: "Zürichdeutsch",
      what: "Eine Zürcher Kinderband, die aus der Punkszene der Stadt hervorging. Seit 2020 stehen sie nicht mehr auf der Bühne, haben aber zehn Alben mit rund 160 Liedern hinterlassen: klares, eher langsames Zürichdeutsch mit viel Humor.",
      tip: "Dazu passt das Buch weiter unten, das die Liedtexte in drei Sprachen abdruckt."
    },
    zhtourism: {
      cost: "Kostenlos", dialect: "Zürichdeutsch",
      what: "Eine kurze Liste mit rund 40 Zürcher Alltagswörtern und ihrer hochdeutschen Bedeutung, von Anke bis Züri-Gschnätzlets."
    },
    kauderwelsch: {
      cost: "Kostenpflichtig (Buch)", dialect: "Schweizerdeutsch im Überblick",
      what: "Ein Sprachführer im Taschenformat von Reise Know-How (Autorin: Christine Eggenberg), der schweizerdeutsche Alltagsausdrücke erklärt. Nicht nur Zürich, aber ein freundlicher Einstieg."
    },
    regionaljournal: {
      cost: "Kostenlos", dialect: "Zürichdeutsch",
      what: "Die täglichen Regionalnachrichten für Zürich und Schaffhausen, um 17.30 Uhr im Radio und als Podcast. Kurz, lokal und über Orte, die du kennst.",
      tip: "Nachrichten wiederholen dieselbe Meldung über den Tag. Hör dir die Morgen- und die Abendversion derselben Meldung an."
    },
    neumatt: {
      cost: "Kostenlos mit Schweizer Adresse", dialect: "Zürichdeutsch",
      what: "Eine Dramaserie über eine Bauernfamilie bei Zürich, gedreht in der Stadt und auf einem Hof in Uster. Drei Staffeln, mit hochdeutschen Untertiteln.",
      tip: "Play Suisse braucht ein kostenloses Konto mit Schweizer Postleitzahl. Auch auf Netflix."
    },
    bideluet: {
      cost: "Kostenlos", dialect: "Schweizerdeutsch, viele Regionen",
      what: "Die SRF-Familienreihe über den Alltag in Schweizer Dörfern und Regionen, etwa «Landfrauenküche» und «Hüttengeschichten». Echte Menschen, echte Dialekte."
    },
    mona: {
      cost: "Kostenlos", dialect: "Thurgauerdeutsch (Moderatorin) und Gäste",
      what: "Reporterin Mona Vetsch lebt drei Tage lang das Leben anderer, von Gassenarbeitern in Zürich bis zur Bergrettung. Viele Folgen auf Play SRF haben Untertitel.",
      tip: "Mona kommt aus dem Thurgau, ihre Vokale klingen etwas anders als in Zürich. Gute Übung, um den Unterschied zu hören."
    },
    dinimundart: {
      name: "Dini Mundart (Podcast von Radio SRF 1)", cost: "Kostenlos", dialect: "Schweizerdeutsch, über Dialekt",
      what: "Das Mundart-Team von SRF erklärt, woher Wörter kommen und wie sich Dialekte verändern, mit Fragen aus dem Publikum. Ein Podcast über genau das, worum es auf dieser Seite geht."
    },
    schtaernebook: {
      cost: "Kostenpflichtig (Buch)", dialect: "Zürichdeutsch",
      what: "Liedtexte von Schtärneföifi in Zürichdeutsch, übersetzt ins Hochdeutsche und ins Englische. Lies mit, während du zuhörst."
    },
    egliwildi: {
      cost: "Kostenpflichtig (Buch und 2 CDs)", dialect: "Zürichdeutsch",
      what: "Ein Lehrbuch von Renate Egli-Wildi (2007, 108 Seiten und zwei Audio-CDs), herausgegeben von der Zürcher Sektion des Vereins für Schweizerdeutsch.",
      tip: "Neu kaum noch zu finden: Frag in der Bibliothek oder such gebraucht."
    },
    gredig: {
      cost: "Kostenlos", dialect: "Schweizerdeutsch, je nach Gast",
      what: "Urs Gredigs Talkshow unter vier Augen, mit Gästen aus Politik, Sport und Kultur. Lange, natürliche Gespräche, auch als Podcast."
    },
    telezueri: {
      cost: "Kostenlos", dialect: "Zürichdeutsch",
      what: "Das Zürcher Regionalfernsehen. Alle Eigenproduktionen laufen auf Schweizerdeutsch: tägliche Lokalnachrichten, die Talkshow TalkTäglich und die Sonntagsdebatte SonnTalk.",
      tip: "Die Debatten sind schnell, und alle fallen sich ins Wort. Genau darum geht's."
    },
    radio24: {
      cost: "Kostenlos", dialect: "Zürichdeutsch",
      what: "Zürichs Privatradio mit der Morgenshow «Ufsteller». Schnelle, gesprächige Moderation zwischen den Songs."
    },
    bligg: {
      cost: "Kostenlos streamen", dialect: "Zürichdeutsch",
      what: "Mundart-Rapper aus Zürich-Schwamendingen und einer der erfolgreichsten Musiker der Schweiz, seit drei Jahrzehnten aktiv.",
      tip: "Rap ist die härteste Prüfung von allen. Such dir die Texte und lies mit."
    },
    schnabelweid: {
      cost: "Kostenlos", dialect: "Schweizerdeutsch, viele Regionen",
      what: "Die wöchentliche Mundartstunde auf Radio SRF 1: Lesungen von Mundartautorinnen und -autoren, Lieder und Gespräche über Sprache."
    },
    hoerspiel: {
      cost: "Kostenlos", dialect: "Dialekt und Hochdeutsch",
      what: "Hörspiele und Krimis, viele davon im Dialekt aufgenommen. Reines Zuhören, keine Bilder als Stütze.",
      tip: "Lies die Beschreibung jeder Folge: Manche sind auf Hochdeutsch."
    },
    tschugger: {
      cost: "Kostenlos mit Schweizer Adresse", dialect: "Walliserdeutsch",
      what: "Eine Kult-Krimikomödie aus dem Wallis. Der Dialekt ist so anders, dass SRF feste Untertitel eingeblendet hat: zum Spaß und um zu hören, wie weit sich Schweizer Dialekte voneinander entfernen können.",
      tip: "Kein Zürichdeutsch. Nimm es als Bonusrunde."
    },
    gallmann: {
      cost: "Kostenpflichtig (Buch)", dialect: "Zürichdeutsch",
      what: "Das Standardwörterbuch für Zürichdeutsch (NZZ Libro, Ausgabe 2014, 723 Seiten), mit einem Register Hochdeutsch–Zürichdeutsch am Ende, damit du in beide Richtungen nachschlagen kannst."
    },
    schobinger: {
      name: "Viktor Schobinger: Ääschme-Krimis und Sprachbücher", cost: "Kostenpflichtig (Bücher, um CHF 25)", dialect: "Zürichdeutsch",
      what: "Über 45 kurze Krimis ganz auf Zürichdeutsch, dazu eine kurze Grammatik und Wörterbücher. Er schreibt in seiner eigenen Schreibweise mit zusätzlichen Akzenten, also rechne mit ein paar Überraschungen.",
      tip: "Zu bestellen über die Buchhandlung im Volkshaus, Stauffacherstrasse 60."
    },
    idiotikon: {
      cost: "Kostenlos", dialect: "Alle Schweizer Dialekte",
      what: "Das große Wörterbuch des Schweizerdeutschen, online durchsuchbar. Für den Moment, in dem du wissen willst, woher ein Wort wirklich kommt."
    },
    pbzcafe: {
      cost: "Siehe Veranstaltungsseite", dialect: "Zürichdeutsch",
      what: "Ein entspanntes wöchentliches Treffen für Erwachsene, die Schweizerdeutsch lernen oder damit spielen wollen. Derzeit in der PBZ Sihlcity, mittwochs von 10 bis 11 Uhr.",
      tip: "Die Stadtbibliothek leiht auch Bücher und Hörbücher aus: Frag nach dem Mundart-Regal."
    },
    maerchen: {
      cost: "Kostenpflichtig (Tickets)", dialect: "Zürichdeutsch",
      what: "Märchen auf der Bühne, im Dialekt, jeden Winter seit 1963. Einfache Geschichten, klare Stimmen, und die Handlung kennst du schon.",
      tip: "Das Theater am Hechtplatz wird bis Frühling 2027 renoviert; bis dahin laufen die Vorstellungen im Haus Seefeld."
    },
    zhlam: {
      cost: "CHF 10–15", dialect: "Zürichdeutsch",
      what: "Ein Poetry Slam auf Zürichdeutsch, organisiert vom Verein Züritüütsch. Schnell, witzig und voller Wortspiele.",
      tip: "Den nächsten Termin findest du auf Eventfrog."
    }
  },

  plan: [
    { when: "Woche 1–2", title: "Kurz und vorhersehbar", text: "Fang mit Material an, bei dem du schon weißt, was kommt. So kann sich dein Ohr ganz auf die Laute konzentrieren." },
    { when: "Woche 3–6", title: "Echte Menschen, mit Untertiteln", text: "Jetzt reden Menschen frei. Lass die hochdeutschen Untertitel am Anfang an und schalte sie aus, sobald du das meiste verstehst." },
    { when: "Monat 2–3", title: "Schnell und frei gesprochen", text: "Talkshows, Lokalfernsehen und Radio in vollem Tempo, ein erstes richtiges Buch im Dialekt und ein Abend auf Zürichdeutsch." },
    { when: "Wann immer du magst", title: "Bonusrunden", text: "Für die Neugier, nicht für den Fortschritt: wie weit sich Schweizer Dialekte voneinander entfernen und woher die Wörter kommen." }
  ],

  habit: "Wenn du ein Wort aufschnappst, das du nicht kennst, sag das hochdeutsche Gegenstück laut und schau, welche Lautregel die beiden verbindet. Nach ein paar Wochen passiert das ganz von allein.",

  story: [
    {
      title: "Schweizerdeutsch ist keine einzelne Sprache, sondern eine Familie alemannischer Dialekte.",
      text: [
        "Schweizerdeutsch ist der Sammelname für die alemannischen Dialekte der Deutschschweiz, gesprochen von rund 5,5 Millionen Menschen.",
        "Die Sprachwissenschaft teilt sie in Nieder-, Hoch- und Höchstalemannisch ein, und jede dieser Gruppen zerfällt wieder in lokale Varianten, manchmal von Dorf zu Dorf. Trotzdem verstehen sich Leute aus verschiedenen Regionen fast mühelos, auch dort, wo die Wörter auseinandergehen."
      ],
      sources: [
        ["Schweizerdeutsch (Wikipedia)", "https://de.wikipedia.org/wiki/Schweizerdeutsch"],
        ["Does Whisper understand Swiss German? (arXiv, 2024)", "https://arxiv.org/pdf/2404.19310"]
      ]
    },
    {
      title: "Diese Dialekte gehen auf die Alemannen zurück, die sich im frühen Mittelalter hier niederließen.",
      text: [
        "Die Alemannen waren ein Verbund germanischer Gruppen, den römische Quellen 289 n. Chr. zum ersten Mal erwähnen. Ihr Name bedeutete wohl «alle Männer», und er lebt im französischen Wort für Deutschland weiter: *Allemagne*.",
        "Sie besiedelten die Gegend in Etappen: nördlich des Rheins ab dem 5. Jahrhundert, südlich davon, in der heutigen Deutschschweiz, ab dem 6. Jahrhundert. Die Geschichtsforschung sieht in ihnen die Gruppe, die am meisten dazu beigetragen hat, dass die Region deutschsprachig wurde."
      ],
      sources: [
        ["Deutsch (Historisches Lexikon der Schweiz)", "https://hls-dhs-dss.ch/de/articles/011194/"],
        ["Germanen (Historisches Lexikon der Schweiz)", "https://hls-dhs-dss.ch/de/articles/008026/"],
        ["Alemannen (Wikipedia)", "https://de.wikipedia.org/wiki/Alemannen"]
      ]
    },
    {
      title: "Zürichdeutsch ist der hochalemannische Dialekt des Kantons Zürich.",
      text: [
        "Wer ihn spricht, nennt ihn *Züritüütsch*. Das Hochalemannische reicht über den größten Teil des Mittellands und teilt sich in eine östliche und eine westliche Gruppe; Zürich liegt genau dazwischen.",
        "Wer Zürichdeutsch hören lernt, versteht also schon halb die Dialekte des ganzen Mittellands."
      ],
      sources: [
        ["Zürichdeutsch (Wikipedia)", "https://de.wikipedia.org/wiki/Zürichdeutsch"],
        ["Schweizerdeutsch (Wikipedia)", "https://de.wikipedia.org/wiki/Schweizerdeutsch"]
      ]
    },
    {
      title: "Es hat die langen Vokale des mittelalterlichen Deutsch behalten, deshalb ist Zeit bis heute Ziit.",
      text: [
        "Im Mittelhochdeutschen hatten Wörter wie *mîn* und *hûs* lange Vokale. Ab dem 12. Jahrhundert wurden daraus Doppellaute, ausgehend vom Südosten Österreichs: So entstanden *mein* und *Haus*. Bis ins 16. Jahrhundert breitete sich der Wandel über fast das ganze deutsche Sprachgebiet aus, aber eben nur fast.",
        "Das Schweizerdeutsche hat nie mitgemacht und sagt bis heute *miin*, *Huus* und *Ziit*. Auch die alten Gleitlaute, die das Hochdeutsche eingeebnet hat, sind geblieben: *lieb* klingt wie li-eb, und *gut* heißt *guet*. Genau das sind die Regeln 01 bis 06 in dieser App."
      ],
      sources: [
        ["Neuhochdeutsche Diphthongierung (Wikipedia)", "https://de.wikipedia.org/wiki/Neuhochdeutsche_Diphthongierung"],
        ["Chapter 21: Middle to New High German (Monash University)", "https://users.monash.edu.au/~ewilkins/textbook/CHAP21.PDF"]
      ]
    },
    {
      title: "Eine Lautverschiebung hat es sogar weiter getrieben als das Hochdeutsche: Aus k wurde ch.",
      text: [
        "Während sich die Alemannen hier niederließen, breitete sich die hochdeutsche Lautverschiebung aus: Vom 5. bis ins 8. Jahrhundert wurde *t* zu *tz* oder *s*, *p* zu *pf* oder *f* und *k* zu *ch*. Selbst der Name der Stadt hat das mitgemacht: Aus dem römischen *Turicum* wurde *Zúriche*, das heutige Zürich.",
        "Das Hochdeutsche hat den k-Schritt nur an manchen Stellen vollzogen, etwa in *machen*. Das Hochalemannische ging den ganzen Weg: Ein Kind ist ein *Chind*, eine Küche eine *Chuchi*, und das berühmte Testwort *Chuchichäschtli* (Küchenschrank) steckt voller ch. Das ist Regel 07 in dieser App."
      ],
      sources: [
        ["Deutsch (Historisches Lexikon der Schweiz)", "https://hls-dhs-dss.ch/de/articles/011194/"],
        ["Zweite Lautverschiebung (Wikipedia)", "https://de.wikipedia.org/wiki/Zweite_Lautverschiebung"]
      ]
    },
    {
      title: "Trotzdem schreibt die Deutschschweiz Hochdeutsch und spricht es nur, wenn es sein muss.",
      text: [
        "In der Sprachwissenschaft heißt diese Aufteilung Diglossie, und die Deutschschweiz war eines der klassischen Beispiele, mit denen Charles Ferguson den Begriff 1959 beschrieb. Gesprochen wird Dialekt, quer durch alle Schichten und Bildungswege. Geschrieben wird Hochdeutsch.",
        "Kinder lernen Hochdeutsch ab etwa sechs Jahren in der Schule. Gesprochen wird es in der Schule, in den Nachrichten, im Parlament und mit Leuten, die den Dialekt nicht verstehen. Darum bekommen Interviews aus der Schweiz im deutschen Fernsehen oft Untertitel."
      ],
      sources: [
        ["Does Whisper understand Swiss German? (arXiv, 2024)", "https://arxiv.org/pdf/2404.19310"],
        ["Schweizerdeutsch (Wikipedia)", "https://de.wikipedia.org/wiki/Schweizerdeutsch"],
        ["Deutsch (Historisches Lexikon der Schweiz)", "https://hls-dhs-dss.ch/de/articles/011194/"]
      ]
    },
    {
      title: "Ihr geschriebenes Hochdeutsch hat einen eigenen Schweizer Ton, angefangen beim fehlenden ß.",
      text: [
        "Im Schweizer Hochdeutsch steht immer ss: *Strasse*, *gross*, *Fussball*. Der Kanton Zürich hörte 1935 als erster auf, das ß in der Schule zu unterrichten, und die *Neue Zürcher Zeitung* verabschiedete sich 1974 als letzte Schweizer Zeitung davon. (Diese Seite schreibt Hochdeutsch wie in Deutschland und Österreich, mit ß, weil die meisten so Deutsch gelernt haben. Wenn du eine Antwort tippst, zählt ss genauso.)",
        "Dazu kommt ein eigener Wortschatz, die Helvetismen: *Spital* statt Krankenhaus, *Velo* statt Fahrrad, *Billett* statt Fahrkarte und viele Lehnwörter aus dem Französischen."
      ],
      sources: [
        ["Schweizer Hochdeutsch (Wikipedia)", "https://de.wikipedia.org/wiki/Schweizer_Hochdeutsch"],
        ["German Orthographic Conference of 1901 (Wikipedia)", "https://en.wikipedia.org/wiki/German_Orthographic_Conference_of_1901"]
      ]
    },
    {
      title: "Die gesprochenen Dialekte dagegen ändern sich von Stadt zu Stadt, deshalb hört man Zürich, Bern und Basel leicht heraus.",
      text: [
        "Basel tanzt aus der Reihe: Sein Dialekt ist niederalemannisch, eine Insel im hochalemannischen Land. Ein Kind heißt dort *Kind*, nicht *Chind*.",
        "Bern ist bekannt dafür, das l in einen u-Laut zu verwandeln: Aus *Milch* wird *Miuch*. Die Forschung hat verfolgt, wie sich diese Gewohnheit von Bern aus nach Süden und Westen ausbreitet, kaum aber in Richtung Zürich oder Basel."
      ],
      sources: [
        ["Baseldeutsch (Wikipedia)", "https://de.wikipedia.org/wiki/Baseldeutsch"],
        ["The diffusion of /l/-vocalization in Swiss German (Cambridge)", "https://www.cambridge.org/core/journals/language-variation-and-change/article/diffusion-of-lvocalization-in-swiss-german/4AA92B479B21056EC82FEA6034D28AAA"],
        ["Urban dialects in the city of Bern (Universität Bern)", "https://boris.unibe.ch/141547/1/UrbanDialects_Bern.pdf"]
      ]
    },
    {
      title: "Weil die Dialekte zum Sprechen da waren, haben sie keine offizielle Rechtschreibung.",
      text: [
        "Lange wurde Schweizerdeutsch fast nur gesprochen, ein Regelwerk gibt es deshalb nicht. Der bekannteste Leitfaden ist Eugen Dieths *Schwyzertütschi Dialäktschrift* von 1938: Geschrieben wird, wie man spricht, kurze Vokale mit einem Buchstaben, lange mit zwei, wie in *Huus* und *Ziit*. Diese App hält sich daran.",
        "Bern hat seit 1972 ein eigenes System, das näher am Hochdeutschen bleibt. In alltäglichen Nachrichten schreiben die meisten einfach so, wie es sich richtig anfühlt."
      ],
      sources: [
        ["Wie schreibe ich Mundart? (SRF)", "https://www.srf.ch/radio-srf-1/mundart/dialekt-schrift-wie-schreibe-ich-mundart"],
        ["Eugen Dieth (Wikipedia)", "https://de.wikipedia.org/wiki/Eugen_Dieth"]
      ]
    },
    {
      title: "Seit 1862 sammelt man ihre Wörter in einem einzigen Wörterbuch, und es ist immer noch nicht fertig.",
      text: [
        "Das *Schweizerische Idiotikon* wurde 1862 in Zürich von einem Verein unter der Leitung von Friedrich Staub gegründet. Der erste Teil erschien 1881, aufbauend auf älteren Sammlungen, die bis 1806 zurückreichen.",
        "Es verzeichnet rund 150 000 Wörter vom Spätmittelalter bis heute, in 16 gedruckten Bänden; am 17., der den Buchstaben Z umfasst, wird noch gearbeitet. Online kannst du alles kostenlos durchsuchen."
      ],
      sources: [
        ["Schweizerisches Idiotikon (Wikipedia)", "https://de.wikipedia.org/wiki/Schweizerisches_Idiotikon"],
        ["«Tschegge» und «Tröpsli» online nachschauen (swissinfo)", "https://www.swissinfo.ch/ger/-tschegge--und--troepsli--online-nachschauen/28706952"],
        ["idiotikon.ch", "https://www.idiotikon.ch/"]
      ]
    },
    {
      title: "2011 machte das Zürcher Stimmvolk den Dialekt sogar zur Unterrichtssprache im Kindergarten.",
      text: [
        "Am 15. Mai 2011 nahmen die Stimmberechtigten im Kanton Zürich die Volksinitiative «JA zur Mundart im Kindergarten» mit 53,9 Prozent an.",
        "Seither steht im Gesetz, dass im Zürcher Kindergarten grundsätzlich Mundart gesprochen wird. Der Aargau hat später als zweiter Kanton eine ähnliche Initiative angenommen."
      ],
      sources: [
        ["Unterrichtssprache im Kindergarten neu geregelt (Kanton Zürich)", "https://www.zh.ch/de/news-uebersicht/medienmitteilungen/2011/11/311_unterrichtssprache.html"],
        ["Kantonale Abstimmungen 2011 (Année politique suisse)", "https://www.anneepolitique.swiss/static_files/Tabellen%202011.pdf"],
        ["Aargauer Dialekt-Initiative angenommen (SRF)", "https://www.srf.ch/news/schweiz/abstimmungen-ag-rueebli-statt-karotte-aargauer-dialekt-initiative-ist-angenommen"]
      ]
    },
    {
      title: "Und heute ist Zürichdeutsch lebendiger denn je, vom WhatsApp-Chat bis auf den Pausenhof.",
      text: [
        "Immer mehr Menschen schreiben ihren Dialekt inzwischen auch, von der Glückwunschkarte bis zur Textnachricht. An der Universität Zürich wird erforscht, wie Jugendliche mit Migrationsgeschichte neue, multiethnische Varianten davon prägen.",
        "Und auch wenn manche fürchten, das Zürichdeutsche verschlucke die anderen Dialekte: So einfach ist es laut der Forschung nicht. Stattdessen bilden sich regionale Varietäten um Zürich, Bern und Basel, und die Unterschiede werden auch in Jahrzehnten noch zu hören sein."
      ],
      sources: [
        ["Wie schreibe ich Mundart? (SRF)", "https://www.srf.ch/radio-srf-1/mundart/dialekt-schrift-wie-schreibe-ich-mundart"],
        ["Multiethnolektales Zürichdeutsch (Universität Zürich, LMU)", "https://lipp.ub.uni-muenchen.de/lipp/article/download/4895/2770/7856"],
        ["Sprechen wir eines Tages alle Züritüütsch? (SRF)", "https://www.srf.ch/kultur/gesellschaft-religion/schwindende-dialektvielfalt-sprechen-wir-eines-tages-alle-nur-noch-zueritueuetsch"]
      ]
    }
  ]
};

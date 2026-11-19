/*
 * Züritüütsch, a guide to Zurich German: content
 * ------------------------------
 * Everything the app shows lives in this one file, so you can add words,
 * rules or quiz items without touching the app code.
 *
 *   RULES       sound shifts (Standard German -> Zurich German)
 *   GRAMMAR     grammar shortcuts that help comprehension
 *   VOCAB       words the rules don't explain: learn them by heart (flashcards)
 *   QUIZ        "reverse it into Standard German" items
 *   PLAN        the learning plan
 *
 * Spelling: Swiss German has no official spelling. This file follows the
 * common "Dieth" style used in Zurich (long vowels doubled: Huus, Ziit).
 */

const REPO_URL = "https://github.com/cemreozertas/zueri-tuetsch";

// Visitor counting with GoatCounter: no cookies, no personal data, no banner needed.
// This is the code you chose when you signed up (dashboard: https://CODE.goatcounter.com).
// Leave it empty ("") to switch counting off.
const GOATCOUNTER_CODE = "cemreozertas";

// Link to the feedback form for the "decode a whole message" idea (for example a Tally form).
// If you empty it (""), the vote under the decoder still works and only the note link is hidden.
const FEEDBACK_FORM_URL = "https://tally.so/r/8NLRDO";

// Optional: a form for corrections and word suggestions ("Hear it differently in your Kreis?").
// Leave it empty and the link opens a GitHub issue instead. The form gets ?topic=Rules or ?topic=Vocabulary.
const CORRECTIONS_FORM_URL = "";

const RULES = [
  {
    id: "ei",
    from: "ei", to: "ii",
    title: "Where Hochdeutsch has ei, you often hear ii",
    explain: "Many words with ei keep the old long i that Standard German turned into ei.",
    examples: [["Zeit", "Ziit"], ["mein", "miin"], ["bleiben", "bliibe"], ["schreiben", "schriibe"], ["Eis", "Iis"]],
    reverse: "Hear ii? Try ei.",
    caveat: "Not every ei moves: zwei, heiß and Fleisch stay the same."
  },
  {
    id: "au",
    from: "au", to: "uu",
    title: "Where Hochdeutsch has au, you often hear uu",
    explain: "Same story as ei: an old long u that Standard German turned into au.",
    examples: [["Haus", "Huus"], ["auf", "uf"], ["brauchen", "bruuche"], ["Maus", "Muus"], ["aus", "us"]],
    reverse: "Hear uu (or a short u in uf, us)? Try au.",
    caveat: "Some au words stay au: Baum, kaufen → chaufe."
  },
  {
    id: "eu",
    from: "eu / äu", to: "üü",
    title: "Where Hochdeutsch has eu or äu, you often hear üü",
    explain: "The umlauted partner of au and uu.",
    examples: [["heute", "hüt"], ["Leute", "Lüüt"], ["Häuser", "Hüüser"], ["Feuer", "Füür"]],
    reverse: "Hear üü? Try eu or äu.",
    caveat: "A few eu words go their own way: neu is nöi, Freude is Fröid, Heu is Höi."
  },
  {
    id: "ue",
    from: "u (long)", to: "ue",
    title: "Where Hochdeutsch has a long u, you often hear ue",
    explain: "A gliding u-e sound where Standard German has a plain long u.",
    examples: [["gut", "guet"], ["Bruder", "Brueder"], ["Fuß", "Fuess"], ["Kuh", "Chue"]],
    reverse: "Hear ue? Drop the e."
  },
  {
    id: "ueh",
    from: "ü (long)", to: "üe",
    title: "Where Hochdeutsch has a long ü, you often hear üe",
    explain: "The umlauted version of ue. It's also hiding inside Grüezi (grüßen).",
    examples: [["müde", "müed"], ["früh", "früe"], ["grüßen", "grüesse"], ["Füße", "Füess"]],
    reverse: "Hear üe? Drop the e."
  },
  {
    id: "ie",
    from: "ie", to: "ie / iä",
    title: "ie is spoken as two sounds",
    explain: "Written the same, but you hear i-e (often close to i-ä), not one long i.",
    examples: [["lieb", "lieb (li-eb)"], ["Brief", "Brief / Briäf"], ["Lied", "Lied (li-ed)"]],
    reverse: "Hear i-e or i-ä? It's a plain ie word."
  },
  {
    id: "k",
    from: "k (at the start)", to: "ch",
    title: "Where Hochdeutsch has k, you hear ch",
    explain: "At the start of a word, k is a throaty ch, like in Bach.",
    examples: [["Kind", "Chind"], ["Küche", "Chuchi"], ["kommen", "cho"], ["Käse", "Chääs"], ["kaufen", "chaufe"]],
    reverse: "Hear ch at the start of a word? Try k.",
    caveat: "Newer loanwords keep k: Kafi (coffee), Kiosk, Konto."
  },
  {
    id: "en",
    from: "-en", to: "-e",
    title: "Words end without the final n",
    explain: "Verbs (and many nouns) lose their final n. Some short verbs shrink even more.",
    examples: [["machen", "mache"], ["Garten", "Garte"], ["gehen", "gaa"], ["haben", "ha"]],
    reverse: "Word ends in e? It probably ends in -en."
  },
  {
    id: "ge",
    from: "ge- (participle)", to: "g- / nothing",
    title: "ge- is just g-, or nothing",
    explain: "Past participles keep only a g, or nothing at all.",
    examples: [["gemacht", "gmacht"], ["gewesen", "gsi"], ["gehabt", "gha"], ["gesehen", "gseh"], ["gekommen", "cho"]],
    reverse: "g + consonant at the start? Add an e: ge-."
  },
  {
    id: "st",
    from: "st", to: "scht",
    title: "st is said scht everywhere",
    explain: "Standard German says scht only at the start of a word. Zurich says it everywhere.",
    examples: [["ist", "isch"], ["Post", "Poscht"], ["fast", "fascht"], ["Fest", "Fescht"], ["Wurst", "Wurscht"]],
    reverse: "Hear scht in the middle or at the end? Try st."
  },
  {
    id: "ung",
    from: "-ung", to: "-ig",
    title: "Where Hochdeutsch has -ung, you hear -ig",
    explain: "One of the easiest shifts to spot once you know it.",
    examples: [["Zeitung", "Ziitig"], ["Wohnung", "Wonig"], ["Rechnung", "Rächnig"], ["Meinung", "Meinig"]],
    reverse: "Noun ends in -ig? Try -ung."
  },
  {
    id: "li",
    from: "-chen / -lein", to: "-li",
    title: "small things end in -li",
    explain: "The diminutive is always -li, and it's everywhere.",
    examples: [["bisschen", "Bitzeli"], ["Häuschen", "Hüüsli"], ["Schokolade (Stück)", "Schöggeli"], ["Küchenkästchen", "Chuchichäschtli"]],
    reverse: "Ends in -li? Think -chen."
  },
  {
    id: "ae",
    from: "e (short)", to: "ä",
    title: "Short e often sounds like ä",
    explain: "Many short e sounds are spoken more open, like the a in English cat.",
    examples: [["Geld", "Gäld"], ["essen", "ässe"], ["recht", "rächt"], ["sechs", "sächs"]],
    reverse: "Hear ä where it sounds odd? Try e."
  }
];

const GRAMMAR = [
  {
    title: "No simple past",
    text: "There's no Präteritum, so everything is Perfekt.",
    examples: [["ich war", "ich bin gsi"], ["ich hatte", "ich ha gha"], ["wir gingen", "mir sind gange"]]
  },
  {
    title: "Small is -li",
    text: "The diminutive is -li, and Swiss speakers use it constantly.",
    examples: [["ein bisschen", "es Bitzeli"], ["ein Stück Schokolade", "es Schöggeli"]]
  },
  {
    title: "mer = wir or man",
    text: "Mer can mean \"we\" or the impersonal \"one\". Context decides.",
    examples: [["wir gehen", "mer gönd"], ["man sieht sich", "mer gseht sich"]]
  },
  {
    title: "Short articles",
    text: "Articles shrink to a single sound you can barely hear.",
    examples: [["der Mann", "de Maa"], ["die Frau", "d Frau"], ["das Kind", "s Chind"], ["ein / eine", "en / e"]]
  }
];

/*
 * Flashcard vocabulary: the words the sound rules don't help with.
 * cat: greetings | verbs | small | food | everyday | false-friends
 */
const VOCAB = [
  // Greetings and politeness
  { zd: "Grüezi", hd: "Guten Tag (formal)", cat: "greetings", lvl: 1 },
  { zd: "Grüezi mitenand", hd: "Guten Tag zusammen (to a group)", cat: "greetings", lvl: 1 },
  { zd: "Hoi / Sali", hd: "Hallo (informal)", cat: "greetings", lvl: 1 },
  { zd: "Merci vielmal", hd: "Vielen Dank", cat: "greetings", lvl: 1 },
  { zd: "Gern gschee", hd: "Gern geschehen", cat: "greetings", lvl: 1 },
  { zd: "En Guete", hd: "Guten Appetit", cat: "greetings", lvl: 1 },
  { zd: "Gueten Morge", hd: "Guten Morgen", cat: "greetings", lvl: 1 },
  { zd: "Schöne Tag", hd: "Schönen Tag", cat: "greetings", lvl: 1 },
  { zd: "Adieu", hd: "Auf Wiedersehen, tschüss", cat: "greetings", lvl: 1, note: "Said with a German stress: A-dieu." },
  { zd: "Bis spöter", hd: "Bis später", cat: "greetings", lvl: 1 },
  { zd: "Tschau zäme", hd: "Tschüss zusammen", cat: "greetings", lvl: 2 },
  { zd: "Uf Widerluege", hd: "Auf Wiedersehen", cat: "greetings", lvl: 2 },
  { zd: "Sali zäme", hd: "Hallo zusammen (informal)", cat: "greetings", lvl: 2 },
  { zd: "Schöne Abig", hd: "Schönen Abend", cat: "greetings", lvl: 2 },
  { zd: "Häb's guet", hd: "Mach's gut", cat: "greetings", lvl: 2 },
  { zd: "Exgüsi", hd: "Entschuldigung", cat: "greetings", lvl: 2, note: "From French excusez." },

  // Useful phrases
  { zd: "Chönd Sie das nomal säge?", hd: "Können Sie das noch mal sagen?", cat: "phrases", lvl: 1, note: "The most useful sentence for this whole app." },
  { zd: "Ich verstah nüt.", hd: "Ich verstehe nichts.", cat: "phrases", lvl: 1 },
  { zd: "Chasch mer hälfe?", hd: "Kannst du mir helfen?", cat: "phrases", lvl: 1 },
  { zd: "Kei Ahnig.", hd: "Keine Ahnung.", cat: "phrases", lvl: 1 },
  { zd: "Hopp Schwiiz!", hd: "Los, Schweiz!", cat: "phrases", lvl: 1 },
  { zd: "Es isch mer gliich.", hd: "Es ist mir egal.", cat: "phrases", lvl: 2 },
  { zd: "Chunnt scho guet.", hd: "Das wird schon.", cat: "phrases", lvl: 2 },
  { zd: "Bisch zwäg?", hd: "Geht's dir gut?", cat: "phrases", lvl: 3 },
  { zd: "Es schiffet.", hd: "Es regnet in Strömen.", cat: "phrases", lvl: 3 },
  { zd: "Gopfertelli!", hd: "Verflixt!", cat: "phrases", lvl: 3, note: "A mild curse, fine in company." },

  // Small words
  { zd: "nüt / nüüt", hd: "nichts", cat: "small", lvl: 1 },
  { zd: "nöd", hd: "nicht", cat: "small", lvl: 1, note: "In Bern it's nid." },
  { zd: "echt", hd: "wirklich", cat: "small", lvl: 1 },
  { zd: "grad", hd: "gerade", cat: "small", lvl: 1 },
  { zd: "sicher", hd: "bestimmt", cat: "small", lvl: 1 },
  { zd: "chli", hd: "ein bisschen; klein", cat: "small", lvl: 1 },
  { zd: "scho", hd: "schon", cat: "small", lvl: 1 },
  { zd: "zerscht", hd: "zuerst", cat: "small", lvl: 1 },
  { zd: "würkli", hd: "wirklich", cat: "small", lvl: 1 },
  { zd: "eso", hd: "so", cat: "small", lvl: 1 },
  { zd: "oder?", hd: "nicht wahr?", cat: "small", lvl: 1, note: "Ends half of all Swiss sentences." },
  { zd: "öppis", hd: "etwas", cat: "small", lvl: 2 },
  { zd: "öpper", hd: "jemand", cat: "small", lvl: 2 },
  { zd: "gäll", hd: "nicht wahr?", cat: "small", lvl: 2 },
  { zd: "es hät", hd: "es gibt", cat: "small", lvl: 2 },
  { zd: "dihei", hd: "zu Hause", cat: "small", lvl: 2 },
  { zd: "dusse", hd: "draußen", cat: "small", lvl: 2 },
  { zd: "öppe", hd: "etwa, ungefähr", cat: "small", lvl: 2 },
  { zd: "nüme", hd: "nicht mehr", cat: "small", lvl: 2 },
  { zd: "äbe", hd: "eben, genau", cat: "small", lvl: 2 },
  { zd: "gliich", hd: "gleich; trotzdem", cat: "small", lvl: 2, ex: "Es isch mer gliich. = Es ist mir egal." },
  { zd: "öppedie", hd: "manchmal", cat: "small", lvl: 3 },
  { zd: "vorig", hd: "vorhin", cat: "small", lvl: 3 },
  { zd: "allwäg", hd: "wohl, vermutlich", cat: "small", lvl: 3 },

  // Verbs
  { zd: "cha", hd: "kann", cat: "verbs", lvl: 1 },
  { zd: "mues", hd: "muss", cat: "verbs", lvl: 1 },
  { zd: "chunnt", hd: "kommt", cat: "verbs", lvl: 1 },
  { zd: "gaht", hd: "geht", cat: "verbs", lvl: 1 },
  { zd: "zahle", hd: "bezahlen", cat: "verbs", lvl: 1, ex: "Zahle, bitte! = Die Rechnung, bitte!" },
  { zd: "grilliere", hd: "grillen", cat: "verbs", lvl: 1 },
  { zd: "uufstaa", hd: "aufstehen", cat: "verbs", lvl: 1, ex: "Ich stah am sibni uf. = Ich stehe um sieben auf." },
  { zd: "luege", hd: "schauen", cat: "verbs", lvl: 2, ex: "Lueg emal! = Schau mal!" },
  { zd: "lose", hd: "zuhören", cat: "verbs", lvl: 2, ex: "Los mal! = Hör mal zu!" },
  { zd: "schaffe", hd: "arbeiten", cat: "verbs", lvl: 2 },
  { zd: "poschte", hd: "einkaufen", cat: "verbs", lvl: 2 },
  { zd: "zügle", hd: "umziehen", cat: "verbs", lvl: 2 },
  { zd: "gumpe", hd: "springen, hüpfen", cat: "verbs", lvl: 2 },
  { zd: "wott", hd: "will", cat: "verbs", lvl: 2 },
  { zd: "gönd", hd: "gehen (wir/sie)", cat: "verbs", lvl: 2 },
  { zd: "verzelle", hd: "erzählen", cat: "verbs", lvl: 2 },
  { zd: "hocke", hd: "sitzen", cat: "verbs", lvl: 2, ex: "Hock ab! = Setz dich!" },
  { zd: "aalüüte", hd: "anrufen", cat: "verbs", lvl: 2, ex: "Ich lüüt dir aa. = Ich rufe dich an." },
  { zd: "pressiere", hd: "sich beeilen", cat: "verbs", lvl: 2, ex: "Es pressiert. = Es eilt." },
  { zd: "ghööre", hd: "hören", cat: "verbs", lvl: 2, ex: "Ich ghöre nüt. = Ich höre nichts." },
  { zd: "schnure", hd: "reden, plaudern", cat: "verbs", lvl: 3 },
  { zd: "chrampfe", hd: "hart arbeiten", cat: "verbs", lvl: 3 },
  { zd: "pfuse", hd: "schlafen", cat: "verbs", lvl: 3 },
  { zd: "tschuute", hd: "Fußball spielen", cat: "verbs", lvl: 3 },
  { zd: "chlöne", hd: "jammern", cat: "verbs", lvl: 3 },
  { zd: "glette", hd: "bügeln", cat: "verbs", lvl: 3 },
  { zd: "wüsche", hd: "fegen, kehren", cat: "verbs", lvl: 3 },

  // Feelings and descriptions
  { zd: "mega", hd: "sehr", cat: "feelings", lvl: 1 },
  { zd: "tipptopp", hd: "einwandfrei, bestens", cat: "feelings", lvl: 1 },
  { zd: "Gfüül", hd: "Gefühl", cat: "feelings", lvl: 1 },
  { zd: "nöi", hd: "neu", cat: "feelings", lvl: 2, note: "Not nüü: one of the exceptions to rule 03." },
  { zd: "Fröid", hd: "Freude", cat: "feelings", lvl: 2, ex: "Das macht mer Fröid. = Das freut mich." },
  { zd: "härzig", hd: "niedlich, süß", cat: "feelings", lvl: 3 },

  // Home and people
  { zd: "Mäntsch", hd: "Mensch", cat: "home", lvl: 1 },
  { zd: "Chuchichäschtli", hd: "Küchenschrank", cat: "home", lvl: 2, note: "The classic test word." },
  { zd: "Abwart", hd: "Hausmeister", cat: "home", lvl: 2 },
  { zd: "Wöschchuchi", hd: "Waschküche", cat: "home", lvl: 2, note: "Shared laundry room, with a booking plan." },
  { zd: "Finke", hd: "Hausschuhe", cat: "home", lvl: 3 },
  { zd: "Estrich", hd: "Dachboden", cat: "home", lvl: 3, note: "Not the floor screed!" },
  { zd: "Lavabo", hd: "Waschbecken", cat: "home", lvl: 3 },
  { zd: "Ghüder", hd: "Müll", cat: "home", lvl: 3, ex: "de Ghüdersack = der Müllsack" },
  { zd: "Pfnüsel", hd: "Schnupfen", cat: "home", lvl: 3 },
  { zd: "Gotte / Götti", hd: "Patin / Pate", cat: "home", lvl: 3 },
  { zd: "Bünzli", hd: "Spießer", cat: "home", lvl: 3 },
  { zd: "Zapfezieher", hd: "Korkenzieher", cat: "home", lvl: 3 },

  // Out and about
  { zd: "Velo", hd: "Fahrrad", cat: "city", lvl: 1 },
  { zd: "Billett", hd: "Fahrkarte", cat: "city", lvl: 1 },
  { zd: "Spital", hd: "Krankenhaus", cat: "city", lvl: 1 },
  { zd: "Coiffeur", hd: "Friseur", cat: "city", lvl: 1 },
  { zd: "Ferie", hd: "Urlaub", cat: "city", lvl: 1 },
  { zd: "Poschti", hd: "Einkäufe", cat: "city", lvl: 2, ex: "d Poschti mache = einkaufen" },
  { zd: "Trottoir", hd: "Gehsteig", cat: "city", lvl: 2 },
  { zd: "Perron", hd: "Bahnsteig", cat: "city", lvl: 2 },
  { zd: "Pöstler", hd: "Briefträger", cat: "city", lvl: 2 },
  { zd: "Kondukteur", hd: "Zugbegleiter", cat: "city", lvl: 2 },
  { zd: "Trottinett", hd: "Tretroller", cat: "city", lvl: 2 },
  { zd: "Ross", hd: "Pferd", cat: "city", lvl: 2 },
  { zd: "Stutz", hd: "Franken (umgangssprachlich)", cat: "city", lvl: 3 },
  { zd: "Töff", hd: "Motorrad", cat: "city", lvl: 3 },
  { zd: "Chilbi", hd: "Jahrmarkt, Kirmes", cat: "city", lvl: 3 },

  // Food and drink
  { zd: "Poulet", hd: "Hähnchen", cat: "food", lvl: 1 },
  { zd: "Glace", hd: "Speiseeis", cat: "food", lvl: 1 },
  { zd: "Kafi", hd: "Kaffee", cat: "food", lvl: 1 },
  { zd: "Schoggi", hd: "Schokolade", cat: "food", lvl: 1 },
  { zd: "Wienerli", hd: "Wiener Würstchen", cat: "food", lvl: 1 },
  { zd: "Apéro", hd: "Umtrunk mit Häppchen", cat: "food", lvl: 1 },
  { zd: "Zmorge", hd: "Frühstück", cat: "food", lvl: 2 },
  { zd: "Znüni", hd: "Pausensnack am Vormittag", cat: "food", lvl: 2 },
  { zd: "Zmittag", hd: "Mittagessen", cat: "food", lvl: 2 },
  { zd: "Zvieri", hd: "Snack am Nachmittag", cat: "food", lvl: 2 },
  { zd: "Znacht", hd: "Abendessen", cat: "food", lvl: 2 },
  { zd: "Rüebli", hd: "Karotte", cat: "food", lvl: 2 },
  { zd: "Härdöpfel", hd: "Kartoffel", cat: "food", lvl: 2 },
  { zd: "Gipfeli", hd: "Croissant", cat: "food", lvl: 2 },
  { zd: "Rahm", hd: "Sahne", cat: "food", lvl: 2 },
  { zd: "Guetzli", hd: "Kekse, Plätzchen", cat: "food", lvl: 2 },
  { zd: "Peterli", hd: "Petersilie", cat: "food", lvl: 2 },
  { zd: "Zwätschge", hd: "Pflaume", cat: "food", lvl: 2 },
  { zd: "Chriesi", hd: "Kirschen", cat: "food", lvl: 2 },
  { zd: "Pommes Chips", hd: "Kartoffelchips", cat: "food", lvl: 2 },
  { zd: "Hahnewasser", hd: "Leitungswasser", cat: "food", lvl: 2 },
  { zd: "Kafi Crème", hd: "Kaffee mit Rahm", cat: "food", lvl: 2 },
  { zd: "Panaché", hd: "Radler", cat: "food", lvl: 2 },
  { zd: "Anke", hd: "Butter", cat: "food", lvl: 3 },
  { zd: "Weggli", hd: "Brötchen", cat: "food", lvl: 3 },
  { zd: "Zältli", hd: "Bonbon", cat: "food", lvl: 3 },
  { zd: "Bürli", hd: "rustikales Brötchen", cat: "food", lvl: 3 },
  { zd: "Nüsslisalat", hd: "Feldsalat", cat: "food", lvl: 3 },
  { zd: "Rande", hd: "Rote Bete", cat: "food", lvl: 3 },
  { zd: "Chabis", hd: "Kohl", cat: "food", lvl: 3, note: "Also means nonsense: Das isch Chabis!" },
  { zd: "Gschwellti", hd: "Pellkartoffeln", cat: "food", lvl: 3 },
  { zd: "Härdöpfelstock", hd: "Kartoffelpüree", cat: "food", lvl: 3 },
  { zd: "Stange", hd: "kleines Bier vom Fass (3 dl)", cat: "food", lvl: 3 },

  // Days, time and holidays
  { zd: "geschter", hd: "gestern", cat: "time", lvl: 1 },
  { zd: "Määntig", hd: "Montag", cat: "time", lvl: 1 },
  { zd: "Mittwuch", hd: "Mittwoch", cat: "time", lvl: 1 },
  { zd: "Friitig", hd: "Freitag", cat: "time", lvl: 1 },
  { zd: "Samschtig", hd: "Samstag", cat: "time", lvl: 1 },
  { zd: "Sunntig", hd: "Sonntag", cat: "time", lvl: 1 },
  { zd: "Wienacht", hd: "Weihnachten", cat: "time", lvl: 1 },
  { zd: "morn", hd: "morgen", cat: "time", lvl: 2 },
  { zd: "Dunschtig", hd: "Donnerstag", cat: "time", lvl: 2 },
  { zd: "föifi", hd: "fünf Uhr", cat: "time", lvl: 2, note: "föif = fünf. For the time, add -i: am föifi = um fünf." },
  { zd: "Samichlaus", hd: "Nikolaus (6. Dezember)", cat: "time", lvl: 2 },
  { zd: "hüür", hd: "dieses Jahr", cat: "time", lvl: 3 },
  { zd: "fern", hd: "letztes Jahr", cat: "time", lvl: 3 },
  { zd: "Ziischtig", hd: "Dienstag", cat: "time", lvl: 3, note: "Sounds nothing like Dienstag, so learn it by heart." },
  { zd: "Bärchtelistag", hd: "Berchtoldstag (2. Januar)", cat: "time", lvl: 3, note: "The day after New Year: a day off in Zurich and many other cantons." },

  // False friends
  { zd: "Peperoni", hd: "Paprika (das Gemüse)", cat: "false-friends", lvl: 2, note: "Not a hot chili." },
  { zd: "Hosesack", hd: "Hosentasche", cat: "false-friends", lvl: 2 },
  { zd: "springe", hd: "rennen", cat: "false-friends", lvl: 3, note: "Not \"springen\"!" },
  { zd: "schmöcke", hd: "riechen", cat: "false-friends", lvl: 3, note: "Not \"schmecken\"!" },
  { zd: "laufe", hd: "gehen (zu Fuß)", cat: "false-friends", lvl: 3, note: "Not \"rennen\"!" },
  { zd: "äxtra", hd: "absichtlich", cat: "false-friends", lvl: 3, note: "Not \"extra\" as in additional." },
  { zd: "Puff", hd: "Unordnung", cat: "false-friends", lvl: 3, ex: "Was für es Puff! = Was für eine Unordnung!" },
  { zd: "Hafe", hd: "Kochtopf", cat: "false-friends", lvl: 3, note: "Not a harbor." },
  { zd: "Schale", hd: "Milchkaffee", cat: "false-friends", lvl: 3, note: "Not a bowl: e Schale is a cup of milky coffee." },
  { zd: "glatt", hd: "lustig, witzig", cat: "false-friends", lvl: 3, note: "Not \"smooth\": Das isch glatt! = Das ist lustig!" }
];

const CATEGORIES = {
  "greetings": "Greetings and politeness",
  "phrases": "Useful phrases",
  "small": "Small words",
  "verbs": "Verbs",
  "feelings": "Feelings and descriptions",
  "home": "Home and people",
  "city": "Out and about",
  "food": "Food and drink",
  "time": "Days, time and holidays",
  "false-friends": "False friends"
};

// Levels for words, phrases and quiz items.
/*
 * Levels are named after ZVV tickets: a short hop, the whole city, the whole canton.
 * "plain" is the everyday word shown underneath, for anyone who doesn't know the tickets yet.
 */
const LEVELS = {
  1: { name: "Kurzstrecke", plain: "Easy", text: "A short hop: close to Hochdeutsch. With the sound rules, you'll often guess these." },
  2: { name: "Zone 110", plain: "Hard", text: "The whole city: everyday words with no clue in Hochdeutsch. These you learn by heart." },
  3: { name: "Alle Zonen", plain: "Impossible", text: "The whole canton: traps, slang and real-life speed. Even long-time residents trip over these." }
};

/*
 * Quiz: "reverse it into Standard German".
 * hd: every accepted answer (case and punctuation are ignored).
 * rules: ids from RULES that the item practices.
 */
const QUIZ = [
  { zd: "Ziit", hd: ["Zeit"], rules: ["ei"], lvl: 1 },
  { zd: "Huus", hd: ["Haus"], rules: ["au"], lvl: 1 },
  { zd: "Lüüt", hd: ["Leute"], rules: ["eu"], lvl: 1 },
  { zd: "guet", hd: ["gut"], rules: ["ue"], lvl: 1 },
  { zd: "Brueder", hd: ["Bruder"], rules: ["ue"], lvl: 1 },
  { zd: "müed", hd: ["müde"], rules: ["ueh"], lvl: 1 },
  { zd: "Chind", hd: ["Kind"], rules: ["k"], lvl: 1 },
  { zd: "Chuchi", hd: ["Küche"], rules: ["k"], lvl: 1 },
  { zd: "hüt", hd: ["heute"], rules: ["eu"], lvl: 1 },
  { zd: "Fuess", hd: ["Fuß"], rules: ["ue"], lvl: 1 },
  { zd: "gmacht", hd: ["gemacht"], rules: ["ge"], lvl: 1 },
  { zd: "mache", hd: ["machen"], rules: ["en"], lvl: 1 },
  { zd: "Wonig", hd: ["Wohnung"], rules: ["ung"], lvl: 1 },
  { zd: "Poscht", hd: ["Post"], rules: ["st"], lvl: 1 },
  { zd: "Gäld", hd: ["Geld"], rules: ["ae"], lvl: 1 },
  { zd: "Hüüser", hd: ["Häuser"], rules: ["eu"], lvl: 1 },
  { zd: "früe", hd: ["früh"], rules: ["ueh"], lvl: 1 },
  { zd: "Iis", hd: ["Eis"], rules: ["ei"], lvl: 1 },
  { zd: "Muus", hd: ["Maus"], rules: ["au"], lvl: 1 },
  { zd: "Chääs", hd: ["Käse"], rules: ["k"], lvl: 1 },
  { zd: "Fescht", hd: ["Fest"], rules: ["st"], lvl: 1 },
  { zd: "gseh", hd: ["gesehen"], rules: ["ge"], lvl: 1 },
  { zd: "bliibe", hd: ["bleiben"], rules: ["ei", "en"], lvl: 2 },
  { zd: "bruuche", hd: ["brauchen"], rules: ["au", "en"], lvl: 2 },
  { zd: "Ziitig", hd: ["Zeitung"], rules: ["ei", "ung"], lvl: 2 },
  { zd: "schriibe", hd: ["schreiben"], rules: ["ei", "en"], lvl: 2 },
  { zd: "Rächnig", hd: ["Rechnung"], rules: ["ae", "ung"], lvl: 2 },
  { zd: "chaufe", hd: ["kaufen"], rules: ["k", "en"], lvl: 2 },
  { zd: "Hüüsli", hd: ["Häuschen"], rules: ["eu", "li"], lvl: 2 },
  { zd: "grüesse", hd: ["grüßen"], rules: ["ueh", "en"], lvl: 2 },
  { zd: "Das isch guet.", hd: ["Das ist gut."], rules: ["st", "ue"], lvl: 2 },
  { zd: "Ich bi müed.", hd: ["Ich bin müde."], rules: ["ueh"], lvl: 2 },
  { zd: "Chunnsch au?", hd: ["Kommst du auch?"], rules: ["k"], lvl: 2 },
  { zd: "D Chind sind dusse.", hd: ["Die Kinder sind draußen."], rules: ["k"], lvl: 2 },
  { zd: "Bisch scho lang da?", hd: ["Bist du schon lange da?", "Bist du schon lang da?"], rules: ["st"], lvl: 2 },
  { zd: "Ich ghöre nüt.", hd: ["Ich höre nichts."], rules: [], lvl: 2 },
  { zd: "Ich ha hüt kei Ziit.", hd: ["Ich habe heute keine Zeit.", "Ich hab heute keine Zeit."], rules: ["eu", "ei", "en"], lvl: 3 },
  { zd: "Mer gönd hüt is Kino.", hd: ["Wir gehen heute ins Kino."], rules: ["eu"], lvl: 3 },
  { zd: "Ich mues no poschte.", hd: ["Ich muss noch einkaufen."], rules: [], lvl: 3 },
  { zd: "Häsch öppis gseh?", hd: ["Hast du etwas gesehen?"], rules: ["ge"], lvl: 3 },
  { zd: "Mer zügled nach Züri.", hd: ["Wir ziehen nach Zürich um."], rules: [], lvl: 3 },
  { zd: "Es hät no Gipfeli.", hd: ["Es gibt noch Croissants.", "Es gibt noch Gipfeli."], rules: ["li"], lvl: 3 },
  { zd: "Ich ha s Velo dihei gla.", hd: ["Ich habe das Fahrrad zu Hause gelassen.", "Ich habe das Velo zu Hause gelassen.", "Ich habe das Fahrrad daheim gelassen."], rules: ["ge"], lvl: 3 },
  { zd: "Mer gseht sich!", hd: ["Man sieht sich!"], rules: [], lvl: 3 },
  { zd: "Ich bin geschter im Spital gsi.", hd: ["Ich war gestern im Krankenhaus.", "Ich bin gestern im Krankenhaus gewesen."], rules: ["ge"], lvl: 3 },
  { zd: "Lueg, de Brueder schafft dihei.", hd: ["Schau, der Bruder arbeitet zu Hause.", "Schau, der Bruder arbeitet daheim."], rules: ["ue"], lvl: 3 },
  { zd: "Ich stah am sibni uf.", hd: ["Ich stehe um sieben auf.", "Ich stehe um sieben Uhr auf."], rules: [], lvl: 3 },
  { zd: "Häsch am Ziischtig Ziit?", hd: ["Hast du am Dienstag Zeit?", "Hast du Dienstag Zeit?"], rules: ["ei"], lvl: 3 },
  { zd: "Es schiffet scho wider.", hd: ["Es regnet schon wieder.", "Es schüttet schon wieder."], rules: [], lvl: 3 },
  { zd: "Gäll, du chunnsch morn au?", hd: ["Du kommst morgen auch, oder?", "Du kommst morgen auch, nicht wahr?", "Nicht wahr, du kommst morgen auch?", "Gell, du kommst morgen auch?"], rules: ["k"], lvl: 3 },
  { zd: "Das isch mega härzig.", hd: ["Das ist sehr niedlich.", "Das ist sehr süß.", "Das ist total süß.", "Das ist total niedlich."], rules: [], lvl: 3 },
  { zd: "Das isch e nöii Wonig.", hd: ["Das ist eine neue Wohnung."], rules: ["ung"], lvl: 3 }
];

/*
 * Learning plan.
 * SOURCES is the library; each stage in PLAN lists source ids in the order to use them.
 * kind: listen | watch | read | go     where: online | offline     lvl: 1 easy, 2 hard, 3 impossible
 * dialect says honestly what you'll hear: not everything on Swiss media is Zurich German.
 */
const PLAN_CHECKED = "November 2026";

const SOURCES = {
  meteo: {
    name: "SRF Meteo", kind: "watch", where: "online", lvl: 1, cost: "Free", dialect: "Swiss German, mixed regions",
    url: "https://www.srf.ch/meteo",
    what: "The TV weather forecast after the evening news, presented freely in Swiss German since 2005. Four minutes, same words every day: perfect for a first ear.",
    tip: "Watch the same forecast twice: once for the gist, once to catch the words."
  },
  easygerman: {
    name: "Easy German: episodes filmed in Zurich", kind: "watch", where: "online", lvl: 1, cost: "Free", dialect: "Zurich German, with subtitles",
    url: "https://www.youtube.com/@EasyGerman",
    what: "Street interviews with subtitles. Look for «13 Swiss Words That Germans Don't Understand» (538), «How the Swiss Feel about Standard German» (543) and «Introduce Yourself in Slow Swiss German» (Super Easy German 248).",
    tip: ""
  },
  schtaerne: {
    name: "Schtärneföifi", kind: "listen", where: "online", lvl: 1, cost: "Free to stream", dialect: "Zurich German",
    url: "https://open.spotify.com/search/Scht%C3%A4rnef%C3%B6ifi",
    what: "A Zurich children's band that grew out of the city's punk scene. They stopped performing in 2020 but left ten albums, about 160 songs: clear, slow-ish Zurich German with a lot of humor.",
    tip: "Pair it with the book below, which prints the lyrics in three languages."
  },
  zhtourism: {
    name: "Zürich Tourismus: Zürichdeutsch für Anfänger:innen", kind: "read", where: "online", lvl: 1, cost: "Free", dialect: "Zurich German",
    url: "https://www.zuerich.com/de/besuchen/praktische-informationen/zuerichdeutsch",
    what: "A short list of about 40 everyday Zurich words with their Standard German meaning, from Anke to Züri-Gschnätzlets.",
    tip: ""
  },
  kauderwelsch: {
    name: "Kauderwelsch: Schwiizertüütsch – Das Deutsch der Eidgenossen", kind: "read", where: "offline", lvl: 1, cost: "Paid (book)", dialect: "Swiss German overview",
    url: "https://www.reise-know-how.de/sites/default/files/kw_schwiizertuutsch_us_inhalt.pdf",
    what: "A pocket phrasebook by Reise Know-How (author Christine Eggenberg) that explains everyday Swiss German expressions. Not Zurich-only, but a friendly start.",
    tip: ""
  },
  regionaljournal: {
    name: "Regionaljournal Zürich Schaffhausen (Radio SRF 1)", kind: "listen", where: "online", lvl: 2, cost: "Free", dialect: "Zurich German",
    url: "https://www.srf.ch/audio/regionaljournal-zuerich-schaffhausen",
    what: "Daily regional news for Zurich and Schaffhausen, on the radio at 17:30 and as a podcast. Short, local and about places you know.",
    tip: "News repeats the same story across bulletins. Listen to the morning and evening version of one story."
  },
  neumatt: {
    name: "Neumatt (Play Suisse)", kind: "watch", where: "online", lvl: 2, cost: "Free with a Swiss address", dialect: "Zurich German",
    url: "https://www.playsuisse.ch/",
    what: "A drama series about a farming family near Zurich, filmed in the city and on a farm in Uster. Three seasons; Hochdeutsch subtitles available.",
    tip: "Play Suisse needs a free account with a Swiss postcode. Also on Netflix."
  },
  bideluet: {
    name: "SRF bi de Lüt", kind: "watch", where: "online", lvl: 2, cost: "Free", dialect: "Swiss German, many regions",
    url: "https://www.srf.ch/sendungen/srf-bi-de-luet",
    what: "SRF's family series about everyday life in Swiss villages and regions, such as «Landfrauenküche» and «Hüttengeschichten». Real people, real dialects.",
    tip: ""
  },
  mona: {
    name: "Mona mittendrin", kind: "watch", where: "online", lvl: 2, cost: "Free", dialect: "Thurgau German (host), plus guests",
    url: "https://www.srf.ch/play/tv/suche?query=Mona%20mittendrin",
    what: "Reporter Mona Vetsch spends three days in someone else's life, from street workers in Zurich to a mountain rescue team. Episodes on Play SRF often have subtitles.",
    tip: "Mona is from Thurgau, so her vowels differ a bit from Zurich. Good practice for hearing the difference."
  },
  dinimundart: {
    name: "Dini Mundart (Radio SRF 1 podcast)", kind: "listen", where: "online", lvl: 2, cost: "Free", dialect: "Swiss German, about dialect",
    url: "https://www.srf.ch/audio/dini-mundart",
    what: "SRF's dialect team discusses where words come from and how dialects change, with listener questions. A podcast about exactly what this site is about.",
    tip: ""
  },
  schtaernebook: {
    name: "Züritüütsch isch aifach schön / Zurich German is simply beautiful", kind: "read", where: "offline", lvl: 2, cost: "Paid (book)", dialect: "Zurich German",
    url: "https://www.exlibris.ch/de/buecher-buch/english-books/paul-g-schreier/zueritueuetsch-isch-aifach-schoen-zurich-german-is-simply-beautifu/id/9783833418884",
    what: "Schtärneföifi song lyrics transcribed in Zurich German and translated into Standard German and English. Read along while you listen.",
    tip: ""
  },
  egliwildi: {
    name: "Züritüütsch verstaa, Züritüütsch rede", kind: "read", where: "offline", lvl: 2, cost: "Paid (book + 2 CDs)", dialect: "Zurich German",
    url: "https://en.wikipedia.org/wiki/Zurich_German",
    what: "A course book by Renate Egli-Wildi (2007, 108 pages plus two audio CDs), published by the Zurich section of the Society for Swiss German.",
    tip: "Not easy to find new: ask at the library or look second-hand."
  },
  gredig: {
    name: "Gredig direkt", kind: "watch", where: "online", lvl: 3, cost: "Free", dialect: "Swiss German, varies by guest",
    url: "https://www.srf.ch/play/tv/suche?query=Gredig%20direkt",
    what: "Urs Gredig's one-on-one talk show with guests from politics, sport and culture. Long, natural conversation; also available as a podcast.",
    tip: ""
  },
  telezueri: {
    name: "TeleZüri (ZüriNews, TalkTäglich)", kind: "watch", where: "online", lvl: 3, cost: "Free", dialect: "Zurich German",
    url: "https://www.telezueri.ch/",
    what: "Zurich's regional TV station. All its own productions are in Swiss German: daily local news, the talk show TalkTäglich and the Sunday debate SonnTalk.",
    tip: "Debates are fast and people interrupt each other. That's the point."
  },
  radio24: {
    name: "Radio 24", kind: "listen", where: "online", lvl: 3, cost: "Free", dialect: "Zurich German",
    url: "https://www.radio24.ch/",
    what: "Zurich's private radio station, with the morning show «Ufsteller». Fast, chatty presenters between the songs.",
    tip: ""
  },
  bligg: {
    name: "Bligg", kind: "listen", where: "online", lvl: 3, cost: "Free to stream", dialect: "Zurich German",
    url: "https://open.spotify.com/search/Bligg",
    what: "Mundart rapper from Zurich-Schwamendingen and one of Switzerland's most successful artists, active for three decades.",
    tip: "Rap is the hardest test of all. Look up the lyrics and read along."
  },
  schnabelweid: {
    name: "Dini Mundart – Schnabelweid (Radio SRF 1)", kind: "listen", where: "online", lvl: 3, cost: "Free", dialect: "Swiss German, many regions",
    url: "https://www.srf.ch/audio/dini-mundart-schnabelweid",
    what: "SRF 1's weekly hour for dialect: readings by dialect authors, songs, and discussions about language.",
    tip: ""
  },
  hoerspiel: {
    name: "SRF Hörspiel", kind: "listen", where: "online", lvl: 3, cost: "Free", dialect: "Dialect and Standard German",
    url: "https://www.srf.ch/hoerspiel",
    what: "Radio plays and crime stories, many of them recorded in dialect. Pure listening, no pictures to help you.",
    tip: "Check each episode's description: some are in Standard German."
  },
  tschugger: {
    name: "Tschugger (Play Suisse)", kind: "watch", where: "online", lvl: 3, cost: "Free with a Swiss address", dialect: "Valais German",
    url: "https://www.playsuisse.ch/",
    what: "A cult police comedy from the Valais. Its dialect is so different that SRF added fixed subtitles: watch it for fun, and to hear how far Swiss dialects can drift apart.",
    tip: "Not Zurich German. Treat it as a bonus round."
  },
  gallmann: {
    name: "Zürichdeutsches Wörterbuch (Heinz Gallmann)", kind: "read", where: "offline", lvl: 3, cost: "Paid (book)", dialect: "Zurich German",
    url: "https://www.galaxus.ch/en/s12/product/zuerichdeutsches-woerterbuch-german-heinz-gallmann-2014-non-fiction-6615801",
    what: "The standard Zurich German dictionary (NZZ Libro, 2014 edition, 723 pages), with a Hochdeutsch–Zurich register at the back so you can look words up in both directions.",
    tip: ""
  },
  schobinger: {
    name: "Viktor Schobinger: Ääschme crime novels and language books", kind: "read", where: "offline", lvl: 3, cost: "Paid (books, around CHF 25)", dialect: "Zurich German",
    url: "https://www.zuerituetsch.ch/index.html",
    what: "More than 45 short crime novels written entirely in Zurich German, plus a short grammar and dictionaries. He uses his own spelling with extra accents, so expect a few surprises.",
    tip: "Order through the Buchhandlung im Volkshaus, Stauffacherstrasse 60."
  },
  idiotikon: {
    name: "Schweizerisches Idiotikon", kind: "read", where: "online", lvl: 3, cost: "Free", dialect: "All Swiss German",
    url: "https://www.idiotikon.ch/",
    what: "The great dictionary of Swiss German, searchable online. For the moment you want to know where a word really comes from.",
    tip: ""
  },
  pbzcafe: {
    name: "Schweizerdeutsch-Café (PBZ Pestalozzi-Bibliothek)", kind: "go", where: "offline", lvl: 1, cost: "Check the event page", dialect: "Zurich German",
    url: "https://www.pbz.ch/event-kalender/?series=schweizerdeutsch-cafe",
    what: "A relaxed weekly meet-up for adults who want to learn or play with Swiss German. Currently at PBZ Sihlcity, Wednesdays 10:00–11:00.",
    tip: "The city library also lends books and audio: ask for the Mundart shelf."
  },
  maerchen: {
    name: "Zürcher Märchenbühne", kind: "go", where: "offline", lvl: 1, cost: "Paid (tickets)", dialect: "Zurich German",
    url: "https://www.theaterhechtplatz.ch/",
    what: "Fairy tales on stage in dialect, every winter since 1963. Simple stories, clear voices, and you already know the plot.",
    tip: "The Theater am Hechtplatz is being renovated until spring 2027; shows run at Haus Seefeld meanwhile."
  },
  zhlam: {
    name: "mundartZHlam (Verein Züritüütsch)", kind: "go", where: "offline", lvl: 3, cost: "CHF 10–15", dialect: "Zurich German",
    url: "https://eventfrog.ch/de/events.html?searchTerm=mundartZHlam",
    what: "A poetry slam in Zurich German, organized by the Verein Züritüütsch. Fast, funny and full of wordplay.",
    tip: "Check Eventfrog for the next date."
  }
};

const PLAN = [
  {
    when: "Weeks 1–2", lvl: 1,
    title: "Short and predictable",
    text: "Start with material where you already know what's coming, so your ear can focus on the sounds.",
    sources: ["meteo", "easygerman", "schtaerne", "zhtourism", "kauderwelsch", "pbzcafe"]
  },
  {
    when: "Weeks 3–6", lvl: 2,
    title: "Real people, with subtitles",
    text: "Move to people talking freely. Keep Hochdeutsch subtitles on at first, and switch them off once you follow most of it.",
    sources: ["regionaljournal", "neumatt", "bideluet", "mona", "dinimundart", "schtaernebook", "egliwildi", "maerchen"]
  },
  {
    when: "Months 2–3", lvl: 3,
    title: "Fast and unscripted",
    text: "Talk shows, local TV and radio at full speed, a first real book in dialect, and a night out in Zurich German.",
    sources: ["gredig", "telezueri", "radio24", "schnabelweid", "hoerspiel", "bligg", "gallmann", "schobinger", "zhlam"]
  },
  {
    when: "Whenever you like", lvl: 3,
    title: "Bonus rounds",
    text: "For curiosity rather than progress: how far Swiss dialects can drift, and where the words come from.",
    sources: ["tschugger", "idiotikon"]
  }
];

const HABIT = "When you catch a word you didn't recognize, say the Standard German equivalent aloud and see which sound rule bridges them. After a few weeks you start doing it automatically.";


/*
 * Story page: each item is one full sentence that opens to show the details.
 * Read the titles in order and they tell the story on their own.
 * In the text, *word* is shown in italics.
 */
const STORY = [
  {
    title: "Swiss German isn't one language but a family of Alemannic dialects.",
    text: [
      "Swiss German is the umbrella name for the Alemannic dialects spoken in German-speaking Switzerland, by roughly 5.5 million people.",
      "Linguists split them into Low, High and Highest Alemannic, and each group divides again into local varieties, sometimes village by village. Speakers from different regions still understand each other almost effortlessly, even where the words differ."
    ],
    sources: [
      ["Swiss German (Wikipedia)", "https://en.wikipedia.org/wiki/Swiss_German"],
      ["Does Whisper understand Swiss German? (arXiv, 2024)", "https://arxiv.org/pdf/2404.19310"]
    ]
  },
  {
    title: "Those dialects go back to the Alemanni, who settled here in the early Middle Ages.",
    text: [
      "The Alemanni were a confederation of Germanic peoples, first named in Roman sources in 289 AD. Their name probably meant \"all men\", and it lives on in the French word for Germany: *Allemagne*.",
      "They settled the region in stages: north of the Rhine from the 5th century, and south of it, into what is now German-speaking Switzerland, from the 6th century on. Historians see them as the group that did most to make the region German-speaking."
    ],
    sources: [
      ["Deutsch (Historisches Lexikon der Schweiz)", "https://hls-dhs-dss.ch/de/articles/011194/"],
      ["Germanen (Historisches Lexikon der Schweiz)", "https://hls-dhs-dss.ch/de/articles/008026/"],
      ["Alemanni (Wikipedia)", "https://en.wikipedia.org/wiki/Alemanni"]
    ]
  },
  {
    title: "Zurich German is the High Alemannic dialect of the Canton of Zurich.",
    text: [
      "Its speakers call it *Züritüütsch*. High Alemannic covers most of the Swiss Plateau and splits into an eastern and a western group, with Zurich sitting in the middle between them.",
      "So when you learn to hear Zurich German, you are also halfway to understanding the dialects of the whole Plateau."
    ],
    sources: [
      ["Zurich German (Wikipedia)", "https://en.wikipedia.org/wiki/Zurich_German"],
      ["Swiss German (Wikipedia)", "https://en.wikipedia.org/wiki/Swiss_German"]
    ]
  },
  {
    title: "It kept the long vowels of medieval German, which is why Zeit is still Ziit.",
    text: [
      "In Middle High German, words like *mîn* and *hûs* had long vowels. From the 12th century, a change that began in south-eastern Austria turned these vowels into diphthongs, giving modern *mein* and *Haus*. By the 16th century it had spread across most of the German-speaking area, but not all of it.",
      "Swiss German never took part, so it still says *miin*, *Huus* and *Ziit*. It also kept the old gliding vowels that Hochdeutsch flattened: *lieb* is still said li-eb, and *gut* is still *guet*. That's rules 01 to 06 in this app."
    ],
    sources: [
      ["Chapter 21: Middle to New High German (Monash University)", "https://users.monash.edu.au/~ewilkins/textbook/CHAP21.PDF"],
      ["Swiss German features (The Linguist)", "https://thelinguist.uberflip.com/i/1463531/22"]
    ]
  },
  {
    title: "It also pushed one sound shift further than Hochdeutsch did, turning k into ch.",
    text: [
      "While the Alemanni were settling here, the High German consonant shift was spreading: from the 5th to the 8th century, *t* turned into *tz* or *s*, *p* into *pf* or *f*, and *k* into *ch*. Even the city's name went through it: Roman *Turicum* became *Zúriche*, today's Zürich.",
      "Hochdeutsch only took the k-step in some positions, as in *machen*. High Alemannic took it all the way, so a child is a *Chind* and a kitchen is a *Chuchi*, and the famous test word *Chuchichäschtli* (kitchen cupboard) is full of it. That's rule 07 in this app."
    ],
    sources: [
      ["Deutsch (Historisches Lexikon der Schweiz)", "https://hls-dhs-dss.ch/de/articles/011194/"],
      ["Alemannic German (Wikipedia)", "https://en.wikipedia.org/wiki/Alemannic_German"]
    ]
  },
  {
    title: "Yet the Swiss write in Hochdeutsch, and speak it only when they have to.",
    text: [
      "Linguists call this split diglossia, and German-speaking Switzerland was one of the classic cases Charles Ferguson used when he defined the term in 1959. Speaking happens in dialect, across all classes and levels of education. Writing happens in Standard German.",
      "Children learn Standard German at school from around age six. Spoken Standard German is kept for school, the news, parliament and conversations with people who don't understand the dialect, which is why Swiss interviews on German TV often get subtitles."
    ],
    sources: [
      ["Does Whisper understand Swiss German? (arXiv, 2024)", "https://arxiv.org/pdf/2404.19310"],
      ["Swiss German (Wikipedia)", "https://en.wikipedia.org/wiki/Swiss_German"],
      ["Deutsch (Historisches Lexikon der Schweiz)", "https://hls-dhs-dss.ch/de/articles/011194/"]
    ]
  },
  {
    title: "Their written Hochdeutsch has a Swiss flavor of its own, starting with the missing ß.",
    text: [
      "Swiss Standard German always writes ss: *Strasse*, *gross*, *Fussball*. (This site writes Hochdeutsch the way Germany and Austria do, with ß, since that's the German most visitors learned. When you type an answer, ss counts too.) The Canton of Zurich was the first to stop teaching the ß in schools, in 1935, and the *Neue Zürcher Zeitung* was the last Swiss newspaper to give it up, in 1974.",
      "It also has its own vocabulary, known as Helvetisms: *Spital* instead of Krankenhaus, *Velo* for bicycle, *Billett* for ticket, and many loanwords from French."
    ],
    sources: [
      ["German Orthographic Conference of 1901 (Wikipedia)", "https://en.wikipedia.org/wiki/German_Orthographic_Conference_of_1901"],
      ["Swiss Standard German (Wikipedia)", "https://en.wikipedia.org/wiki/Swiss_Standard_German"]
    ]
  },
  {
    title: "The spoken dialects, meanwhile, change from city to city, so Zurich, Bern and Basel are easy to tell apart.",
    text: [
      "Basel is the odd one out: its dialect is Low Alemannic, an island in High Alemannic country, so a child there is a *Kind*, not a *Chind*.",
      "Bern is known for turning l into a u-sound, so *Milch* becomes *Miuch*. Linguists have tracked this habit spreading south and west from Bern, but hardly toward Zurich or Basel."
    ],
    sources: [
      ["Basel German (Wikipedia)", "https://en.wikipedia.org/wiki/Basel_German"],
      ["The diffusion of /l/-vocalization in Swiss German (Cambridge)", "https://www.cambridge.org/core/journals/language-variation-and-change/article/diffusion-of-lvocalization-in-swiss-german/4AA92B479B21056EC82FEA6034D28AAA"],
      ["Urban dialects in the city of Bern (University of Bern)", "https://boris.unibe.ch/141547/1/UrbanDialects_Bern.pdf"]
    ]
  },
  {
    title: "Because the dialects were made for speaking, they have no official spelling.",
    text: [
      "For a long time Swiss German was almost only spoken, so there is no rulebook. The best-known guide is Eugen Dieth's *Schwyzertütschi Dialäktschrift* from 1938, which writes words as they sound: short vowels with one letter, long vowels with two, as in *Huus* and *Ziit*. This app follows that style.",
      "Bern has its own system from 1972 that stays closer to Hochdeutsch. In everyday messages, most people simply spell the way it feels right."
    ],
    sources: [
      ["Wie schreibe ich Mundart? (SRF)", "https://www.srf.ch/radio-srf-1/mundart/dialekt-schrift-wie-schreibe-ich-mundart"],
      ["Eugen Dieth (Wikipedia)", "https://en.wikipedia.org/wiki/Eugen_Dieth"]
    ]
  },
  {
    title: "Linguists have been collecting their words in one dictionary since 1862, and it still isn't finished.",
    text: [
      "The *Schweizerisches Idiotikon* was founded in Zurich in 1862 by an association led by Friedrich Staub. Its first part appeared in 1881, and it built on earlier collections going back to 1806.",
      "It records around 150,000 words from the late Middle Ages to today, across 16 printed volumes, with the 17th, covering Z, still being written. You can search all of it for free online."
    ],
    sources: [
      ["Schweizerisches Idiotikon (Wikipedia)", "https://en.wikipedia.org/wiki/Schweizerisches_Idiotikon"],
      ["«Tschegge» und «Tröpsli» online nachschauen (swissinfo)", "https://www.swissinfo.ch/ger/-tschegge--und--troepsli--online-nachschauen/28706952"],
      ["idiotikon.ch", "https://www.idiotikon.ch/"]
    ]
  },
  {
    title: "In 2011, Zurich voters even made dialect the teaching language in kindergarten.",
    text: [
      "On 15 May 2011, voters in the Canton of Zurich accepted the popular initiative «JA zur Mundart im Kindergarten» with 53.9% of the vote.",
      "Since then, the law says that dialect is, in principle, the teaching language in Zurich kindergartens. Aargau later became the second canton to pass a similar initiative."
    ],
    sources: [
      ["Unterrichtssprache im Kindergarten neu geregelt (Kanton Zürich)", "https://www.zh.ch/de/news-uebersicht/medienmitteilungen/2011/11/311_unterrichtssprache.html"],
      ["Kantonale Abstimmungen 2011 (Année politique suisse)", "https://www.anneepolitique.swiss/static_files/Tabellen%202011.pdf"],
      ["Aargauer Dialekt-Initiative angenommen (SRF)", "https://www.srf.ch/news/schweiz/abstimmungen-ag-rueebli-statt-karotte-aargauer-dialekt-initiative-ist-angenommen"]
    ]
  },
  {
    title: "And today, Zurich German is more alive than ever, from WhatsApp chats to the schoolyard.",
    text: [
      "More and more people now write their dialect too, from greeting cards to text messages. Researchers at the University of Zurich are studying how young people with migration backgrounds are shaping new, multiethnic varieties of it.",
      "And despite worries that Zurich German will swallow the other dialects, linguists say that's not quite what is happening: regional varieties around Zurich, Bern and Basel are forming instead, and the differences will still be audible decades from now."
    ],
    sources: [
      ["Wie schreibe ich Mundart? (SRF)", "https://www.srf.ch/radio-srf-1/mundart/dialekt-schrift-wie-schreibe-ich-mundart"],
      ["Multiethnolektales Zürichdeutsch (Universität Zürich, LMU)", "https://lipp.ub.uni-muenchen.de/lipp/article/download/4895/2770/7856"],
      ["Sprechen wir eines Tages alle Züritüütsch? (SRF)", "https://www.srf.ch/kultur/gesellschaft-religion/schwindende-dialektvielfalt-sprechen-wir-eines-tages-alle-nur-noch-zueritueuetsch"]
    ]
  }
];

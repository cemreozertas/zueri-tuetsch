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
 *   PLAN        the listening plan
 *
 * Spelling: Swiss German has no official spelling. This file follows the
 * common "Dieth" style used in Zurich (long vowels doubled: Huus, Ziit).
 */

const REPO_URL = "https://github.com/cemreozertas/zueri-tuetsch";

const RULES = [
  {
    id: "ei",
    from: "ei", to: "ii",
    title: "Where Hochdeutsch has ei, you often hear ii",
    explain: "Many words with ei keep the old long i that Standard German turned into ei.",
    examples: [["Zeit", "Ziit"], ["mein", "miin"], ["bleiben", "bliibe"], ["schreiben", "schriibe"], ["Eis", "Iis"]],
    reverse: "Hear ii? Try ei.",
    caveat: "Not every ei moves: zwei, heiss and Fleisch stay the same."
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
    reverse: "Hear üü? Try eu or äu."
  },
  {
    id: "ue",
    from: "u (long)", to: "ue",
    title: "Where Hochdeutsch has a long u, you often hear ue",
    explain: "A gliding u-e sound where Standard German has a plain long u.",
    examples: [["gut", "guet"], ["Bruder", "Brueder"], ["Fuss", "Fuess"], ["Kuh", "Chue"]],
    reverse: "Hear ue? Drop the e."
  },
  {
    id: "ueh",
    from: "ü (long)", to: "üe",
    title: "Where Hochdeutsch has a long ü, you often hear üe",
    explain: "The umlauted version of ue. It's also hiding inside Grüezi (grüssen).",
    examples: [["müde", "müed"], ["früh", "früe"], ["grüssen", "grüesse"], ["Füsse", "Füess"]],
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
  // Greetings
  { zd: "Grüezi", hd: "Guten Tag (formal)", cat: "greetings" },
  { zd: "Grüezi mitenand", hd: "Guten Tag zusammen (to a group)", cat: "greetings" },
  { zd: "Hoi / Sali", hd: "Hallo (informal)", cat: "greetings" },
  { zd: "Tschau zäme", hd: "Tschüss zusammen", cat: "greetings" },
  { zd: "Uf Widerluege", hd: "Auf Wiedersehen", cat: "greetings" },
  { zd: "Merci vielmal", hd: "Vielen Dank", cat: "greetings" },
  { zd: "Gern gschee", hd: "Gern geschehen", cat: "greetings" },
  { zd: "En Guete", hd: "Guten Appetit", cat: "greetings" },
  { zd: "Sali zäme", hd: "Hallo zusammen (informal)", cat: "greetings" },
  { zd: "Gueten Morge", hd: "Guten Morgen", cat: "greetings" },
  { zd: "Schöne Tag", hd: "Schönen Tag", cat: "greetings" },
  { zd: "Schöne Abig", hd: "Schönen Abend", cat: "greetings" },
  { zd: "Adieu", hd: "Auf Wiedersehen, tschüss", cat: "greetings", note: "Said with a German stress: A-dieu." },
  { zd: "Bis spöter", hd: "Bis später", cat: "greetings" },
  { zd: "Häb's guet", hd: "Mach's gut", cat: "greetings" },
  { zd: "Exgüsi", hd: "Entschuldigung", cat: "greetings", note: "From French excusez." },

  // Verbs
  { zd: "luege", hd: "schauen", cat: "verbs", ex: "Lueg emal! = Schau mal!" },
  { zd: "lose", hd: "zuhören", cat: "verbs", ex: "Los mal! = Hör mal zu!" },
  { zd: "schaffe", hd: "arbeiten", cat: "verbs" },
  { zd: "poschte", hd: "einkaufen", cat: "verbs" },
  { zd: "zügle", hd: "umziehen", cat: "verbs" },
  { zd: "springe", hd: "rennen", cat: "verbs", note: "Not \"springen\"!" },
  { zd: "gumpe", hd: "springen, hüpfen", cat: "verbs" },
  { zd: "schmöcke", hd: "riechen", cat: "verbs", note: "Not \"schmecken\"!" },
  { zd: "wott", hd: "will", cat: "verbs" },
  { zd: "cha", hd: "kann", cat: "verbs" },
  { zd: "mues", hd: "muss", cat: "verbs" },
  { zd: "chunnt", hd: "kommt", cat: "verbs" },
  { zd: "gaht", hd: "geht", cat: "verbs" },
  { zd: "gönd", hd: "gehen (wir/sie)", cat: "verbs" },
  { zd: "laufe", hd: "gehen (zu Fuss)", cat: "verbs", note: "Not \"rennen\"!" },
  { zd: "verzelle", hd: "erzählen", cat: "verbs" },
  { zd: "schnure", hd: "reden, plaudern", cat: "verbs" },
  { zd: "chrampfe", hd: "hart arbeiten", cat: "verbs" },
  { zd: "pfuse", hd: "schlafen", cat: "verbs" },
  { zd: "hocke", hd: "sitzen", cat: "verbs", ex: "Hock ab! = Setz dich!" },
  { zd: "aalüüte", hd: "anrufen", cat: "verbs", ex: "Ich lüüt dir aa. = Ich rufe dich an." },
  { zd: "tschuute", hd: "Fussball spielen", cat: "verbs" },
  { zd: "chlöne", hd: "jammern", cat: "verbs" },
  { zd: "pressiere", hd: "sich beeilen", cat: "verbs", ex: "Es pressiert. = Es eilt." },
  { zd: "zahle", hd: "bezahlen", cat: "verbs", ex: "Zahle, bitte! = Die Rechnung, bitte!" },
  { zd: "glette", hd: "bügeln", cat: "verbs" },
  { zd: "wüsche", hd: "fegen, kehren", cat: "verbs" },
  { zd: "grilliere", hd: "grillen", cat: "verbs" },

  // Small words
  { zd: "öppis", hd: "etwas", cat: "small" },
  { zd: "öpper", hd: "jemand", cat: "small" },
  { zd: "nüt", hd: "nichts", cat: "small" },
  { zd: "nöd", hd: "nicht", cat: "small", note: "In Bern it's nid." },
  { zd: "gäll", hd: "nicht wahr?", cat: "small" },
  { zd: "es hät", hd: "es gibt", cat: "small" },
  { zd: "echt", hd: "wirklich", cat: "small" },
  { zd: "grad", hd: "gerade", cat: "small" },
  { zd: "sicher", hd: "bestimmt", cat: "small" },
  { zd: "chli", hd: "ein bisschen; klein", cat: "small" },
  { zd: "geschter", hd: "gestern", cat: "small" },
  { zd: "morn", hd: "morgen", cat: "small" },
  { zd: "scho", hd: "schon", cat: "small" },
  { zd: "dihei", hd: "zu Hause", cat: "small" },
  { zd: "dusse", hd: "draussen", cat: "small" },
  { zd: "öppe", hd: "etwa, ungefähr", cat: "small" },
  { zd: "öppedie", hd: "manchmal", cat: "small" },
  { zd: "nüme", hd: "nicht mehr", cat: "small" },
  { zd: "zerscht", hd: "zuerst", cat: "small" },
  { zd: "vorig", hd: "vorhin", cat: "small" },
  { zd: "hüür", hd: "dieses Jahr", cat: "small" },
  { zd: "fern", hd: "letztes Jahr", cat: "small" },
  { zd: "allwäg", hd: "wohl, vermutlich", cat: "small" },
  { zd: "äbe", hd: "eben, genau", cat: "small" },
  { zd: "äxtra", hd: "absichtlich", cat: "small", note: "Not \"extra\" as in additional." },
  { zd: "gliich", hd: "gleich; trotzdem", cat: "small", ex: "Es isch mer gliich. = Es ist mir egal." },
  { zd: "würkli", hd: "wirklich", cat: "small" },
  { zd: "eso", hd: "so", cat: "small" },
  { zd: "oder?", hd: "nicht wahr?", cat: "small", note: "Ends half of all Swiss sentences." },
  { zd: "mega", hd: "sehr", cat: "small" },
  { zd: "tipptopp", hd: "einwandfrei, bestens", cat: "small" },

  // Food and meals
  { zd: "Zmorge", hd: "Frühstück", cat: "food" },
  { zd: "Znüni", hd: "Pausensnack am Vormittag", cat: "food" },
  { zd: "Zmittag", hd: "Mittagessen", cat: "food" },
  { zd: "Zvieri", hd: "Snack am Nachmittag", cat: "food" },
  { zd: "Znacht", hd: "Abendessen", cat: "food" },
  { zd: "Anke", hd: "Butter", cat: "food" },
  { zd: "Rüebli", hd: "Karotte", cat: "food" },
  { zd: "Härdöpfel", hd: "Kartoffel", cat: "food" },
  { zd: "Gipfeli", hd: "Croissant", cat: "food" },
  { zd: "Weggli", hd: "Brötchen", cat: "food" },
  { zd: "Poulet", hd: "Hähnchen", cat: "food" },
  { zd: "Glace", hd: "Speiseeis", cat: "food" },
  { zd: "Rahm", hd: "Sahne", cat: "food" },
  { zd: "Kafi", hd: "Kaffee", cat: "food" },
  { zd: "Schoggi", hd: "Schokolade", cat: "food" },
  { zd: "Guetzli", hd: "Kekse, Plätzchen", cat: "food" },
  { zd: "Zältli", hd: "Bonbon", cat: "food" },
  { zd: "Bürli", hd: "rustikales Brötchen", cat: "food" },
  { zd: "Nüsslisalat", hd: "Feldsalat", cat: "food" },
  { zd: "Peterli", hd: "Petersilie", cat: "food" },
  { zd: "Rande", hd: "Rote Bete", cat: "food" },
  { zd: "Chabis", hd: "Kohl", cat: "food", note: "Also means nonsense: Das isch Chabis!" },
  { zd: "Zwätschge", hd: "Pflaume", cat: "food" },
  { zd: "Chriesi", hd: "Kirschen", cat: "food" },
  { zd: "Gschwellti", hd: "Pellkartoffeln", cat: "food" },
  { zd: "Härdöpfelstock", hd: "Kartoffelpüree", cat: "food" },
  { zd: "Wienerli", hd: "Wiener Würstchen", cat: "food" },
  { zd: "Pommes Chips", hd: "Kartoffelchips", cat: "food" },
  { zd: "Hahnewasser", hd: "Leitungswasser", cat: "food" },
  { zd: "Kafi Crème", hd: "Kaffee mit Rahm", cat: "food" },
  { zd: "Stange", hd: "kleines Bier vom Fass (3 dl)", cat: "food" },
  { zd: "Panaché", hd: "Radler", cat: "food" },
  { zd: "Apéro", hd: "Umtrunk mit Häppchen", cat: "food" },

  // Everyday life
  { zd: "Velo", hd: "Fahrrad", cat: "everyday" },
  { zd: "Poschti", hd: "Einkäufe", cat: "everyday", ex: "d Poschti mache = einkaufen" },
  { zd: "Chuchichäschtli", hd: "Küchenschrank", cat: "everyday", note: "The classic test word." },
  { zd: "Finke", hd: "Hausschuhe", cat: "everyday" },
  { zd: "Trottoir", hd: "Gehsteig", cat: "everyday" },
  { zd: "Perron", hd: "Bahnsteig", cat: "everyday" },
  { zd: "Billett", hd: "Fahrkarte", cat: "everyday" },
  { zd: "Spital", hd: "Krankenhaus", cat: "everyday" },
  { zd: "Estrich", hd: "Dachboden", cat: "everyday", note: "Not the floor screed!" },
  { zd: "Coiffeur", hd: "Friseur", cat: "everyday" },
  { zd: "Stutz", hd: "Franken (umgangssprachlich)", cat: "everyday" },
  { zd: "Ferie", hd: "Urlaub", cat: "everyday" },
  { zd: "Lavabo", hd: "Waschbecken", cat: "everyday" },
  { zd: "Abwart", hd: "Hausmeister", cat: "everyday" },
  { zd: "Wöschchuchi", hd: "Waschküche", cat: "everyday", note: "Shared laundry room, with a booking plan." },
  { zd: "Ghüder", hd: "Müll", cat: "everyday", ex: "de Ghüdersack = der Müllsack" },
  { zd: "Pöstler", hd: "Briefträger", cat: "everyday" },
  { zd: "Kondukteur", hd: "Zugbegleiter", cat: "everyday" },
  { zd: "Trottinett", hd: "Tretroller", cat: "everyday" },
  { zd: "Töff", hd: "Motorrad", cat: "everyday" },
  { zd: "Chilbi", hd: "Jahrmarkt, Kirmes", cat: "everyday" },
  { zd: "Pfnüsel", hd: "Schnupfen", cat: "everyday" },
  { zd: "Gotte / Götti", hd: "Patin / Pate", cat: "everyday" },
  { zd: "Bünzli", hd: "Spiesser", cat: "everyday" },
  { zd: "Zapfezieher", hd: "Korkenzieher", cat: "everyday" },

  // Days of the week
  { zd: "Määntig", hd: "Montag", cat: "days" },
  { zd: "Ziischtig", hd: "Dienstag", cat: "days", note: "Sounds nothing like Dienstag, so learn it by heart." },
  { zd: "Mittwuch", hd: "Mittwoch", cat: "days" },
  { zd: "Dunschtig", hd: "Donnerstag", cat: "days" },
  { zd: "Friitig", hd: "Freitag", cat: "days" },
  { zd: "Samschtig", hd: "Samstag", cat: "days" },
  { zd: "Sunntig", hd: "Sonntag", cat: "days" },

  // Phrases
  { zd: "Chönd Sie das nomal säge?", hd: "Können Sie das noch mal sagen?", cat: "phrases", note: "The most useful sentence for this whole app." },
  { zd: "Ich verstah nüt.", hd: "Ich verstehe nichts.", cat: "phrases" },
  { zd: "Chasch mer hälfe?", hd: "Kannst du mir helfen?", cat: "phrases" },
  { zd: "Kei Ahnig.", hd: "Keine Ahnung.", cat: "phrases" },
  { zd: "Es isch mer gliich.", hd: "Es ist mir egal.", cat: "phrases" },
  { zd: "Chunnt scho guet.", hd: "Das wird schon.", cat: "phrases" },
  { zd: "Bisch zwäg?", hd: "Geht's dir gut?", cat: "phrases" },
  { zd: "Es schiffet.", hd: "Es regnet in Strömen.", cat: "phrases" },
  { zd: "Hopp Schwiiz!", hd: "Los, Schweiz!", cat: "phrases" },
  { zd: "Gopfertelli!", hd: "Verflixt!", cat: "phrases", note: "A mild curse, fine in company." },

  // False friends
  { zd: "Peperoni", hd: "Paprika (das Gemüse)", cat: "false-friends", note: "Not a hot chili." },
  { zd: "Puff", hd: "Unordnung", cat: "false-friends", ex: "Was für es Puff! = Was für eine Unordnung!" },
  { zd: "Hosesack", hd: "Hosentasche", cat: "false-friends" },
  { zd: "Hafe", hd: "Kochtopf", cat: "false-friends", note: "Not a harbour." },
  { zd: "Schale", hd: "Milchkaffee", cat: "false-friends", note: "Not a bowl: e Schale is a cup of milky coffee." }
];

const CATEGORIES = {
  "greetings": "Greetings",
  "verbs": "Verbs",
  "small": "Small words",
  "food": "Food & meals",
  "everyday": "Everyday life",
  "days": "Days",
  "phrases": "Phrases",
  "false-friends": "False friends"
};

/*
 * Quiz: "reverse it into Standard German".
 * hd: every accepted answer (case and punctuation are ignored).
 * rules: ids from RULES that the item practises.
 */
const QUIZ = {
  words: [
    { zd: "Ziit", hd: ["Zeit"], rules: ["ei"] },
    { zd: "Huus", hd: ["Haus"], rules: ["au"] },
    { zd: "Lüüt", hd: ["Leute"], rules: ["eu"] },
    { zd: "guet", hd: ["gut"], rules: ["ue"] },
    { zd: "Brueder", hd: ["Bruder"], rules: ["ue"] },
    { zd: "müed", hd: ["müde"], rules: ["ueh"] },
    { zd: "Chind", hd: ["Kind"], rules: ["k"] },
    { zd: "Chuchi", hd: ["Küche"], rules: ["k"] },
    { zd: "bliibe", hd: ["bleiben"], rules: ["ei", "en"] },
    { zd: "bruuche", hd: ["brauchen"], rules: ["au", "en"] },
    { zd: "hüt", hd: ["heute"], rules: ["eu"] },
    { zd: "Fuess", hd: ["Fuss", "Fuß"], rules: ["ue"] },
    { zd: "gmacht", hd: ["gemacht"], rules: ["ge"] },
    { zd: "mache", hd: ["machen"], rules: ["en"] },
    { zd: "Ziitig", hd: ["Zeitung"], rules: ["ei", "ung"] },
    { zd: "Wonig", hd: ["Wohnung"], rules: ["ung"] },
    { zd: "Poscht", hd: ["Post"], rules: ["st"] },
    { zd: "Gäld", hd: ["Geld"], rules: ["ae"] },
    { zd: "Hüüser", hd: ["Häuser"], rules: ["eu"] },
    { zd: "früe", hd: ["früh"], rules: ["ueh"] },
    { zd: "Iis", hd: ["Eis"], rules: ["ei"] },
    { zd: "schriibe", hd: ["schreiben"], rules: ["ei", "en"] },
    { zd: "Muus", hd: ["Maus"], rules: ["au"] },
    { zd: "Chääs", hd: ["Käse"], rules: ["k"] },
    { zd: "Fescht", hd: ["Fest"], rules: ["st"] },
    { zd: "Rächnig", hd: ["Rechnung"], rules: ["ae", "ung"] },
    { zd: "chaufe", hd: ["kaufen"], rules: ["k", "en"] },
    { zd: "Hüüsli", hd: ["Häuschen"], rules: ["eu", "li"] },
    { zd: "gseh", hd: ["gesehen"], rules: ["ge"] },
    { zd: "grüesse", hd: ["grüssen", "grüßen"], rules: ["ueh", "en"] }
  ],
  sentences: [
    { zd: "Das isch guet.", hd: ["Das ist gut."], rules: ["st", "ue"] },
    { zd: "Ich bi müed.", hd: ["Ich bin müde."], rules: ["ueh"] },
    { zd: "Ich ha hüt kei Ziit.", hd: ["Ich habe heute keine Zeit.", "Ich hab heute keine Zeit."], rules: ["eu", "ei", "en"] },
    { zd: "Mer gönd hüt is Kino.", hd: ["Wir gehen heute ins Kino."], rules: ["eu"] },
    { zd: "Chunnsch au?", hd: ["Kommst du auch?"], rules: ["k"] },
    { zd: "D Chind sind dusse.", hd: ["Die Kinder sind draussen.", "Die Kinder sind draußen."], rules: ["k"] },
    { zd: "Ich mues no poschte.", hd: ["Ich muss noch einkaufen."], rules: [] },
    { zd: "Häsch öppis gseh?", hd: ["Hast du etwas gesehen?"], rules: ["ge"] },
    { zd: "Mer zügled nach Züri.", hd: ["Wir ziehen nach Zürich um."], rules: [] },
    { zd: "Es hät no Gipfeli.", hd: ["Es gibt noch Croissants.", "Es gibt noch Gipfeli."], rules: ["li"] },
    { zd: "Ich ha s Velo dihei gla.", hd: ["Ich habe das Fahrrad zu Hause gelassen.", "Ich habe das Velo zu Hause gelassen.", "Ich habe das Fahrrad daheim gelassen."], rules: ["ge"] },
    { zd: "Bisch scho lang da?", hd: ["Bist du schon lange da?", "Bist du schon lang da?"], rules: ["st"] },
    { zd: "Mer gseht sich!", hd: ["Man sieht sich!"], rules: [] },
    { zd: "Ich bin geschter im Spital gsi.", hd: ["Ich war gestern im Krankenhaus.", "Ich bin gestern im Krankenhaus gewesen."], rules: ["ge"] },
    { zd: "Lueg, de Brueder schafft dihei.", hd: ["Schau, der Bruder arbeitet zu Hause.", "Schau, der Bruder arbeitet daheim."], rules: ["ue"] }
  ]
};

const PLAN = [
  {
    when: "Weeks 1–2",
    title: "Short and familiar",
    text: "Pick dialect content where you already know what's coming.",
    items: [
      "SRF Meteo: short, predictable topic, spoken in dialect.",
      "Radio SRF 1 or SRF 3 in the background: the hosts speak dialect between songs."
    ]
  },
  {
    when: "Weeks 3–6",
    title: "Conversation",
    text: "Move to people talking freely. Use Standard German subtitles at first and switch them off once you follow about 70%.",
    items: [
      "Zivadiliring (SRF podcast): casual chatter from the Zurich area.",
      "Gredig direkt (SRF): longer interviews."
    ]
  },
  {
    when: "Then",
    title: "Fiction and variety",
    text: "Series with real dialogue, sorted by difficulty.",
    items: [
      "Neumatt (Netflix / Play Suisse): set near Zurich.",
      "Der Bestatter: Aargau dialect, close to Zurich's.",
      "Tschugger: save it for later. Valais dialect is hard even for Swiss people."
    ]
  },
  {
    when: "Throughout",
    title: "Real life",
    text: "The best material is free and all around you.",
    items: [
      "Tram announcements, bakery small talk, overheard conversations.",
      "Play Suisse (free with a Swiss address): lots of dialect content with subtitles."
    ]
  }
];

const HABIT = "When you catch a word you didn't recognise, say the Standard German equivalent aloud and see which sound rule bridges them. After a few weeks you start doing it automatically.";


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
    title: "Their written Hochdeutsch has a Swiss flavour of its own, starting with the missing ß.",
    text: [
      "Swiss Standard German always writes ss: *Strasse*, *gross*, *Fussball*. The Canton of Zurich was the first to stop teaching the ß in schools, in 1935, and the *Neue Zürcher Zeitung* was the last Swiss newspaper to give it up, in 1974.",
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
      "Bern is known for turning l into a u-sound, so *Milch* becomes *Miuch*. Linguists have tracked this habit spreading south and west from Bern, but hardly towards Zurich or Basel."
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

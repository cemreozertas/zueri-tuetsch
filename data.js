/*
 * Zürichdeutsch Decoder: content
 * ------------------------------
 * Everything the app shows lives in this one file, so you can add words,
 * rules or quiz items without touching the app code.
 *
 *   RULES       sound shifts (Standard German -> Zürichdeutsch)
 *   GRAMMAR     grammar shortcuts that help comprehension
 *   VOCAB       words the rules don't explain: learn them by heart (flashcards)
 *   QUIZ        "reverse it into Standard German" items
 *   PLAN        the listening plan
 *
 * Spelling: Swiss German has no official spelling. This file follows the
 * common "Dieth" style used in Zürich (long vowels doubled: Huus, Ziit).
 */

const REPO_URL = "https://github.com/cemreozertas/zueri-tuetsch";

const RULES = [
  {
    id: "ei",
    from: "ei", to: "ii",
    title: "ei becomes ii",
    explain: "Many words with ei keep the old long i that Standard German turned into ei.",
    examples: [["Zeit", "Ziit"], ["mein", "miin"], ["bleiben", "bliibe"], ["schreiben", "schriibe"], ["Eis", "Iis"]],
    reverse: "Hear ii? Try ei.",
    caveat: "Not every ei moves: zwei, heiss and Fleisch stay the same."
  },
  {
    id: "au",
    from: "au", to: "uu",
    title: "au becomes uu",
    explain: "Same story as ei: an old long u that Standard German turned into au.",
    examples: [["Haus", "Huus"], ["auf", "uf"], ["brauchen", "bruuche"], ["Maus", "Muus"], ["aus", "us"]],
    reverse: "Hear uu (or a short u in uf, us)? Try au.",
    caveat: "Some au words stay au: Baum, kaufen → chaufe."
  },
  {
    id: "eu",
    from: "eu / äu", to: "üü",
    title: "eu and äu become üü",
    explain: "The plural or umlauted partner of the au → uu shift.",
    examples: [["heute", "hüt"], ["Leute", "Lüüt"], ["Häuser", "Hüüser"], ["Feuer", "Füür"]],
    reverse: "Hear üü? Try eu or äu."
  },
  {
    id: "ue",
    from: "u (long)", to: "ue",
    title: "long u becomes ue",
    explain: "A gliding u-e sound where Standard German has a plain long u.",
    examples: [["gut", "guet"], ["Bruder", "Brueder"], ["Fuss", "Fuess"], ["Kuh", "Chue"]],
    reverse: "Hear ue? Drop the e."
  },
  {
    id: "ueh",
    from: "ü (long)", to: "üe",
    title: "long ü becomes üe",
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
    title: "k becomes ch",
    explain: "At the start of a word, k is a throaty ch, like in Bach.",
    examples: [["Kind", "Chind"], ["Küche", "Chuchi"], ["kommen", "cho"], ["Käse", "Chääs"], ["kaufen", "chaufe"]],
    reverse: "Hear ch at the start of a word? Try k.",
    caveat: "Newer loanwords keep k: Kafi (coffee), Kiosk, Konto."
  },
  {
    id: "en",
    from: "-en", to: "-e",
    title: "the final n disappears",
    explain: "Verbs (and many nouns) lose their final n. Some short verbs shrink even more.",
    examples: [["machen", "mache"], ["Garten", "Garte"], ["gehen", "gaa"], ["haben", "ha"]],
    reverse: "Word ends in e? It probably ends in -en."
  },
  {
    id: "ge",
    from: "ge- (participle)", to: "g- / nothing",
    title: "ge- shrinks to g- or disappears",
    explain: "Past participles keep only a g, or nothing at all.",
    examples: [["gemacht", "gmacht"], ["gewesen", "gsi"], ["gehabt", "gha"], ["gesehen", "gseh"], ["gekommen", "cho"]],
    reverse: "g + consonant at the start? Add an e: ge-."
  },
  {
    id: "st",
    from: "st", to: "scht",
    title: "st becomes scht everywhere",
    explain: "Standard German says scht only at the start of a word. Zürich says it everywhere.",
    examples: [["ist", "isch"], ["Post", "Poscht"], ["fast", "fascht"], ["Fest", "Fescht"], ["Wurst", "Wurscht"]],
    reverse: "Hear scht in the middle or at the end? Try st."
  },
  {
    id: "ung",
    from: "-ung", to: "-ig",
    title: "-ung becomes -ig",
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
    title: "short e opens up to ä",
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

  // Days of the week
  { zd: "Määntig", hd: "Montag", cat: "days" },
  { zd: "Ziischtig", hd: "Dienstag", cat: "days", note: "Sounds nothing like Dienstag, so learn it by heart." },
  { zd: "Mittwuch", hd: "Mittwoch", cat: "days" },
  { zd: "Dunschtig", hd: "Donnerstag", cat: "days" },
  { zd: "Friitig", hd: "Freitag", cat: "days" },
  { zd: "Samschtig", hd: "Samstag", cat: "days" },
  { zd: "Sunntig", hd: "Sonntag", cat: "days" },

  // False friends
  { zd: "Peperoni", hd: "Paprika (das Gemüse)", cat: "false-friends", note: "Not a hot chili." },
  { zd: "Puff", hd: "Unordnung", cat: "false-friends", ex: "Was für es Puff! = Was für eine Unordnung!" },
  { zd: "Hosesack", hd: "Hosentasche", cat: "false-friends" }
];

const CATEGORIES = {
  "greetings": "Greetings",
  "verbs": "Verbs",
  "small": "Small words",
  "food": "Food & meals",
  "everyday": "Everyday life",
  "days": "Days",
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
      "Zivadiliring (SRF podcast): casual chatter from the Zürich area.",
      "Gredig direkt (SRF): longer interviews."
    ]
  },
  {
    when: "Then",
    title: "Fiction and variety",
    text: "Series with real dialogue, sorted by difficulty.",
    items: [
      "Neumatt (Netflix / Play Suisse): set near Zürich.",
      "Der Bestatter: Aargau dialect, close to Zürich's.",
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

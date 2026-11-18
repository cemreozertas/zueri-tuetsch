/*
 * Worksheets.
 * Each worksheet has a Zurich German text, its Hochdeutsch version, and exercise sections.
 * Section types:
 *   choice  – multiple choice; "answer" is the index of the right option
 *   decode  – type the Hochdeutsch word; "rule" is the rule id (or "" for a vocabulary word)
 *   match   – pick the right meaning from a list
 *   gaps    – fill the gap in a sentence; write the gap as ___
 *   listen  – a task with a real source; free notes, nothing to check
 *   write   – free writing or speaking; "example" is a model answer
 * To add a worksheet, copy the first one, give it a new id and change the content.
 * Until a native speaker has checked a text, it shows "Written by a learner, for learners: corrections welcome".
 * Once checked, set proofread to the reviewer's name and it shows "Proofread by …" instead.
 */
const WORKSHEETS = [
  {
    id: "samschtig",
    lvl: 1,
    title: "En Samschtig in Züri",
    subtitle: "A Saturday in Zurich",
    proofread: "",
    minutes: 25,
    text: [
      "Am Samschtig stahn ich am achti uf. Zerscht mach ich mir en Kafi und lueg zum Fänschter uus: Es schiffet. Egal, ich mues no go poschte. Mit em Velo gaht das nöd, also nimm ich s Tram.",
      "Im Tram ghör ich zwei Fraue schnure. Di eint verzellt, dass ihre Brueder nach Bern zügelt. «Gopfertelli», seit di ander, «dänn gseht me ihn ja nüme!»",
      "Im Lade chauf ich Brot, Anke, Chääs und es paar Rüebli. Bim Zahle fröget mich d Verchäuferin: «Bruuched Si es Säckli?» Ich säg: «Nei, merci.»",
      "Dihei mach ich mir es feins Zmittag. Am Namittag schiint d Sunne wider, und ich gang mit Fründe go Glace ässe. Es isch en schöne Tag gsi."
    ],
    translation: [
      "Am Samstag stehe ich um acht auf. Zuerst mache ich mir einen Kaffee und schaue aus dem Fenster: Es regnet in Strömen. Egal, ich muss noch einkaufen gehen. Mit dem Fahrrad geht das nicht, also nehme ich die Straßenbahn.",
      "In der Straßenbahn höre ich zwei Frauen plaudern. Die eine erzählt, dass ihr Bruder nach Bern umzieht. «Verflixt», sagt die andere, «dann sieht man ihn ja nicht mehr!»",
      "Im Laden kaufe ich Brot, Butter, Käse und ein paar Karotten. Beim Bezahlen fragt mich die Verkäuferin: «Brauchen Sie eine Tüte?» Ich sage: «Nein, danke.»",
      "Zu Hause mache ich mir ein feines Mittagessen. Am Nachmittag scheint die Sonne wieder, und ich gehe mit Freunden ein Eis essen. Es war ein schöner Tag."
    ],
    sections: [
      {
        type: "choice",
        title: "Did you get it?",
        intro: "Read the text, then choose the right answer.",
        items: [
          { q: "Wie ist das Wetter am Morgen?", options: ["Es regnet stark.", "Die Sonne scheint.", "Es schneit."], answer: 0 },
          { q: "Warum nimmt sie die Straßenbahn?", options: ["Sie hat kein Fahrrad.", "Bei diesem Regen geht es mit dem Fahrrad nicht.", "Die Straßenbahn ist gratis."], answer: 1 },
          { q: "Was erzählt die eine Frau im Tram?", options: ["Ihr Bruder rennt nach Bern.", "Ihr Bruder arbeitet in Bern.", "Ihr Bruder zieht nach Bern um."], answer: 2 },
          { q: "Was kauft sie nicht?", options: ["Butter", "Kartoffeln", "Karotten", "Käse"], answer: 1 }
        ]
      },
      {
        type: "decode",
        title: "Decode the sounds",
        intro: "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. One word follows no rule at all.",
        items: [
          { zd: "uus", hd: ["aus"], rule: "au" },
          { zd: "Chääs", hd: ["Käse"], rule: "k" },
          { zd: "Brueder", hd: ["Bruder"], rule: "ue" },
          { zd: "schiint", hd: ["scheint"], rule: "ei" },
          { zd: "Fründe", hd: ["Freunde"], rule: "eu" },
          { zd: "poschte", hd: ["einkaufen", "einkaufen gehen"], rule: "" }
        ]
      },
      {
        type: "match",
        title: "Words to learn by heart",
        intro: "Pick the Hochdeutsch meaning of each word from the text.",
        options: ["umziehen", "plaudern", "Butter", "Karotten", "Tüte", "Fahrrad"],
        items: [
          { zd: "zügle", answer: "umziehen" },
          { zd: "schnure", answer: "plaudern" },
          { zd: "Anke", answer: "Butter" },
          { zd: "Rüebli", answer: "Karotten" },
          { zd: "Säckli", answer: "Tüte" },
          { zd: "Velo", answer: "Fahrrad" }
        ]
      },
      {
        type: "gaps",
        title: "Fill the gaps",
        intro: "Complete the sentences in Zurich German. The word bank helps.",
        bank: ["stah", "schiffet", "poschte", "Säckli", "Fründe"],
        items: [
          { text: "Am Samschtig ___ ich am achti uf.", answer: ["stah", "stahn"] },
          { text: "Es ___, also nimm ich s Tram.", answer: ["schiffet"] },
          { text: "Ich mues no go ___.", answer: ["poschte"] },
          { text: "Bruuched Si es ___?", answer: ["Säckli", "Saeckli"] },
          { text: "Ich gang mit ___ go Glace ässe.", answer: ["Fründe", "Fruende"] }
        ]
      },
      {
        type: "listen",
        title: "Now with real sound",
        intro: "Watch one SRF Meteo weather forecast. Note three words you understood and the rule that helped you.",
        source: { name: "SRF Meteo", url: "https://www.srf.ch/meteo" },
        lines: 3
      },
      {
        type: "write",
        title: "Your turn",
        intro: "Describe your own Saturday in three or four sentences of Zurich German, and read them out loud. Use at least two words from this worksheet.",
        example: "Am Samschtig stahn ich spaat uf. Am Morge gang ich go poschte, und am Namittag triff ich Fründe am See."
      }
    ]
  }
];

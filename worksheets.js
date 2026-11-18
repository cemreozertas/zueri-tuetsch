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
  },
  {
    id: "cafe",
    lvl: 1,
    title: "Im Café",
    subtitle: "At the café",
    proofread: "",
    minutes: 20,
    text: [
      "Am Määntig am nüüni gang ich is Café am Bellevue. Ich bi no chli müed, aber drinne isch es schön warm.",
      "D Bedienig chunnt und seit: «Grüezi! Was dörfs sii?» Ich bstell en Kafi und es Gipfeli. «Sehr gern», seit si.",
      "Am Tisch näbedra hocked zwei Studäntinne. Si redet über d Ferie im Summer: Di eint gaht nach Italie, di ander bliibt dihei.",
      "Nach ere halbe Stund zahl ich. «Merci vielmal und en schöne Tag!», seit d Bedienig. Ich säg: «Merci, gliichfalls!»"
    ],
    translation: [
      "Am Montag um neun gehe ich ins Café am Bellevue. Ich bin noch ein bisschen müde, aber drinnen ist es schön warm.",
      "Die Bedienung kommt und sagt: «Guten Tag! Was darf es sein?» Ich bestelle einen Kaffee und ein Croissant. «Sehr gern», sagt sie.",
      "Am Tisch nebenan sitzen zwei Studentinnen. Sie reden über die Ferien im Sommer: Die eine fährt nach Italien, die andere bleibt zu Hause.",
      "Nach einer halben Stunde bezahle ich. «Vielen Dank und einen schönen Tag!», sagt die Bedienung. Ich sage: «Danke, gleichfalls!»"
    ],
    sections: [
      {
        type: "choice",
        title: "Did you get it?",
        intro: "Read the text, then choose the right answer.",
        items: [
          { q: "Wann geht sie ins Café?", options: ["Am Montag um neun.", "Am Sonntag um zehn.", "Am Montag um elf."], answer: 0 },
          { q: "Was bestellt sie?", options: ["Einen Tee und ein Brötchen.", "Einen Kaffee und ein Croissant.", "Ein Eis."], answer: 1 },
          { q: "Was macht die zweite Studentin in den Ferien?", options: ["Sie fährt nach Italien.", "Sie arbeitet.", "Sie bleibt zu Hause."], answer: 2 },
          { q: "Wie lange bleibt sie im Café?", options: ["Zehn Minuten.", "Eine halbe Stunde.", "Zwei Stunden."], answer: 1 }
        ]
      },
      {
        type: "decode",
        title: "Decode the sounds",
        intro: "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. One word follows no rule at all.",
        items: [
          { zd: "Bedienig", hd: ["Bedienung"], rule: "ung" },
          { zd: "müed", hd: ["müde"], rule: "ueh" },
          { zd: "chunnt", hd: ["kommt"], rule: "k" },
          { zd: "bliibt", hd: ["bleibt"], rule: "ei" },
          { zd: "drinne", hd: ["drinnen"], rule: "en" },
          { zd: "zahl", hd: ["bezahle", "zahle", "bezahlen"], rule: "" }
        ]
      },
      {
        type: "match",
        title: "Words to learn by heart",
        intro: "Pick the Hochdeutsch meaning of each word from the text.",
        options: ["Montag", "Croissant", "sitzen", "Kaffee", "zu Hause", "ein bisschen"],
        items: [
          { zd: "Määntig", answer: "Montag" },
          { zd: "Gipfeli", answer: "Croissant" },
          { zd: "hocke", answer: "sitzen" },
          { zd: "Kafi", answer: "Kaffee" },
          { zd: "dihei", answer: "zu Hause" },
          { zd: "chli", answer: "ein bisschen" }
        ]
      },
      {
        type: "gaps",
        title: "Fill the gaps",
        intro: "Complete the sentences in Zurich German. The word bank helps.",
        bank: ["dörfs", "Gipfeli", "hocked", "Stund", "gliichfalls"],
        items: [
          { text: "Grüezi! Was ___ sii?", answer: ["dörfs", "dörf's", "doerfs"] },
          { text: "Ich bstell en Kafi und es ___.", answer: ["Gipfeli"] },
          { text: "Am Tisch näbedra ___ zwei Studäntinne.", answer: ["hocked", "hocket"] },
          { text: "Nach ere halbe ___ zahl ich.", answer: ["Stund"] },
          { text: "Merci, ___!", answer: ["gliichfalls"] }
        ]
      },
      {
        type: "listen",
        title: "Now with real sound",
        intro: "Watch one Easy German street interview filmed in Zurich. Write down three greetings or polite phrases you hear.",
        source: { name: "Easy German", url: "https://www.youtube.com/@EasyGerman" },
        lines: 3
      },
      {
        type: "write",
        title: "Your turn",
        intro: "Order something in a café in Zurich German: greet, order two things, ask for the bill and say goodbye. Read it out loud.",
        example: "Grüezi! Ich hett gern en Kafi Crème und es Gipfeli, bitte. Zahle, bitte! Merci vielmal und en schöne Tag."
      }
    ]
  },
  {
    id: "wuche",
    lvl: 1,
    title: "Mini Wuche",
    subtitle: "My week",
    proofread: "",
    minutes: 20,
    text: [
      "Am Määntig fahr ich mit em Velo is Büro. Es isch nöd wiit, nur zäh Minute. Am Mittwuch gang ich zum Coiffeur, mini Haar sind z lang.",
      "Am Friitig han ich am Abig en Apéro mit Kollege. Mir trinked es Glas Wii und redet über alles und nüt.",
      "Am Samschtig schlaf ich lang. Am Namittag gang ich go poschte: Brot, Chääs, Poulet und e grossi Schoggi.",
      "Am Sunntig isch Ruetag. Ich lueg en Film, ässe Glace und lüüt mim Mami aa. Und am Määntig gaht alles wider vo vorne los."
    ],
    translation: [
      "Am Montag fahre ich mit dem Fahrrad ins Büro. Es ist nicht weit, nur zehn Minuten. Am Mittwoch gehe ich zum Friseur, meine Haare sind zu lang.",
      "Am Freitag habe ich am Abend einen Umtrunk mit Kollegen. Wir trinken ein Glas Wein und reden über alles und nichts.",
      "Am Samstag schlafe ich lange. Am Nachmittag gehe ich einkaufen: Brot, Käse, Hähnchen und eine große Schokolade.",
      "Am Sonntag ist Ruhetag. Ich schaue einen Film, esse Eis und rufe meine Mama an. Und am Montag geht alles wieder von vorne los."
    ],
    sections: [
      {
        type: "choice",
        title: "Did you get it?",
        intro: "Read the text, then choose the right answer.",
        items: [
          { q: "Wie kommt sie ins Büro?", options: ["Mit dem Bus.", "Mit dem Fahrrad.", "Zu Fuß."], answer: 1 },
          { q: "Warum geht sie am Mittwoch zum Friseur?", options: ["Ihre Haare sind zu lang.", "Sie hat Geburtstag.", "Sie möchte eine neue Farbe."], answer: 0 },
          { q: "Was trinkt sie am Freitag?", options: ["Bier", "Kaffee", "Wein"], answer: 2 },
          { q: "Was macht sie am Sonntag nicht?", options: ["Einen Film schauen", "Eis essen", "Einkaufen gehen", "Ihre Mama anrufen"], answer: 2 }
        ]
      },
      {
        type: "decode",
        title: "Decode the sounds",
        intro: "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. One word follows no rule at all.",
        items: [
          { zd: "Wii", hd: ["Wein"], rule: "ei" },
          { zd: "zäh", hd: ["zehn"], rule: "ae" },
          { zd: "Ruetag", hd: ["Ruhetag"], rule: "ue" },
          { zd: "Minute", hd: ["Minuten"], rule: "en" },
          { zd: "Samschtig", hd: ["Samstag"], rule: "st" },
          { zd: "Määntig", hd: ["Montag"], rule: "" }
        ]
      },
      {
        type: "match",
        title: "Words to learn by heart",
        intro: "Pick the Hochdeutsch meaning of each word from the text.",
        options: ["Fahrrad", "Friseur", "Hähnchen", "Schokolade", "Eis", "Umtrunk mit Häppchen"],
        items: [
          { zd: "Velo", answer: "Fahrrad" },
          { zd: "Coiffeur", answer: "Friseur" },
          { zd: "Poulet", answer: "Hähnchen" },
          { zd: "Schoggi", answer: "Schokolade" },
          { zd: "Glace", answer: "Eis" },
          { zd: "Apéro", answer: "Umtrunk mit Häppchen" }
        ]
      },
      {
        type: "gaps",
        title: "Fill the gaps",
        intro: "Complete the sentences in Zurich German. The word bank helps.",
        bank: ["Velo", "Coiffeur", "Apéro", "poschte", "Glace"],
        items: [
          { text: "Am Määntig fahr ich mit em ___ is Büro.", answer: ["Velo"] },
          { text: "Am Mittwuch gang ich zum ___.", answer: ["Coiffeur"] },
          { text: "Am Friitig han ich am Abig en ___ mit Kollege.", answer: ["Apéro", "Apero"] },
          { text: "Am Namittag gang ich go ___.", answer: ["poschte"] },
          { text: "Ich lueg en Film und ässe ___.", answer: ["Glace"] }
        ]
      },
      {
        type: "listen",
        title: "Now with real sound",
        intro: "Listen to one song by Schtärneföifi. Write down the days of the week or other everyday words you catch.",
        source: { name: "Schtärneföifi", url: "https://open.spotify.com/search/Scht%C3%A4rnef%C3%B6ifi" },
        lines: 3
      },
      {
        type: "write",
        title: "Your turn",
        intro: "Describe your own week in Zurich German, one sentence per day. Use at least three days of the week.",
        example: "Am Määntig gang ich go schaffe. Am Mittwuch triff ich e Fründin im Café. Am Sunntig schlaf ich lang und gang am See go laufe."
      }
    ]
  },
  {
    id: "zuegle",
    lvl: 2,
    title: "Mir zügled",
    subtitle: "Moving day",
    proofread: "",
    minutes: 30,
    text: [
      "Letscht Wuche simmer zügelt. Di alt Wonig isch z chli gsi, jetzt händ mir drü Zimmer in Oerlike. Am Morge am sibni isch de Lieferwage vor de Tür gstande.",
      "Mini Fründe sind cho go hälfe. Mir händ Chischte treit, s Chuchichäschtli abbaut und alles i di nöi Wonig gschleppt. Zum Znüni hät's Gipfeli und Kafi geh.",
      "Am Namittag isch de Abwart verbiicho. Er hät eus d Wöschchuchi zeigt und gseit: «D Wösch dörfed Si nume am Ziischtig mache.» Mir händ glachet, aber er hät's ernscht gmeint.",
      "Am Abig simmer müed uf em Bode ghocket und händ Pizza gässe. D Wonig isch no es Puff, aber es füült sich scho aa wie dihei."
    ],
    translation: [
      "Letzte Woche sind wir umgezogen. Die alte Wohnung war zu klein, jetzt haben wir drei Zimmer in Oerlikon. Am Morgen um sieben stand der Lieferwagen vor der Tür.",
      "Meine Freunde sind zum Helfen gekommen. Wir haben Kisten getragen, den Küchenschrank abgebaut und alles in die neue Wohnung geschleppt. Am Vormittag gab es Croissants und Kaffee.",
      "Am Nachmittag ist der Hausmeister vorbeigekommen. Er hat uns die Waschküche gezeigt und gesagt: «Die Wäsche dürfen Sie nur am Dienstag machen.» Wir haben gelacht, aber er hat es ernst gemeint.",
      "Am Abend haben wir müde auf dem Boden gesessen und Pizza gegessen. Die Wohnung ist noch ein Durcheinander, aber sie fühlt sich schon an wie zu Hause."
    ],
    sections: [
      {
        type: "choice",
        title: "Did you get it?",
        intro: "Read the text, then choose the right answer.",
        items: [
          { q: "Warum sind sie umgezogen?", options: ["Die alte Wohnung war zu teuer.", "Die alte Wohnung war zu klein.", "Sie haben eine neue Arbeit."], answer: 1 },
          { q: "Wer hat beim Umzug geholfen?", options: ["Die Eltern", "Der Hausmeister", "Freunde"], answer: 2 },
          { q: "Was hat der Hausmeister gesagt?", options: ["Waschen nur am Dienstag.", "Keine Partys am Wochenende.", "Die Kisten müssen in den Keller."], answer: 0 },
          { q: "Wie ist die neue Wohnung am Abend?", options: ["Schon perfekt eingerichtet.", "Noch ein Durcheinander.", "Noch ganz leer."], answer: 1 }
        ]
      },
      {
        type: "decode",
        title: "Decode the sounds",
        intro: "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. One word follows no rule at all.",
        items: [
          { zd: "Wonig", hd: ["Wohnung"], rule: "ung" },
          { zd: "Chischte", hd: ["Kisten", "Kiste"], rule: "k" },
          { zd: "glachet", hd: ["gelacht"], rule: "ge" },
          { zd: "ernscht", hd: ["ernst"], rule: "st" },
          { zd: "verbiicho", hd: ["vorbeigekommen"], rule: "ei" },
          { zd: "nume", hd: ["nur"], rule: "" }
        ]
      },
      {
        type: "match",
        title: "Words to learn by heart",
        intro: "Pick the Hochdeutsch meaning of each word from the text.",
        options: ["umziehen", "Küchenschrank", "Hausmeister", "Waschküche", "Durcheinander", "Snack am Vormittag"],
        items: [
          { zd: "zügle", answer: "umziehen" },
          { zd: "Chuchichäschtli", answer: "Küchenschrank" },
          { zd: "Abwart", answer: "Hausmeister" },
          { zd: "Wöschchuchi", answer: "Waschküche" },
          { zd: "Puff", answer: "Durcheinander" },
          { zd: "Znüni", answer: "Snack am Vormittag" }
        ]
      },
      {
        type: "gaps",
        title: "Fill the gaps",
        intro: "Complete the sentences in Zurich German. The word bank helps.",
        bank: ["zügelt", "Chischte", "Abwart", "Wöschchuchi", "gässe"],
        items: [
          { text: "Letscht Wuche simmer ___.", answer: ["zügelt", "zuegelt"] },
          { text: "Mir händ ___ treit.", answer: ["Chischte"] },
          { text: "Am Namittag isch de ___ verbiicho.", answer: ["Abwart"] },
          { text: "Er hät eus d ___ zeigt.", answer: ["Wöschchuchi", "Woeschchuchi"] },
          { text: "Mir händ Pizza ___.", answer: ["gässe", "gaesse"] }
        ]
      },
      {
        type: "listen",
        title: "Now with real sound",
        intro: "Listen to one report on the Regionaljournal Zürich Schaffhausen. Write down two place names and one word that ends in -ig, like Wonig.",
        source: { name: "Regionaljournal Zürich Schaffhausen (Radio SRF 1)", url: "https://www.srf.ch/audio/regionaljournal-zuerich-schaffhausen" },
        lines: 3
      },
      {
        type: "write",
        title: "Your turn",
        intro: "Tell the story of a move or a new home in four sentences, in the past tense (gsi, gmacht, cho …).",
        example: "Vor eme Jahr bin ich uf Züri zügelt. D Wonig isch chli gsi, aber hell. De Abwart isch sehr fründlich gsi. Jetzt füült sich Züri scho aa wie dihei."
      }
    ]
  },
  {
    id: "uetliberg",
    lvl: 2,
    title: "En Usflug uf de Üetliberg",
    subtitle: "A trip up the Uetliberg",
    proofread: "",
    minutes: 30,
    text: [
      "Am Sunntig simmer früe uufgstande, will s Wätter so schön gsi isch. Zum Zmorge hät's Gipfeli und Kafi Crème geh, dänn simmer an Hauptbahnhof gloffe.",
      "Uf em Perron hät de Zug scho gwartet. De Kondukteur hät eusi Billett kontrolliert und gseit: «Schöne Usflug!» Nach öppe zwänzg Minute simmer obe gsi.",
      "Vom Turm us hämmer di ganz Stadt gseh, de See und hinedra d Bärge. Zum Znüni hämmer es Picknick gmacht: Brot, Chääs, Rüebli und Chriesi us em Garte vo minere Tante.",
      "Am Namittag simmer zum Restaurant abegloffe und händ e Glace gässe. Am Abig bin ich müed gsi, aber zfriede. Am liebschte würd ich morn grad wider go wandere."
    ],
    translation: [
      "Am Sonntag sind wir früh aufgestanden, weil das Wetter so schön war. Zum Frühstück gab es Croissants und Kaffee mit Sahne, dann sind wir zum Hauptbahnhof gelaufen.",
      "Auf dem Bahnsteig hat der Zug schon gewartet. Der Zugbegleiter hat unsere Fahrkarten kontrolliert und gesagt: «Schönen Ausflug!» Nach etwa zwanzig Minuten waren wir oben.",
      "Vom Turm aus haben wir die ganze Stadt gesehen, den See und dahinter die Berge. Am Vormittag haben wir ein Picknick gemacht: Brot, Käse, Karotten und Kirschen aus dem Garten meiner Tante.",
      "Am Nachmittag sind wir zum Restaurant hinuntergelaufen und haben ein Eis gegessen. Am Abend war ich müde, aber zufrieden. Am liebsten würde ich morgen gleich wieder wandern gehen."
    ],
    sections: [
      {
        type: "choice",
        title: "Did you get it?",
        intro: "Read the text, then choose the right answer.",
        items: [
          { q: "Warum sind sie früh aufgestanden?", options: ["Weil das Wetter so schön war.", "Weil der Zug früh fuhr.", "Weil sie arbeiten mussten."], answer: 0 },
          { q: "Wie sind sie zum Hauptbahnhof gekommen?", options: ["Mit dem Tram.", "Zu Fuß.", "Mit dem Fahrrad."], answer: 1 },
          { q: "Was haben sie vom Turm aus gesehen?", options: ["Nur den See.", "Die Stadt, den See und die Berge.", "Den Flughafen."], answer: 1 },
          { q: "Woher kommen die Kirschen?", options: ["Vom Markt.", "Aus dem Garten der Tante.", "Aus dem Supermarkt."], answer: 1 }
        ]
      },
      {
        type: "decode",
        title: "Decode the sounds",
        intro: "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. One word follows no rule at all.",
        items: [
          { zd: "uufgstande", hd: ["aufgestanden"], rule: "au" },
          { zd: "Wätter", hd: ["Wetter"], rule: "ae" },
          { zd: "früe", hd: ["früh"], rule: "ueh" },
          { zd: "Garte", hd: ["Garten"], rule: "en" },
          { zd: "gseh", hd: ["gesehen"], rule: "ge" },
          { zd: "Billett", hd: ["Fahrkarte", "Fahrkarten", "Ticket"], rule: "" }
        ]
      },
      {
        type: "match",
        title: "Words to learn by heart",
        intro: "Pick the Hochdeutsch meaning of each word from the text.",
        options: ["Frühstück", "Bahnsteig", "Zugbegleiter", "Kirschen", "Snack am Nachmittag", "morgen"],
        items: [
          { zd: "Zmorge", answer: "Frühstück" },
          { zd: "Perron", answer: "Bahnsteig" },
          { zd: "Kondukteur", answer: "Zugbegleiter" },
          { zd: "Chriesi", answer: "Kirschen" },
          { zd: "Zvieri", answer: "Snack am Nachmittag" },
          { zd: "morn", answer: "morgen" }
        ]
      },
      {
        type: "gaps",
        title: "Fill the gaps",
        intro: "Complete the sentences in Zurich German. The word bank helps.",
        bank: ["gloffe", "Perron", "öppe", "Chriesi", "zfriede"],
        items: [
          { text: "Dänn simmer an Hauptbahnhof ___.", answer: ["gloffe"] },
          { text: "Uf em ___ hät de Zug scho gwartet.", answer: ["Perron"] },
          { text: "Nach ___ zwänzg Minute simmer obe gsi.", answer: ["öppe", "oeppe"] },
          { text: "Brot, Chääs, Rüebli und ___.", answer: ["Chriesi"] },
          { text: "Ich bin müed gsi, aber ___.", answer: ["zfriede"] }
        ]
      },
      {
        type: "listen",
        title: "Now with real sound",
        intro: "Watch a few minutes of SRF bi de Lüt. Write down three words about places or nature, like Bärg, See or Wald, and how they sound.",
        source: { name: "SRF bi de Lüt", url: "https://www.srf.ch/sendungen/srf-bi-de-luet" },
        lines: 3
      },
      {
        type: "write",
        title: "Your turn",
        intro: "Describe a trip you made in Switzerland in four sentences. Use the past tense and at least one of Zmorge, Znüni or Zvieri.",
        example: "Im Summer bin ich mit Fründe uf Luzern gfahre. Mir händ es Schiff gnoh und sind uf d Rigi gfahre. Zum Zvieri hämmer Chueche gässe. Es isch en schöne Tag gsi."
      }
    ]
  },
  {
    id: "znacht",
    lvl: 2,
    title: "Znacht bi Fründe",
    subtitle: "Dinner at a friend's",
    proofread: "",
    minutes: 30,
    text: [
      "Am Friitig hät mich mini Fründin Anna zum Znacht iiglade. Ich han e Fläsche Wii und es paar Guetzli mitbracht. Si wohnt im Chreis föif, grad bim Tram.",
      "Es hät en Härdöpfelgratin mit Rahm geh, dezue grüene Salat mit Peterli. Zum Trinke hämmer Hahnewasser und es Panaché gha.",
      "Bim Ässe hät d Anna verzellt, dass si nächscht Jahr nach Kanada gaht. Ich han nöd gwüsst, öb ich mich söll fröie oder truurig sii.",
      "Zum Dessert hät's Zwätschgechueche geh. Mir händ bis am zwölfi glachet und verzellt. Uf em Heiwäg han ich tänkt: Es git nüt Schöners als en Abig mit guete Fründe."
    ],
    translation: [
      "Am Freitag hat mich meine Freundin Anna zum Abendessen eingeladen. Ich habe eine Flasche Wein und ein paar Kekse mitgebracht. Sie wohnt im Kreis fünf, direkt beim Tram.",
      "Es gab ein Kartoffelgratin mit Sahne, dazu grünen Salat mit Petersilie. Zum Trinken hatten wir Leitungswasser und ein Radler.",
      "Beim Essen hat Anna erzählt, dass sie nächstes Jahr nach Kanada geht. Ich wusste nicht, ob ich mich freuen oder traurig sein soll.",
      "Zum Nachtisch gab es Pflaumenkuchen. Wir haben bis Mitternacht gelacht und erzählt. Auf dem Heimweg habe ich gedacht: Es gibt nichts Schöneres als einen Abend mit guten Freunden."
    ],
    sections: [
      {
        type: "choice",
        title: "Did you get it?",
        intro: "Read the text, then choose the right answer.",
        items: [
          { q: "Was hat sie mitgebracht?", options: ["Blumen und Schokolade.", "Eine Flasche Wein und Kekse.", "Einen Kuchen."], answer: 1 },
          { q: "Was gab es zu trinken?", options: ["Leitungswasser und ein Radler.", "Rotwein und Saft.", "Kaffee und Tee."], answer: 0 },
          { q: "Was hat Anna erzählt?", options: ["Sie heiratet bald.", "Sie geht nächstes Jahr nach Kanada.", "Sie hat eine neue Arbeit in Zürich."], answer: 1 },
          { q: "Wie lange sind sie zusammengesessen?", options: ["Bis zehn Uhr.", "Bis Mitternacht.", "Bis zum Morgen."], answer: 1 }
        ]
      },
      {
        type: "decode",
        title: "Decode the sounds",
        intro: "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. One word follows no rule at all.",
        items: [
          { zd: "iiglade", hd: ["eingeladen"], rule: "ei" },
          { zd: "Chreis", hd: ["Kreis"], rule: "k" },
          { zd: "grüene", hd: ["grünen", "grüne", "grün"], rule: "ueh" },
          { zd: "truurig", hd: ["traurig"], rule: "au" },
          { zd: "gwüsst", hd: ["gewusst"], rule: "ge" },
          { zd: "Guetzli", hd: ["Kekse", "Plätzchen"], rule: "" }
        ]
      },
      {
        type: "match",
        title: "Words to learn by heart",
        intro: "Pick the Hochdeutsch meaning of each word from the text.",
        options: ["Abendessen", "Kartoffel", "Sahne", "Petersilie", "Leitungswasser", "erzählen"],
        items: [
          { zd: "Znacht", answer: "Abendessen" },
          { zd: "Härdöpfel", answer: "Kartoffel" },
          { zd: "Rahm", answer: "Sahne" },
          { zd: "Peterli", answer: "Petersilie" },
          { zd: "Hahnewasser", answer: "Leitungswasser" },
          { zd: "verzelle", answer: "erzählen" }
        ]
      },
      {
        type: "gaps",
        title: "Fill the gaps",
        intro: "Complete the sentences in Zurich German. The word bank helps.",
        bank: ["iiglade", "Guetzli", "Panaché", "verzellt", "Zwätschgechueche"],
        items: [
          { text: "Mini Fründin hät mich zum Znacht ___.", answer: ["iiglade"] },
          { text: "Ich han e Fläsche Wii und es paar ___ mitbracht.", answer: ["Guetzli"] },
          { text: "Zum Trinke hämmer Hahnewasser und es ___ gha.", answer: ["Panaché", "Panache"] },
          { text: "D Anna hät ___, dass si nach Kanada gaht.", answer: ["verzellt"] },
          { text: "Zum Dessert hät's ___ geh.", answer: ["Zwätschgechueche", "Zwaetschgechueche"] }
        ]
      },
      {
        type: "listen",
        title: "Now with real sound",
        intro: "Watch the first ten minutes of an episode of Neumatt. Find a scene at the table and write down three words you understood.",
        source: { name: "Neumatt (Play Suisse)", url: "https://www.playsuisse.ch/" },
        lines: 3
      },
      {
        type: "write",
        title: "Your turn",
        intro: "Invite someone to dinner in Zurich German: when, where and what you'll cook. Then write their answer.",
        example: "Hoi Lea! Wotsch am Samschtig zu mir zum Znacht cho? Ich mach en Härdöpfelgratin. – Gärn, merci! Ich bring es Dessert mit."
      }
    ]
  },
  {
    id: "goetti",
    lvl: 3,
    title: "Es Telefon mit em Götti",
    subtitle: "A phone call with my godfather",
    proofread: "",
    minutes: 35,
    text: [
      "«Hoi Götti, bisch zwäg?» – «Nöd würkli. Ich ha sit geschter en Pfnüsel und pfuse fascht de ganz Tag.» – «Oje! Häsch öppis gäge Fieber?» – «Fieber hani zum Glück keis, nume e verstopfti Nase.»",
      "«Und du? Was lauft bi dir?» – «Ich chrampfe grad wie verruckt. Im Gschäft isch es Puff, sit di nöi Chefin da isch.» – «Allwäg wott si alles anders mache, gäll?» – «Genau. Aber ich wott nöd chlöne.»",
      "«Vorig han ich dä Bünzli vom dritte Stock im Lift troffe. Er hät gseit, mis Velo seig am falsche Ort.» – «Typisch! Und? Häsch es umgstellt?» – «Äxtra nöd!»",
      "«Du bisch glatt. Los, am Sunntig isch Chilbi in Oerlike. Wänn's mir besser gaht, gömmer zäme?» – «Gärn! Ich lad dich zum Magebrot ii.» – «Super. Bis dänn!» – «Guet Besserig, gäll!»"
    ],
    translation: [
      "«Hallo Patenonkel, geht's dir gut?» – «Nicht wirklich. Ich habe seit gestern einen Schnupfen und schlafe fast den ganzen Tag.» – «Oje! Hast du etwas gegen Fieber?» – «Fieber habe ich zum Glück keins, nur eine verstopfte Nase.»",
      "«Und du? Was läuft bei dir?» – «Ich arbeite gerade wie verrückt. In der Firma ist ein Durcheinander, seit die neue Chefin da ist.» – «Wahrscheinlich will sie alles anders machen, nicht wahr?» – «Genau. Aber ich will nicht jammern.»",
      "«Vorhin habe ich diesen Spießer aus dem dritten Stock im Aufzug getroffen. Er hat gesagt, mein Fahrrad stehe am falschen Ort.» – «Typisch! Und? Hast du es umgestellt?» – «Absichtlich nicht!»",
      "«Du bist lustig. Hör zu, am Sonntag ist Kirmes in Oerlikon. Wenn es mir besser geht, gehen wir zusammen?» – «Gern! Ich lade dich zu Magenbrot ein.» – «Super. Bis dann!» – «Gute Besserung, ja?»"
    ],
    sections: [
      {
        type: "choice",
        title: "Did you get it?",
        intro: "Read the text, then choose the right answer.",
        items: [
          { q: "Was hat der Patenonkel?", options: ["Hohes Fieber", "Einen Schnupfen", "Kopfschmerzen"], answer: 1 },
          { q: "Warum ist es im Geschäft ein Durcheinander?", options: ["Es gibt eine neue Chefin.", "Es gibt zu wenig Personal.", "Die Firma zieht um."], answer: 0 },
          { q: "Was hat der Nachbar gesagt?", options: ["Das Fahrrad ist kaputt.", "Das Fahrrad steht am falschen Ort.", "Das Fahrrad ist zu laut."], answer: 1 },
          { q: "Was planen die beiden für Sonntag?", options: ["Einen Besuch auf der Kirmes.", "Ein Fußballspiel.", "Ein Abendessen."], answer: 0 }
        ]
      },
      {
        type: "decode",
        title: "Decode the sounds",
        intro: "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. Two words follow no rule at all.",
        items: [
          { zd: "Besserig", hd: ["Besserung"], rule: "ung" },
          { zd: "geschter", hd: ["gestern"], rule: "st" },
          { zd: "troffe", hd: ["getroffen"], rule: "ge" },
          { zd: "Gärn", hd: ["Gern", "gerne"], rule: "ae" },
          { zd: "zäme", hd: ["zusammen"], rule: "" },
          { zd: "Chilbi", hd: ["Kirmes", "Jahrmarkt", "Kirchweih"], rule: "" }
        ]
      },
      {
        type: "match",
        title: "Words to learn by heart",
        intro: "Pick the Hochdeutsch meaning of each word from the text.",
        options: ["Schnupfen", "schlafen", "hart arbeiten", "jammern", "Spießer", "lustig"],
        items: [
          { zd: "Pfnüsel", answer: "Schnupfen" },
          { zd: "pfuse", answer: "schlafen" },
          { zd: "chrampfe", answer: "hart arbeiten" },
          { zd: "chlöne", answer: "jammern" },
          { zd: "Bünzli", answer: "Spießer" },
          { zd: "glatt", answer: "lustig" }
        ]
      },
      {
        type: "gaps",
        title: "Fill the gaps",
        intro: "Complete the sentences in Zurich German. The word bank helps.",
        bank: ["zwäg", "Allwäg", "Vorig", "Äxtra", "Chilbi"],
        items: [
          { text: "Hoi Götti, bisch ___?", answer: ["zwäg", "zwaeg"] },
          { text: "___ wott si alles anders mache, gäll?", answer: ["Allwäg", "Allwaeg"] },
          { text: "___ han ich dä Bünzli im Lift troffe.", answer: ["Vorig"] },
          { text: "Häsch es umgstellt? – ___ nöd!", answer: ["Äxtra", "Aextra"] },
          { text: "Am Sunntig isch ___ in Oerlike.", answer: ["Chilbi"] }
        ]
      },
      {
        type: "listen",
        title: "Now with real sound",
        intro: "Listen to ten minutes of Radio 24. Write down two slang words or exclamations and guess what they mean.",
        source: { name: "Radio 24", url: "https://www.radio24.ch/" },
        lines: 3
      },
      {
        type: "write",
        title: "Your turn",
        intro: "Write a short phone call: ask how someone is, tell them about your week and make a plan. Use at least three words from this worksheet.",
        example: "Hoi Sara, bisch zwäg? – Ja, merci, und du? – Ich chrampfe grad vill, aber am Samschtig han ich frei. Gömmer go tschuute? – Gärn, bis dänn!"
      }
    ]
  },
  {
    id: "fiirabig",
    lvl: 3,
    title: "Fiirabig i de Beiz",
    subtitle: "After work at the pub",
    proofread: "",
    minutes: 35,
    text: [
      "Am Ziischtig nach em Schaffe hämmer eus i de Beiz am Limmatplatz troffe. De Reto hät grad e Rundi Stange bstellt: «Für jede eini, ich zahl!»",
      "«Wie vill händ die köschtet?», frögt d Lea. «Sibe Stutz s Stück. Fascht günschtig für Züri», seit de Reto und lachet.",
      "Dänn hämmer über s Tschuute gschnuret. Am Samschtig spielt de FCZ gäge GC, und de Reto isch en grosse FCZ-Fan. «Wänn GC gwünnt, gang ich drü Täg nöd go schaffe», seit er. Mir händ nume glachet.",
      "Am achti hät d Lea gseit: «So, ich mues hei, morn isch Määntig.» – «Nei, morn isch Mittwuch!» Si hät de Chopf gschüttlet: «Gsehsch, ich bi scho müed.» Es isch en glatte Abig gsi."
    ],
    translation: [
      "Am Dienstag nach der Arbeit haben wir uns in der Kneipe am Limmatplatz getroffen. Reto hat gleich eine Runde Bier bestellt: «Für jeden eins, ich zahle!»",
      "«Wie viel haben die gekostet?», fragt Lea. «Sieben Franken das Stück. Fast günstig für Zürich», sagt Reto und lacht.",
      "Dann haben wir über Fußball geplaudert. Am Samstag spielt der FCZ gegen GC, und Reto ist ein großer FCZ-Fan. «Wenn GC gewinnt, gehe ich drei Tage nicht arbeiten», sagt er. Wir haben nur gelacht.",
      "Um acht hat Lea gesagt: «So, ich muss nach Hause, morgen ist Montag.» – «Nein, morgen ist Mittwoch!» Sie hat den Kopf geschüttelt: «Siehst du, ich bin schon müde.» Es war ein lustiger Abend."
    ],
    sections: [
      {
        type: "choice",
        title: "Did you get it?",
        intro: "Read the text, then choose the right answer.",
        items: [
          { q: "Wo haben sie sich getroffen?", options: ["In einer Kneipe am Limmatplatz.", "Im Büro.", "Im Stadion."], answer: 0 },
          { q: "Wie viel kostet ein Bier?", options: ["Fünf Franken.", "Sieben Franken.", "Zehn Franken."], answer: 1 },
          { q: "Was passiert, wenn GC gewinnt?", options: ["Reto feiert drei Tage.", "Reto geht drei Tage nicht arbeiten.", "Reto zahlt die nächste Runde."], answer: 1 },
          { q: "Welcher Tag ist morgen?", options: ["Montag", "Dienstag", "Mittwoch"], answer: 2 }
        ]
      },
      {
        type: "decode",
        title: "Decode the sounds",
        intro: "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. One word follows no rule at all.",
        items: [
          { zd: "Fiirabig", hd: ["Feierabend"], rule: "ei" },
          { zd: "köschtet", hd: ["gekostet"], rule: "st" },
          { zd: "Chopf", hd: ["Kopf"], rule: "k" },
          { zd: "gschüttlet", hd: ["geschüttelt"], rule: "ge" },
          { zd: "müed", hd: ["müde"], rule: "ueh" },
          { zd: "Beiz", hd: ["Kneipe", "Lokal", "Wirtschaft"], rule: "" }
        ]
      },
      {
        type: "match",
        title: "Words to learn by heart",
        intro: "Pick the Hochdeutsch meaning of each word from the text.",
        options: ["kleines Bier vom Fass", "Franken", "Fußball spielen", "plaudern", "lustig", "nach Hause"],
        items: [
          { zd: "Stange", answer: "kleines Bier vom Fass" },
          { zd: "Stutz", answer: "Franken" },
          { zd: "tschuute", answer: "Fußball spielen" },
          { zd: "schnure", answer: "plaudern" },
          { zd: "glatt", answer: "lustig" },
          { zd: "hei", answer: "nach Hause" }
        ]
      },
      {
        type: "gaps",
        title: "Fill the gaps",
        intro: "Complete the sentences in Zurich German. The word bank helps.",
        bank: ["Beiz", "Stange", "Stutz", "gschnuret", "glatte"],
        items: [
          { text: "Mir händ eus i de ___ am Limmatplatz troffe.", answer: ["Beiz"] },
          { text: "De Reto hät e Rundi ___ bstellt.", answer: ["Stange"] },
          { text: "Sibe ___ s Stück.", answer: ["Stutz"] },
          { text: "Dänn hämmer über s Tschuute ___.", answer: ["gschnuret"] },
          { text: "Es isch en ___ Abig gsi.", answer: ["glatte"] }
        ]
      },
      {
        type: "listen",
        title: "Now with real sound",
        intro: "Watch one TalkTäglich discussion on TeleZüri. Write down how the guests agree or disagree, and one phrase you'd like to use yourself.",
        source: { name: "TeleZüri (TalkTäglich)", url: "https://www.telezueri.ch/" },
        lines: 3
      },
      {
        type: "write",
        title: "Your turn",
        intro: "Write a short after-work scene in Zurich German: who's there, what you order and what you talk about. Use at least two words from this worksheet.",
        example: "Am Friitig hämmer Fiirabig gmacht und sind i d Beiz. Ich han e Stange bstellt, d Mia es Panaché. Mir händ über d Ferie gschnuret, und es isch mega glatt gsi."
      }
    ]
  },
  {
    id: "estrich",
    lvl: 3,
    title: "Puff im Estrich",
    subtitle: "A mess in the attic",
    proofread: "",
    minutes: 35,
    text: [
      "Mis Mami hät aaglüüte: «Chunsch am Samschtig cho hälfe? De Estrich isch es riisigs Puff, und ich wott vor de Wienacht ufruume.» Ich han natürli ja gseit, au wänn ich lieber pfuset hett.",
      "Im Estrich hämmer allerlei gfunde: alti Finke, en rostige Hafe, drü Zapfezieher und e Chischte mit alte Fotis. Uf eim Foti bin ich als chliises Meitli mit eme Zältli im Muul.",
      "«Das chunnt alles in Ghüder!», hät mis Mami gseit. «Nei, d Finke nöd, die sind härzig!», han ich grüeft. Mir händ öppe zwei Stund diskutiert und am Schluss fascht alles bhalte.",
      "Am Abig hämmer Gschwellti mit Chääs gässe. Dänn hät mis Mami no d Wösch glettet, und ich han de Bode gwüscht. Es hät immer no es Puff, aber jetzt isch es es ordentlichs Puff."
    ],
    translation: [
      "Meine Mama hat angerufen: «Kommst du am Samstag helfen? Der Dachboden ist ein riesiges Durcheinander, und ich will vor Weihnachten aufräumen.» Ich habe natürlich ja gesagt, auch wenn ich lieber geschlafen hätte.",
      "Auf dem Dachboden haben wir allerlei gefunden: alte Hausschuhe, einen rostigen Kochtopf, drei Korkenzieher und eine Kiste mit alten Fotos. Auf einem Foto bin ich als kleines Mädchen mit einem Bonbon im Mund.",
      "«Das kommt alles in den Müll!», hat meine Mama gesagt. «Nein, die Hausschuhe nicht, die sind süß!», habe ich gerufen. Wir haben etwa zwei Stunden diskutiert und am Schluss fast alles behalten.",
      "Am Abend haben wir Pellkartoffeln mit Käse gegessen. Dann hat meine Mama noch die Wäsche gebügelt, und ich habe den Boden gefegt. Es gibt immer noch ein Durcheinander, aber jetzt ist es ein ordentliches Durcheinander."
    ],
    sections: [
      {
        type: "choice",
        title: "Did you get it?",
        intro: "Read the text, then choose the right answer.",
        items: [
          { q: "Warum will die Mutter aufräumen?", options: ["Sie zieht um.", "Vor Weihnachten soll es ordentlich sein.", "Sie verkauft das Haus."], answer: 1 },
          { q: "Was haben sie nicht gefunden?", options: ["Hausschuhe", "Einen Kochtopf", "Eine Lampe", "Korkenzieher"], answer: 2 },
          { q: "Was ist auf dem alten Foto?", options: ["Die Mutter als Kind.", "Sie selbst als kleines Mädchen.", "Der Dachboden von früher."], answer: 1 },
          { q: "Was passiert am Schluss mit den Sachen?", options: ["Fast alles kommt in den Müll.", "Fast alles bleibt.", "Alles wird verschenkt."], answer: 1 }
        ]
      },
      {
        type: "decode",
        title: "Decode the sounds",
        intro: "Write each word in Hochdeutsch. After checking, you'll see which rule did the work. One word follows no rule at all.",
        items: [
          { zd: "Muul", hd: ["Mund", "Maul"], rule: "au" },
          { zd: "chliises", hd: ["kleines", "klein"], rule: "ei" },
          { zd: "grüeft", hd: ["gerufen"], rule: "ue" },
          { zd: "bhalte", hd: ["behalten"], rule: "en" },
          { zd: "gässe", hd: ["gegessen"], rule: "ge" },
          { zd: "glettet", hd: ["gebügelt"], rule: "" }
        ]
      },
      {
        type: "match",
        title: "Words to learn by heart",
        intro: "Pick the Hochdeutsch meaning of each word from the text.",
        options: ["Dachboden", "Durcheinander", "Hausschuhe", "Kochtopf", "Müll", "fegen"],
        items: [
          { zd: "Estrich", answer: "Dachboden" },
          { zd: "Puff", answer: "Durcheinander" },
          { zd: "Finke", answer: "Hausschuhe" },
          { zd: "Hafe", answer: "Kochtopf" },
          { zd: "Ghüder", answer: "Müll" },
          { zd: "wüsche", answer: "fegen" }
        ]
      },
      {
        type: "gaps",
        title: "Fill the gaps",
        intro: "Complete the sentences in Zurich German. The word bank helps.",
        bank: ["aaglüüte", "pfuset", "Zapfezieher", "härzig", "Gschwellti"],
        items: [
          { text: "Mis Mami hät ___.", answer: ["aaglüüte", "aaglueuete"] },
          { text: "Ich han ja gseit, au wänn ich lieber ___ hett.", answer: ["pfuset"] },
          { text: "En rostige Hafe und drü ___.", answer: ["Zapfezieher"] },
          { text: "Nei, d Finke nöd, die sind ___!", answer: ["härzig", "haerzig"] },
          { text: "Am Abig hämmer ___ mit Chääs gässe.", answer: ["Gschwellti"] }
        ]
      },
      {
        type: "listen",
        title: "Now with real sound",
        intro: "Listen to one episode of Dini Mundart – Schnabelweid. Write down one word from a region outside Zurich and how it differs from Zurich German.",
        source: { name: "Dini Mundart – Schnabelweid (Radio SRF 1)", url: "https://www.srf.ch/audio/dini-mundart-schnabelweid" },
        lines: 3
      },
      {
        type: "write",
        title: "Your turn",
        intro: "Describe a room at home that's a Puff, in four sentences: what's in it, what you'd throw away and what you'd keep.",
        example: "In minere Wonig isch de Chäller es Puff. Det hät's alti Velo, Chischte und en kaputte Stuel. S Velo chunnt in Ghüder, aber d Chischte bhalt ich. Morn ruum ich uf, versproche!"
      }
    ]
  }
];

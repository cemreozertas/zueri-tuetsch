# Züritüütsch

*A guide to Zurich German*

**My first GitHub project had to be about Züritüütsch.**

Turkish is my mother tongue, German my second home, and Zurich German the language my new neighbours speak. My German is native-level, yet in Zurich I suddenly needed subtitles. So I started listening very closely, and noticed that I could pick up more and more words once I knew how their sounds line up with Hochdeutsch: *Ziit* is *Zeit*, *Huus* is *Haus*, *Chind* is *Kind*. As a trained translator, I couldn't leave those patterns scattered in my head, so I collected them and built this little web app with Claude, for anyone who wants to hear and speak Zurich German faster.

👉 **Try it live: https://cemreozertas.github.io/zueri-tuetsch/**

![The start page: Zurich German, seen through a translator's eye](docs/screenshot-hero.png)

## The idea

Zurich German isn't a variant of Standard German but its close relative: both grew out of medieval German, and many of their sounds still line up in regular ways. (For the vowels, it was actually Standard German that changed, while Zurich German kept the older sound.) Learn about a dozen of these patterns, memorise the everyday words that follow no pattern at all, and train the skill that matters most when you're listening: **turning what you hear back into words you already know.** The decoder also works the other way round, from Hochdeutsch to Züritüütsch, for when you want to say something.

**Who it's for:** anyone in or around Zurich who speaks German. It works best if you're comfortable in Hochdeutsch (about B1 and up), because the trick is reversing dialect into words you already know.

## What's inside

| Tab | What it does |
|---|---|
| **Start** | A short introduction: what the site is, how it works and where to begin. |
| **Decode** | Type a word you heard and watch it flip into Standard German on a departure board. The letters that change light up, and each change links to the rule behind it. Words that aren't in the list get a best guess from the rules. A switch flips the direction, so you can also go from Hochdeutsch to Züritüütsch. |
| **Rules** | 13 numbered sound shifts (ei → ii, au → uu, k → ch, -ung → -ig …), each with examples, a "reverse it" tip and its exceptions. Plus four grammar shortcuts. |
| **Vocabulary** | 168 words and phrases the rules can't explain (*luege, poschte, Rüebli, Ziischtig*), sorted into ten topics and three levels named after Zurich's tram tickets: *Kurzstrecke* (easy), *Zone 110* (hard) and *Alle Zonen* (impossible). Practise them as flashcards (in either direction, with progress saved in your browser) or browse them as a list. False friends like *springe* = rennen get their own topic. |
| **Quiz** | Read the dialect, type the Standard German, and see the answer flap into place with the rules that did the work. The same three ticket levels: Kurzstrecke (single words), Zone 110 (trickier words and short sentences) and Alle Zonen (full sentences with slang). |
| **Worksheets** | Longer original texts in Zurich German with six kinds of exercises: comprehension, decoding, matching, gap-fill, a listening task with a real source, and your own writing. Check answers on screen (saved in your browser) or print a clean A4 sheet with an optional answer key. |
| **Plan** | A listening and reading plan in four stages, with 25 checked sources online and around Zurich: SRF Meteo, regional news, Neumatt, TeleZüri, Bligg, the Märchenbühne, the PBZ Schweizerdeutsch-Café, Zurich German books and more. Each source says honestly which dialect you'll hear. |
| **Story** | Where Zurich German comes from, in twelve short headlines you can open for details: the Alemanni, the old vowels, why the Swiss write Hochdeutsch, the missing ß, no official spelling and more. Every fact links to its source. |

<p>
  <img src="docs/screenshot-decode.png" width="49%" alt="The decoder turning Hüüser into Häuser on a departure board">
  <img src="docs/screenshot-plan.png" width="49%" alt="The listening and reading plan with source cards">
</p>

<p align="center">
  <img src="docs/screenshot-quiz.png" width="24%" alt="The reverse-it quiz on a phone">&nbsp;
  <img src="docs/screenshot-vocabulary.png" width="24%" alt="A vocabulary flashcard on a phone">&nbsp;
  <img src="docs/screenshot-story.png" width="24%" alt="The story of Züritüütsch on a phone">
</p>

## Design

The look borrows from the split-flap departure board and uses Zurich's city colours, over a street map of Zurich from Oerlikon to Enge that stays still while the page scrolls. Every tab opens with a blue band. The three levels are named after Zurich's tram tickets: a short hop, the whole city, the whole canton. The practice pages (Decode, Vocabulary, Quiz and Worksheets) use a wall of faint split-flap tiles instead of the map, which now and then flip to a new letter. Colours: **Blau** with white as the main pair, **Dunkelblau** for the flaps, and **Magenta** as the one accent colour: for levels, wrong answers, exceptions and false friends, the numbers on the Start page and the story chapter you're reading. Right answers are light blue. The fonts are Schibsted Grotesk and JetBrains Mono, both served from this repo. Schibsted Grotesk is a sturdy newspaper grotesque in the spirit of Swiss poster type, and the same font is used across all of Cemre's Zurich projects.

## How it's built

It's plain HTML, CSS and JavaScript, with no framework, no build step and no cookies. Visits are counted anonymously with [GoatCounter](https://www.goatcounter.com/), which stores no personal data. The decoder counts only which kind of result a lookup gets, never the word itself. The content lives in two files, [`data.js`](data.js) and [`worksheets.js`](worksheets.js), separate from the app logic:

```
index.html     page structure and the eight tabs
styles.css     look and feel
app.js         split-flap board, decoder, flashcards, quiz, worksheets, plan
data.js        all rules, words, quiz items, the story and the listening and reading plan
worksheets.js  worksheet texts and exercises (copy one to add a new worksheet)
map-on-*.svg   the Zurich street map, one colour per background
fonts/         self-hosted fonts (SIL Open Font License)
docs/          screenshots for this README
```

The site is hosted for free with **GitHub Pages**, straight from the `main` branch.

## Run it on your own computer

Download or clone the repo and open `index.html` in your browser.

## Add a word or a rule

Open `data.js` and add a line to the right list, for example:

```js
{ zd: "Chäschtli", hd: "Kästchen", cat: "everyday" },
```

Got a correction or a favourite word? [Open an issue](../../issues) or send a pull request.

## A note on spelling

Swiss German has no official spelling. This app follows common Zurich usage, with long vowels written double (*Huus, Ziit*). You'll see other spellings in the wild, and other cantons sound different again (Bern says *nid*, not *nöd*).

## Credits

[Cemre](https://github.com/cemreozertas) is a Zurich-based tinkerer at heart. She builds automations, templates and apps for creative minds who love a well-run life, with [Claude](https://claude.ai) as her building partner.

The level names are borrowed from ZVV tickets; this project isn't affiliated with ZVV. Map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), via [EqualStreetNames Zürich](https://github.com/EqualStreetNames/equalstreetnames-zurich). Fonts: [Schibsted Grotesk](https://github.com/schibsted/schibsted-grotesk) and [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), both under the SIL Open Font License.

Licensed under the [MIT licence](LICENSE): free to use, copy and adapt.

# Zürichdeutsch Decoder

**Understand Zürich German faster, if you already speak German.**

Zürichdeutsch isn't a new language. It's Standard German run through about a dozen predictable sound shifts, plus a few hundred everyday words that don't follow any rule. This small web app teaches both, and trains the one skill that matters when you're listening: **reversing what you hear back into Standard German.**

👉 **Try it live: https://cemreozertas.github.io/zueri-tuetsch/**

![The Zürichdeutsch Decoder start page](docs/screenshot-hero.png)

## What's inside

| Section | What it does |
|---|---|
| **Decode a word** | Type a word you heard. You get the meaning if it's in the word list. If it isn't, the app runs the sound rules backwards and shows its best guess, step by step. |
| **The sound shifts** | 13 rules (ei → ii, au → uu, k → ch, -ung → -ig, …), each with examples, a "reverse it" tip and the exceptions. Plus four grammar shortcuts. |
| **Flashcards** | 70+ words the rules can't explain (*luege, poschte, Rüebli, Ziischtig*), with false friends like *springe* = rennen. You can flip the direction, filter by topic, and your progress is saved in your browser. |
| **Reverse-it quiz** | Read the dialect, type the Standard German, and see which rule did the work. Two levels: words and sentences. |
| **Listening plan** | A step-by-step plan from SRF Meteo to Swiss TV series, plus one daily habit. |

![The reverse-it quiz showing which rules apply](docs/screenshot-quiz.png)

## How it's built

It's plain HTML, CSS and JavaScript, with no framework, no build step and no tracking. All the content lives in **one file**, [`data.js`](data.js), separate from the app logic:

```
index.html     page structure
styles.css     look and feel
app.js         decoder, flashcards, quiz
data.js        all rules, words, quiz items and the listening plan
docs/          screenshots for this README
```

The site is hosted for free with **GitHub Pages**, straight from the `main` branch.

## Run it on your own computer

Download or clone the repo and open `index.html` in your browser. That's all you need.

## Add a word or a rule

Open `data.js` and add a line to the right list, for example:

```js
{ zd: "Chäschtli", hd: "Kästchen", cat: "everyday" },
```

Got a correction or a favourite word? [Open an issue](../../issues) or send a pull request.

## A note on spelling

Swiss German has no official spelling. This app follows common Zürich usage, with long vowels written double (*Huus, Ziit*). You'll see other spellings in the wild, and other cantons sound different again (Bern says *nid*, not *nöd*).

## Credits

Made in Zürich by Cemre, built together with [Claude](https://claude.ai). The content started as a chat about improving my Swiss German listening and grew into this app.

Licensed under the [MIT licence](LICENSE): free to use, copy and adapt.

// Builds de/index.html, the German address of the site, from index.html.
// Run it from the repo folder after every change to index.html:  node tools/make-de.js
//
// Why a second page? Link previews (WhatsApp, LinkedIn, Slack) read only the HTML, never the JavaScript.
// So the German site needs its own address with German preview texts and a German preview image.
// Everything else (texts, rules, worksheets) still comes from content-de.js at runtime.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const SITE = "https://cemreozertas.github.io/zueri-tuetsch/";

// Read the German page title and description from content-de.js, so they're written in one place only.
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "content-de.js"), "utf8").replace("const I18N_DE", "var I18N_DE"), ctx);
const meta = ctx.I18N_DE.meta;

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
let count = 0;
const set = (from, to) => {
  if (!html.includes(from)) throw new Error("Not found in index.html: " + from);
  html = html.replace(from, to);
  count++;
};
const setAttr = (selector, attr, value) => {
  // selector is the start of the tag, like <meta property="og:title"
  const i = html.indexOf(selector);
  if (i < 0) throw new Error("Not found in index.html: " + selector);
  const end = html.indexOf(">", i);
  const tag = html.slice(i, end + 1);
  const updated = tag.replace(new RegExp(attr + '="[^"]*"'), attr + '="' + value.replace(/"/g, "&quot;") + '"');
  html = html.slice(0, i) + updated + html.slice(end + 1);
  count++;
};

set('<html lang="en">', '<html lang="de" data-page-lang="de">');
set("<title>Züritüütsch · A guide to Zurich German</title>", "<title>" + meta.title + "</title>");
setAttr('<meta name="description"', "content", meta.description);
setAttr('<link rel="canonical"', "href", SITE + "de/");
setAttr('<meta property="og:locale"', "content", "de_CH");
setAttr('<meta property="og:locale:alternate"', "content", "en_US");
setAttr('<meta property="og:title"', "content", "Züritüütsch: ein Wegweiser ins Zürichdeutsche");
setAttr('<meta property="og:description"', "content", "Lautmuster, ein Decoder in beide Richtungen, Karteikarten, ein Quiz und ein Lernplan für alle, die in und um Zürich Deutsch sprechen.");
setAttr('<meta property="og:url"', "content", SITE + "de/");
setAttr('<meta property="og:image"', "content", SITE + "og-image-de.png");
setAttr('<meta property="og:image:alt"', "content", "Eine Anzeigetafel verwandelt das zürichdeutsche Wort Ziitig in Zeitung, über einem Stadtplan von Zürich");

// Files live one folder up: give every relative href and src a "../" (anchors, full URLs and data: stay as they are).
html = html.replace(/\b(href|src)="([^"]*)"/g, (all, attr, value) => {
  if (!value || /^(#|\?|\/|\.\.\/|[a-z][a-z0-9+.-]*:)/i.test(value)) return all;
  if (value === "./") return attr + '="../"';
  if (value === "de/") return attr + '="./"';
  return attr + '="../' + value + '"';
});

html = html.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!-- Generated from index.html by tools/make-de.js. Don't edit this file: change index.html and run the script again. -->");

fs.mkdirSync(path.join(root, "de"), { recursive: true });
fs.writeFileSync(path.join(root, "de", "index.html"), html);
console.log("de/index.html written (" + count + " changes plus file paths).");

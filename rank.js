const cheerio = require("cheerio");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function getHTML() {
    const res = await fetch("https://csgostats.gg/player/76561198034202275");
    const data = await res.text();
    return data;
}

async function getRank() {
    const htmlData = await getHTML();
    const html = htmlData.toString();
    const $ = cheerio.load(html, null, false);
    const elements = $(".player-ranks img");
    const ranks = []
    console.log(typeof (elements))

    elements.map((_, element) => {
        let images = $(element).attr("src")
        // console.log(images)
        ranks.push(images)
    });
    console.log(ranks[0])
    return ranks
}

console.log(getRank())
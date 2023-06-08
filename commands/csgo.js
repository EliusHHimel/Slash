const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const cheerio = require("cheerio");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("csgo")
    .setDescription("Get your CS:GO stats!")
    .addStringOption((option) =>
      option
        .setName("steamid")
        .setDescription("Steam ID of the person")
        .setRequired(true)
    ),
  async execute(interaction) {
    const steamid = interaction.options.getString("steamid");
    const baseURL64bit = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_KEY}&vanityurl=${steamid}`;

    const response64bit = await fetch(baseURL64bit);
    const data64bit = await response64bit.json();

    const steamID64bit = data64bit.response.steamid;
    const csgoStatsURL = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${process.env.STEAM_KEY}&steamid=${steamID64bit}`;
    // console.log(csgoStatsURL)

    const getCsgoStats = await fetch(csgoStatsURL);
    const csgoStatsData = await getCsgoStats.json();
    // console.log(csgoStatsData);

    async function getHTML() {
    const res = await fetch("https://csgostats.gg/player/76561198034202275");
    const data = await res.text();
    return data;
}

    const htmlData = await getHTML();
    const html = htmlData.toString();
    const $ = cheerio.load(html, null, false);
    const elements = $(".player-ranks img");
    const ranks = []

    elements.map((_, element) => {
        let images = $(element).attr("src")
        console.log(images)
        ranks.push(images)
    });
    console.log(ranks[0])



    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

    const exampleEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setAuthor({
        name: `Players Stats`,
      })
      .setDescription("CS:GO Player Info")
      .addFields(
        {
          name: "Total Kills",
          value: `${csgoStatsData.playerstats.stats[0].value}`,
          inline: true,
        },
        {
          name: "Total Deaths",
          value: `${csgoStatsData.playerstats.stats[1].value}`,
          inline: true,
        },
        {
          name: "K/D",
          value: `${(
            csgoStatsData.playerstats.stats[0].value /
            csgoStatsData.playerstats.stats[1].value
          ).toFixed(2)}`,
          inline: true,
        },
        {
          name: "Total Bomb Plants",
          value: `${csgoStatsData.playerstats.stats[3].value}`,
          inline: true,
        },
        {
          name: "More " + csgoStatsData.playerstats.stats[4].name,
          value: `We're adding more info, please be patient`,
          inline: true,
        }
      )
      .setFooter({
        text: "Slash",
        iconURL:
          "https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png",
      })
      .setTimestamp();

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};

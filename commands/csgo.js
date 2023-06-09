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
    await interaction.deferReply();
    const csRank = await fetch(`https://csrank.eliushhimel.repl.co/players/${steamID64bit}`);
    const rankData = await csRank.json();
    
    const profileUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY}&steamids=${steamID64bit}`
    const getCSProfile = await fetch(profileUrl);
    const csProfileData = await getCSProfile.json();



    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

    const exampleEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setTitle(`CS:GO Stats of ${csProfileData.response.players[0].personaname}`)
      .setAuthor({
        name: csProfileData.response.players[0].personaname,
        iconURL: csProfileData.response.players[0].avatar,
        url: csProfileData.response.players[0].profileurl
      })
    .setThumbnail(rankData[0])
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
          name: "Total Bomb Defused ",
          value: `${csgoStatsData.playerstats.stats[4].value}`,
          inline: true,
        }
      )
      .setFooter({
        text: "Slash",
        iconURL:
          "https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png",
      })
      .setTimestamp();

    await interaction.editReply({ embeds: [exampleEmbed]});
  },
};

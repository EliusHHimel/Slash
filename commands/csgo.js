const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
    const steamid = interaction.options.getString('steamid');
    const username = steamid;
    const baseURL64bit = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_KEY}&vanityurl=${username}`;

    const response64bit = await fetch(baseURL64bit);
    const data64bit = await response64bit.json();
    
    const steamID64bit = data64bit.response.steamid;
    const csgoStatsURL = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${process.env.STEAM_KEY}&steamid=${steamID64bit}`
    
    const getCsgoStats = await fetch(csgoStatsURL);
    const csgoStatsData = await getCsgoStats.json();
    
    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    const exampleEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setAuthor({
        name: `Players Stats`,
      })
      .setDescription('CS:GO Player Info')
      .addFields({ name: csgoStatsData.playerstats.stats[0].name, value: `${csgoStatsData.playerstats.stats[0].value}`, inline: true })
      .setTimestamp(); 

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};

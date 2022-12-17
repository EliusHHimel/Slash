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
    console.log(steamid)
    const username = steamid;
    const baseURL64bit = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_KEY}&vanityurl=${username}`;

    let response64bit = await fetch(baseURL);
    let data64bit = await response.json();
    
    const steamID64bit = data64bit.response.steamid;
    const 
    
    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    const exampleEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setAuthor({
        name: `~${data.response.success}`,
      })
      .setDescription(data.response.steamid)
      .setTimestamp();

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};

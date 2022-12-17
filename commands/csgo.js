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
    const username = "steamid";
    const baseURL = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_KEY}&vanityurl=`;
    const URL = baseURL + username;

    let response = await fetch(`https://type.fit/api/quotes`);
    let data = await response.json();
    const randomQuoteIndex = Math.round(Math.random() * data.length);
    const quote = data[randomQuoteIndex];
    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    const exampleEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setAuthor({
        name: `~${quote.author}`,
      })
      .setDescription(quote.text)
      .setTimestamp();

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};

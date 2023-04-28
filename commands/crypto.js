const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


module.exports = {
  data: new SlashCommandBuilder()
    .setName("price")
    .setDescription("Watch Cryptocurrency price!")
    .addStringOption((option) =>
      option
        .setName("currency")
        .setDescription("Enter the name of the currency")
        .setRequired(true)
    ),
  async execute(interaction) {
    const steamid = interaction.options.getString('steamid');
    const baseURL64bit = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_KEY}&vanityurl=${steamid}`;

    const response64bit = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=USD", {
  "headers": {
     'X-CMC_PRO_API_KEY': process.env.CRYPTO_API
  }
});;
    const data64bit = await response64bit.json();
    console.log(typeof(data64bit))
    
    // const steamID64bit = data64bit.response.steamid;
    // const csgoStatsURL = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${process.env.STEAM_KEY}&steamid=${steamID64bit}`
    
    // const getCsgoStats = await fetch(csgoStatsURL);
    // const csgoStatsData = await getCsgoStats.json();
    // console.log(csgoStatsData)
    
    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    
    const exampleEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setAuthor({
        name: `Crypto Price`,
      })
      .setDescription("Crypto Price Information")
      .addFields({
        name: response64bit[0].name,
        value: `${response64bit[0].symbol}`,
        inline: true,
      })
      .setTimestamp(); 

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};

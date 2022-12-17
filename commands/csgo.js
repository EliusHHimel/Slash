const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const getSteamID64 = require('customurl2steamid64');
const steam = require('steam-web');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("csgo")
    .setDescription("Get your CS:GO stats!")
    .addUserOption((option) => option.setName('steamid').setDescription('Steam ID of the person').setRequired(true)),
  async execute(interaction) {
    
    var username = 'yllanos';
    var baseURL = "http://steamcommunity.com/id/";
    var URL = baseURL + username +  "/?xml=1";
    var s = new steam({
  apiKey: 'D0BB2B1F8528C56E16C31FC7C005737B', // <<--PROVIDE API KEY HERE
  format: 'json' //optional ['json', 'xml', 'vdf']
  });
      
    let response = await fetch(`https://type.fit/api/quotes`);
    let data = await response.json();
    const randomQuoteIndex = Math.round(Math.random() * data.length);
    const quote = data[randomQuoteIndex];
    const generateRandomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
    const exampleEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setAuthor({
        name: `~${quote.author}`,
      })
      .setDescription(quote.text)
      .setTimestamp()

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};

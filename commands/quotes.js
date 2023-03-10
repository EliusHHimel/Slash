const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quotes")
    .setDescription("Gives a random quotes!"),
  async execute(interaction) {
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

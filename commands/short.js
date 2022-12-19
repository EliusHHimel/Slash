const {
  Client,
  SlashCommandBuilder,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bitAPIKey = process.env.BIT_API_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("short")
    .setDescription("Shorten your long url")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("Enter the the long url which you want to short")
        .setRequired(true)
    ),
  async execute(interaction) {
    const longURL = interaction.options.getString("url");

    const rawResponse = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bitAPIKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ long_url: longURL }),
    });

    const shortURLData = await rawResponse.json();

    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

    const urlEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setTitle("Your Link has ben shorted")
      .addFields(
        {
          name: "Your URL",
          value: "```" + shortURLData.long_url + "```",
        },
        {
          name: "Short URL",
          value: "```" + shortURLData.link + "```",
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Slash",
        iconURL:
          "https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png",
      });

    await interaction.reply({ embeds: [urlEmbed] });
  },
};

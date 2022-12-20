const {
  Client,
  SlashCommandBuilder,
  GatewayIntentBits,
} = require("discord.js");
var ms = require("minestat");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("View Minecraft Server Status")
    .addStringOption((option) =>
      option
        .setName("ip")
        .setDescription("Enter the server IP")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("port")
        .setDescription("Enter the type server port")
        .setRequired(false)
    ),
  async execute(interaction) {
    const ip = interaction.options.getString("ip");
    const port = interaction.options.getString("port");


    console.log(ms.init(ip, 25565))
    await interaction.reply("```" + "My Latency:  " + "/ms" + "```");
  },
};

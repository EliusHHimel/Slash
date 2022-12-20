const {
  Client,
  SlashCommandBuilder,
  GatewayIntentBits,
} = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


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
    const url = "https://api.mcsrvstat.us/2/"+ip+':'+ port ? port : '';
    const getServerStatus = await fetch(url);
    const serverData = await getServerStatus.json();

  
    await interaction.reply("```" + "My Latency:  " + "/ms" + "```");
  },
};

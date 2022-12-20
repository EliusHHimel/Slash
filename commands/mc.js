const {
  Client,
  SlashCommandBuilder,
  GatewayIntentBits,
  EmbedBuilder
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
    
    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

  const serverEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setThumbnail(serverData.icon)
      .setTitle('Server Status')
    	.addFields(
		    { name: 'Status', value: serverData.online ? 'Online' : 'Offline' },
		    { name: 'Players', value: serverData.players.online + '/' + serverData.players.max, inline: true },
		    { name: 'Version', value: serverData.version },
	)
      .setDescription(movieData.Plot)
      .setTimestamp()
      .setFooter({ text: 'Slash', iconURL: 'https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png' });

    await interaction.reply({ embeds: [serverEmbed] });
  },
};

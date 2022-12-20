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
    ),
  async execute(interaction) {
    const ip = interaction.options.getString("ip");
    const url = "https://api.mcsrvstat.us/2/"+ip;
    const getServerStatus = await fetch(url);
    const serverData = await getServerStatus.json();
    
    const sfbuff = new Buffer.from(serverData.icon.split(",")[1], "base64");
    
    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

  const serverEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setTitle('Server Status')
      .setThumbnail(sfbuff)
    	.addFields(
		    { name: 'Status', value: serverData.online ? 'Online' : 'Offline' },
		    { name: 'Players', value: serverData.online ? serverData.players.online + '/' + serverData.players.max : 'N/A' },
		    { name: 'Version', value: serverData.online ? serverData.version : 'N/A' },
	)
      .setTimestamp()
      .setFooter({ text: 'Slash', iconURL: 'https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png' });

    await interaction.reply({ embeds: [serverEmbed] });
  },
};

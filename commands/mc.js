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
      .setThumbnail(serverData.favicon)
      .setTitle('Server Status')
    	.addFields(
		    { name: 'Genre', value: movieData.Genre },
		    { name: 'Year', value: movieData.Year, inline: true },
		    { name: 'Runtime', value: movieRuntime, inline: true },
        { name: 'Director', value: movieData.Director, inline: true },
        { name: 'Actors', value: movieData.Actors },
        { name: 'Writer', value: movieData.Writer },
        { name: 'Awards', value: movieData.Awards },
        { name: 'IMDB Rating', value: movieData.imdbRating, inline: true },
		    { name: 'IMDB Votes', value: movieData.imdbVotes, inline: true },
        { name: 'Box Office', value: movieData.BoxOffice ? movieData.BoxOffice : 'N/A', inline: true },
	)
      .setDescription(movieData.Plot)
      .setTimestamp()
      .setFooter({ text: 'Slash', iconURL: 'https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png' });

    await interaction.reply({ embeds: [serverEmbed] });
  },
};

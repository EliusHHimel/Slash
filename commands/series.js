const {
  Client,
  SlashCommandBuilder,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const movieAPIKey = process.env.MOVIE_API_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("series")
    .setDescription("Search for Series Information")
    .addStringOption((option) =>
      option
        .setName("series_title")
        .setDescription("Enter the title of the sereis you want to search for")
        .setRequired(true)
    ),
  async execute(interaction) {
    const seriesTitle = interaction.options.getString("series_title");
    const url = `https://www.omdbapi.com/?apikey=${movieAPIKey}&type=series&t=${seriesTitle}`;

    const getseriesData = await fetch(url);
    const seriesData = await getseriesData.json();

    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    
    const seriesEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setThumbnail(seriesData.Poster)
      .setTitle(seriesData.Title)
    	.addFields(
		    { name: 'Genre', value: seriesData.Genre },
		    { name: 'Year', value: seriesData.Year, inline: true },
		    { name: 'Runtime', value: seriesData.Runtime + "per Episode", inline: true },
        { name: 'Director', value: seriesData.Director, inline: true },
        { name: 'Actors', value: seriesData.Actors },
        { name: 'Writer', value: seriesData.Writer },
        { name: 'Awards', value: seriesData.Awards },
        { name: 'IMDB Rating', value: seriesData.imdbRating, inline: true },
		    { name: 'IMDB Votes', value: seriesData.imdbVotes, inline: true },
        { name: 'Box Office', value: seriesData.BoxOffice, inline: true },
	)
      .setDescription(seriesData.Plot)
      .setTimestamp()
      .setFooter({ text: 'Slash', iconURL: 'https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png' });

    await interaction.reply({ embeds: [seriesEmbed] });
  },
};

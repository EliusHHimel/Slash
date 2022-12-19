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
    .setName("movie")
    .setDescription("Search for Movie Information")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Enter the title of the movie you want to search for")
        .setRequired(true)
    )
  .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Enter the type [movie, series, episode]")
        .setRequired(true)
    )
  ,
  async execute(interaction) {
    const title = interaction.options.getString("title");
    const type = interaction.options.getString("type");
    const url = `https://www.omdbapi.com/?apikey=${movieAPIKey}&type=${type}&t=${title}`;

    const getMovieData = await fetch(url);
    const movieData = await getMovieData.json();

    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    
    const movieRuntimeInt = parseInt(movieData.Runtime)
    const movieRuntime = `${Math.floor(movieRuntimeInt/60)} Hrs, ${movieRuntimeInt%60} Mins`
    const movieEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setThumbnail(movieData.Poster)
      .setTitle(movieData.Title)
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

    await interaction.reply({ embeds: [movieEmbed] });
  },
};

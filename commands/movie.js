const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const movieAPIKey = process.env.MOVIE_API_KEY

module.exports = {
	data: new SlashCommandBuilder()
		.setName('movie')
		.setDescription('Search for Movie Information')
    .addStringOption((option) =>
      option
        .setName("movie_title")
        .setDescription("Enter the title of the movie you want to search for")
        .setRequired(true)
    ),
	async execute(interaction) {
    const movieTitle = interaction.options.getString('movie_title');
    const url = `https://www.omdbapi.com/?apikey=${movieAPIKey}&t=${movieTitle}`
    
    const getMovieData = await fetch(url);
    const movieData = await getMovieData.json();
    console.log(movieData)
    
		await interaction.reply("```"+"My Latency:  " + "/ms"+"```");
	},
};
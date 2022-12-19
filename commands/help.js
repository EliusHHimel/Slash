const { Client, SlashCommandBuilder, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get bot command list'),
	async execute(interaction) {
    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    const movieEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setTitle('Slash Help')
      .setDescription('See all the available command list')
    	.addFields(
		    { name: 'Ping', value: "Run this command to see the bot ping \n ```/ping```"},
        { name: 'Movie', value: "Run this command to search a movie information \n ```/movie `movie_title: Interstellar````" },
        { name: 'Quotes', value: "Run this command to get a random quotes \n ```/quotes```" },
        { name: 'Awards', value: movieData.Awards },
	)
      .setTimestamp()
      .setFooter({ text: 'Slash', iconURL: 'https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png' });
		await interaction.reply("```"+"My Latency:  " + ping + "/ms"+"```");
	},
};
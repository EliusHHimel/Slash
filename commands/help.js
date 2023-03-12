const { Client, SlashCommandBuilder, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get bot command list'),
	async execute(interaction) {
    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    const helpEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setTitle('Slash Help')
      .setDescription('See all the available command list')
    	.addFields(
		    { name: 'Ping', value: "Run this command to see the bot ping \n ```/ping```"},
        { name: 'Score', value: "Run this command `/match` to see todays running match list and then grab the `Match ID` you want to see the score of and run the following command with the matchid to see score \n ```/score matchid:101891```" },
        { name: 'Movie/Series', value: "Run this command to search a movie or series information \n ```/movie title: Interstellar type: movie```" },
        { name: 'Quotes', value: "Run this command to get a random quotes \n ```/quotes```" },
        { name: 'MC Status', value: "Run this command to see minecraft server status \n ```/status ip: hypixel.net```" },
        { name: 'URL Shortner', value: "Run this command to shorten url \n ```/short url: https://eliushhimel.com```" },
        { name: 'CS:GO', value: "Run this command to see your CS:GO Stats \n ```/csgo steamid: officials1mple```" },
        { name: 'Server', value: "Run this command to see the server info \n ```/server```" },
        
	)
      .setTimestamp()
      .setFooter({ text: 'Slash', iconURL: 'https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png' });
		await interaction.reply({embeds: [helpEmbed]});
	},
};
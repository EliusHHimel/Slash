const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
    console.log(client)
		await interaction.reply("Ping Khuje pai na :3");
	},
};
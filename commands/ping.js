const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
    const ping = Date.now() - interaction.createdTimestamp
		await interaction.reply("```"+"My Latency:  " + ping + "/ms"+"```");
	},
};
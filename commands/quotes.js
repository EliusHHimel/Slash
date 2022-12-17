const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quotes')
		.setDescription('Gives a random quotes!'),
	async execute(interaction) {
    let response = await fetch(`https://type.fit/api/quotes`);
    let data = await response.json()
		await interaction.reply(data[0].text);
	},
};
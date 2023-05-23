const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
		//set the name of your command, must be lowercase ↓

		.setName('roll')
		.setDescription('This is a sing dice to roll. When you Roll a dice it will give a number between 1 and 6'),
	async execute(interaction) {
		// Your feature funtionality code goes here ↓ 
		const roll = Math.floor(Math.random() * 6) + 1;
		// send the final output to the end user ↓ 
		await interaction.reply(`Your dice has been rolled: ` + roll);
	},
};
const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
  //set the name of your command ↓ 
		.setName('yourCommandName')
  //set a short description about what your command does ↓  
		.setDescription('Your Command Description'),
	async execute(interaction) {
    // Your feature funtionality code goes here ↓ 
    
    // send the final output to the end user ↓ 
		await interaction.reply(`This is a sample command for this open source project. More details in our GitHub Repository. \n GitHub: https://github.com/EliusHHimel/Slash`);
	},
};
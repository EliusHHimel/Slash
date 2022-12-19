const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bitAPIKey = process.env.BIT_API_KEY;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('short')
		.setDescription('Shorten your long url')
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("Enter the the long url which you want to short")
        .setRequired(true)
    )
  ,
	async execute(interaction) {
    
    const rawResponse = await fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
       Authorization: `Bearer ${bitAPIKey}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({long_url: })
  });
  const content = await rawResponse.json();

  console.log(content);
    
    
		await interaction.reply("```"+"My Latency:  " + "/ms"+"```");
	},
};
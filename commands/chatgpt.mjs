import { Client, SlashCommandBuilder, GatewayIntentBits } from 'discord.js';
import {ChatGPTAPIBrowser} from 'chatgpt'
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
//     chat gpt
    const api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL,
    password: process.env.OPENAI_PASSWORD
  })

  await api.initSession()

  const result = await api.sendMessage('Hello World!')
  console.log(result.response)
    
		await interaction.reply("```"+"My Latency:  " + "/ms"+"```");
	},
};
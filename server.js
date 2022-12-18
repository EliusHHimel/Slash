// Require the necessary discord.js classes

const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const cors = require('cors');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const token = process.env.TOKEN;

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
client.user.setActivity('activity', { type: ActivityType.Listening });

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

app.get("/wakeup", function(request, response) {
  console.log("i'm awake");
  response.send("i'm awake")
});

app.get('/', (req, res) => {
    res.send('Slash Server Running')
})

app.listen(5000, () => {
    console.log('Running server on port', 5000)
})

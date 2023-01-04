# How to contribute for this bot

It is very easy to contribute in this awesome bot.
Let's get started.

## Step 1
Fork this repository and clone the forked repo using the command below. ↓ 
```
git clone https://github.com/[username]/Slash
```
Here, replace `[username]` with your github username. It should look something like this. ↓ 
```
git clone https://github.com/EliusHHimel/Slash
```
After cloning this repo open the project folder with your fevourite code editor. If you're using VS Code then you can follow the steps below.

```
cd Slash
```
```
code .
```
This will open the project in your VS Code.

## Step 2
Now head over to the commands folder and copy the `template.js` file in the same folder and rename it with a relatable name then open it.
Here is what you get inside the file.
```js
const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
  //set the name of your command, must be lowercase ↓ 
		.setName('commandname')
  //set a short description about what your command does ↓  
		.setDescription('Your Command Description'),
	async execute(interaction) {
    // Your feature funtionality code goes here ↓ 
    
    // send the final output to the end user ↓ 
		await interaction.reply(`This is a sample command for this open source project. More details in our GitHub Repository. \n GitHub: https://github.com/EliusHHimel/Slash`);
	},
};
```
Further instructions are given in the file.

## Step 3
Now simply push your modified code to github and create a Pull Request. I'll review your code and merge them to the main branch. And finally your added feature will be live in our live bot.

You can invite the bot in your server to test your own feature.

Bot Invite Link: [Add Slash in Server](https://discord.com/api/oauth2/authorize?client_id=1053590161897816114&permissions=8&scope=bot%20applications.commands)


## Feedback 🚀
You can always give me feedback about improving this project anytime.
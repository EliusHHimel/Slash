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
```
Further instructions are given in the file.

## Step 3
Now simply push your modified code to github and make a pull request.

```js
const favorites = [];
```

In the `POST` route, inside the `if(color)` block, add this code to save the submitted value to the array, and write it to the console:

```js
favorites.push(color);
console.log(favorites);
```

Click __Tools__ > __Logs__ at the bottom of Glitch to see the log statement in action when you submit new colors through the form.

## Keep going! 🚀

Clearly this is not a robust data storage approach and won't persist for long! Your Node apps can use a variety of databases, like [SQLite](https://glitch.com/~glitch-hello-sqlite) and [Airtable](https://glitch.com/~glitch-hello-airtable).

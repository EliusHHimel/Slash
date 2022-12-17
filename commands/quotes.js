const { SlashCommandBuilder } = require('discord.js');


const link = "https://type.fit/api/quotes";
fetch(link)
.then(response => response.json())
.then(data => {
    const randomQuoteIndex = Math.round(Math.random()*data.length);
        (data[randomQuoteIndex]);
      });



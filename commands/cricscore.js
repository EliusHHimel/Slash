const {
  Client,
  SlashCommandBuilder,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const movieAPIKey = process.env.MOVIE_API_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("score")
    .setDescription("Get Live Score")
    .addStringOption((option) =>
      option
        .setName("matchid")
        .setDescription("Enter the match id")
        .setRequired(true)
    )
  ,
  async execute(interaction) {
    const matchid = interaction.options.getString("matchid");
    const url = `https://cricketapi-icc.pulselive.com/fixtures/${matchid}/scoring`;

    const getScore = await fetch(url, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "account": "ICC",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            "referrer": "https://www.icc-cricket.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        });
    const scoreData = await getScore.json();
    console.log(scoreData)

    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    
    // const movieRuntimeInt = parseInt(movieData.Runtime)
    // const movieRuntime = `${Math.floor(movieRuntimeInt/60)} Hrs, ${movieRuntimeInt%60} Mins`
    const scoreEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
	// .setThumbnail(scoreData.Poster)
	// .setTitle(movieData.Title)
	// .addFields(
	// 	    { name: 'Genre', value: movieData.Genre },
	// 	    { name: 'Year', value: movieData.Year, inline: true },
	// 	    { name: 'Runtime', value: movieRuntime, inline: true },
	// { name: 'Director', value: movieData.Director, inline: true },
	// { name: 'Actors', value: movieData.Actors },
	// { name: 'Writer', value: movieData.Writer },
	// { name: 'Awards', value: movieData.Awards },
	// { name: 'IMDB Rating', value: movieData.imdbRating, inline: true },
	// 	    { name: 'IMDB Votes', value: movieData.imdbVotes, inline: true },
	// { name: 'Box Office', value: movieData.BoxOffice ? movieData.BoxOffice : 'N/A', inline: true },
	// )
	// .setDescription(movieData.Plot)
      .setTimestamp()
      .setFooter({ text: 'Slash', iconURL: 'https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png' });

    await interaction.reply({ embeds: [scoreEmbed] });
  },
};

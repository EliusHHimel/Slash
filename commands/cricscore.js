const {
  Client,
  SlashCommandBuilder,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const iccAPI = process.env.ICC_API;

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
    const url = `${iccAPI}/fixtures/${matchid}/scoring`;

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
    
    
    const innings = Object.keys(scoreData.innings).length;
    const {runs, wickets, tournamentLabel, over} = {
      runs: scoreData.innings[innings-1].scorecard.runs,
      wickets: scoreData.innings[innings-1].scorecard.wkts,
      tournamentLabel: scoreData.matchInfo.tournamentLabel,
      over: scoreData.innings[innings-1].overProgress,
      facingBatter: 
    }

    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    
    // const movieRuntimeInt = parseInt(movieData.Runtime)
    // const movieRuntime = `${Math.floor(movieRuntimeInt/60)} Hrs, ${movieRuntimeInt%60} Mins`
    const scoreEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
.setThumbnail('https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png')
	.setTitle(tournamentLabel)
	.addFields(
		    { name: 'Score', value: `Runs: ${runs} Wickets:${wickets}`, inline: true },
		    { name: 'Over', value: over, inline: true },
        { name: 'Innings', value: innings, inline: true },
        { name: 'Facing Batter', value: over, inline: true },
	)
	// .setDescription(movieData.Plot)
      .setTimestamp()
      .setFooter({ text: 'Slash', iconURL: 'https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png' });

    await interaction.reply({ embeds: [scoreEmbed] });
  },
};

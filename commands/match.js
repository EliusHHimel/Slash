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
    .setName("match")
    .setDescription("Get ICC match list"),
  async execute(interaction) {
    //     Get date
    const today = new Date();
    const currentDate = JSON.stringify(today).slice(1, 11);
    const url = `${iccAPI}/fixtures?tournamentTypes=I%2CWI&startDate=${currentDate}&endDate=${currentDate}&pageSize=100`;
    const getMatch = await fetch(url, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        account: "ICC",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      referrer: "https://www.icc-cricket.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    });
    const matchData = await getMatch.json();
    // console.log(matchData.content[0].scheduleEntry);
    const embeds = [];
    for (let match in matchData.content) {
      let singleMatchData = matchData.content[match];
      // console.log(singleMatchData.scheduleEntry.matchId.id);
      const { tournamentLabel, matchLabel, matchID, venue, date, time } = {
        tournamentLabel: singleMatchData.tournamentLabel,
        matchLabel: singleMatchData.label,
        matchID: singleMatchData.scheduleEntry.matchId.id,
        venue: singleMatchData.scheduleEntry.venue.fullName,
        date: singleMatchData.timestamp.slice(0, 10),
        time: singleMatchData.timestamp.slice(11).slice(0, 8),
      };
      const generateRandomHexColor = () =>
        `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

      const matchEmbed = new EmbedBuilder()
        .setColor(generateRandomHexColor())
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png"
        )
        .setTitle(tournamentLabel)
        .addFields(
          { name: "Label", value: matchLabel, inline: true },
          { name: "Venue", value: venue, inline: true },
          { name: "Match ID", value: `${matchID}`, inline: true },
          { name: "Date", value: `${date}`, inline: true },
          { name: "Time", value: `${time}`, inline: true }
        )
        // .setDescription(movieData.Plot)
        .setTimestamp()
        .setFooter({
          text: "Slash",
          iconURL:
            "https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png",
        });
      embeds.push(matchEmbed);
    }

    await interaction.reply({ embeds: embeds });
  },
};

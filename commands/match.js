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
    const url = `${iccAPI}/fixtures?tournamentTypes=I%2CWI&startDate=2023-03-09&endDate=2023-03-11&pageSize=100`;
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
      match=matchData.content[match]
      console.log(match)
      const { tournamentLabel, matchLabel, matchID, venue } = {
        tournamentLabel: match.tournamentLabel,
        matchLabel: match.label,
        matchID: match.matchId.id? match.matchId.id : match.scheduleEntry.matchId.id,
        venue: match.scheduleEntry.venue.fullName,
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
          { name: "Match ID", value: matchID, inline: false }
        )
        // .setDescription(movieData.Plot)
        .setTimestamp()
        .setFooter({
          text: "Slash",
          iconURL:
            "https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png",
        });
      embeds.push(matchEmbed)
    }

    await interaction.reply({ embeds: embeds });
  },
};

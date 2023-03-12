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
    ),
  async execute(interaction) {
    const matchid = interaction.options.getString("matchid");
    const url = `${iccAPI}/fixtures/${matchid}/scoring`;

    const getScore = await fetch(url, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        account: "ICC",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
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
    const scoreData = await getScore.json();

    const innings = Object.keys(scoreData.innings).length;

    const {
      runs,
      wickets,
      tournamentLabel,
      over,
      facingBatter,
      nonFacingBatter,
      bowler,
      runRate,
      battingTeam,
      bowlingTeam,
    } = {
      runs: scoreData.innings[innings - 1].scorecard.runs,
      wickets: scoreData.innings[innings - 1].scorecard.wkts,
      tournamentLabel: scoreData.matchInfo.tournamentLabel,
      over: scoreData.innings[innings - 1].overProgress,
      facingBatter: scoreData.currentState.facingBatsman,
      nonFacingBatter: scoreData.currentState.nonFacingBatsman,
      bowler: scoreData.currentState.currentBowler,
      runRate: scoreData.innings[innings - 1].runRate,
      battingTeam: scoreData.innings[innings - 1].battingTeamId,
      bowlingTeam: scoreData.innings[innings - 1].bowlingTeamId,
    };
    //     Batsman and Bowler Name and score
    const battingStat = scoreData.innings[innings - 1].scorecard.battingStats;
    const bowlingStat = scoreData.innings[innings - 1].scorecard.bowlingStats;
    const facingBMScore = battingStat.find((o) => o.playerId === facingBatter);
    const nonFacingBMScore = battingStat.find(
      (o) => o.playerId === nonFacingBatter
    );
    const bowlerScore = bowlingStat.find((o) => o.playerId === bowler);

    const { fr, fb, fsr, nfr, nfb, nfsr, br, bo, bw, be } = {
      fr: facingBMScore?.r,
      fb: facingBMScore?.b,
      fsr: facingBMScore?.sr,
      nfr: nonFacingBMScore?.r,
      nfb: nonFacingBMScore?.b,
      nfsr: nonFacingBMScore?.sr,
      br: bowlerScore?.r,
      bo: bowlerScore?.ov,
      bw: bowlerScore?.w,
      be: bowlerScore?.e,
    };

    const fBatUrl = `${iccAPI}/players/${facingBatter}/`;
    const nfBatUrl = `${iccAPI}/players/${nonFacingBatter}/`;
    const bowlerUrl = `${iccAPI}/players/${bowler}/`;
    const batTeamUrl = `${iccAPI}/teams/${battingTeam}/`;
    const bowlTeamUrl = `${iccAPI}/teams/${bowlingTeam}/`;

    const getfacingBatter = await fetch(fBatUrl, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        account: "ICC",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
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
    const fBatterData = await getfacingBatter.json();

    const getNonFacingBatter = await fetch(nfBatUrl, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        account: "ICC",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
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
    const nfBatterData = await getNonFacingBatter.json();

    const getcurrentBowler = await fetch(bowlerUrl, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        account: "ICC",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
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
    const currentBowlerData = await getcurrentBowler.json();

    const getBattingTeam = await fetch(batTeamUrl, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        account: "ICC",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
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
    const battingTeamData = await getBattingTeam.json();

    const getBowlingTeam = await fetch(bowlTeamUrl, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        account: "ICC",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
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
    const bowlingTeamData = await getBowlingTeam.json();

    const {
      facingBatsman,
      nonFacingBatsman,
      currentBowler,
      currentBattingTeam,
      currentBowlingTeam,
    } = {
      facingBatsman: fBatterData.fullName,
      nonFacingBatsman: nfBatterData.fullName,
      currentBowler: currentBowlerData.fullName,
      currentBattingTeam: battingTeamData.fullName,
      currentBowlingTeam: bowlingTeamData.fullName,
    };

    const generateRandomHexColor = () =>
      `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

    // const movieRuntimeInt = parseInt(movieData.Runtime)
    // const movieRuntime = `${Math.floor(movieRuntimeInt/60)} Hrs, ${movieRuntimeInt%60} Mins`
    const scoreEmbed = new EmbedBuilder()
      .setColor(generateRandomHexColor())
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png"
      )
      .setTitle(tournamentLabel)
      .addFields(
        { name: "Batting Team", value: `${currentBattingTeam}`, inline: true },
        { name: "Bowling Team", value: `${currentBowlingTeam}`, inline: true },
        { name: "Innings", value: `${innings}`, inline: true },
        { name: "Score", value: `R/W: ${runs}/${wickets}`, inline: true },
        { name: "Overs", value: `${over}`, inline: true },
        { name: "Run Rate", value: `${runRate}`, inline: true },
        {
          name: "Striker",
          value: `${facingBatsman} (${fr}/${fb}) \n St.Rate: ${fsr}`,
          inline: true,
        },
        {
          name: "Non-Striker",
          value: `${nonFacingBatsman} (${nfr}/${nfb}) \n St.Rate: ${nfsr}`,
          inline: true,
        },
        {
          name: "Bowler",
          value: `${currentBowler} \n ${br}/${bw} (${bo}) Econ: ${be}`,
          inline: true,
        },
      )
      // .setDescription(movieData.Plot)
      .setTimestamp()
      .setFooter({
        text: "Slash",
        iconURL:
          "https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png",
      });

    await interaction.reply({ embeds: [scoreEmbed] });
  },
};

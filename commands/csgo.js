const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const cheerio = require("cheerio");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("csgo")
    .setDescription("Get your CS:GO stats!")
    .addStringOption((option) =>
      option
        .setName("steamid")
        .setDescription("Steam ID of the person")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const steamid = interaction.options.getString("steamid");
      const baseURL64bit = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_KEY}&vanityurl=${steamid}`;

      const response64bit = await fetch(baseURL64bit);
      const data64bit = await response64bit.json();

      let si;
      if (data64bit.response.success === 1) {
        si = data64bit.response.steamid;
      } else {
        si = steamid;
      }

      const csRank = await fetch(
        `https://csgostats-api.vercel.app/players/${si}`
      );
      const rankData = await csRank.json();

      const profileUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY}&steamids=${si}`;
      const getCSProfile = await fetch(profileUrl);
      const csProfileData = await getCSProfile.json();

      const generateRandomHexColor = () =>
        `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

      const exampleEmbed = new EmbedBuilder()
        .setColor(generateRandomHexColor())
        .setTitle(
          `CS:GO Stats of ${csProfileData.response.players[0].personaname}`
        )
        .setAuthor({
          name: csProfileData.response.players[0].personaname,
          iconURL: csProfileData.response.players[0].avatar,
          url: csProfileData.response.players[0].profileurl,
        })
        .setThumbnail(rankData.ranks[0])
        .setDescription(
          "CS:GO Player Info. Join Our Server to suggest any other information that you may want to see. Join link: https://discord.gg/eP9A8f4vwh"
        )
        .addFields(
          {
            name: "<:kd:1117907545823117433>  K/D",
            value: "┕ ` " + rankData.kd + " `",
            inline: true,
          },
          {
            name: "<:hltv:1117909449856794644>  HLTV Rating",
            value: "┕ ` " + rankData.rating + " `",
            inline: true,
          },
          {
            name: "<:dmg:1118251203416031322>  ADR",
            value: "┕ ` " + rankData.adr + " `",
            inline: true,
          },
          {
            name: "<:wr:1117907984291471502>  Win Rate",
            value: "┕ ` " + rankData.win_rate + " `",
            inline: true,
          },
          {
            name: "<:hs:1117907700441956482>  HS Rate",
            value: "┕ ` " + rankData.hs_rate + " `",
            inline: true,
          },
          {
            name: "<:mostM:1117908621020368916>  Most Maps",
            value: "┕ ` " + rankData.mapMost + " `",
            inline: true,
          },
          {
            name: "<:lessM:1117908777220460645>  Least Maps",
            value: "┕ ` " + rankData.mapLeast + " `",
            inline: true,
          },
          {
            name: "<:rifle:1118251600864104609>  Most Weapon",
            value: "┕ ` " + rankData.weaponMost + " `",
            inline: true,
          },
          {
            name: "<:gun:1118252025633833030>  Least Weapon",
            value: "┕ ` " + rankData.weaponLeast + " `",
            inline: true,
          }
        )
        .setFooter({
          text: "Slash",
          iconURL:
            "https://cdn.discordapp.com/attachments/690148635375435825/1054266142283284510/Slash.png",
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [exampleEmbed] });
    } catch (err) {
      await interaction.editReply(
        "Sorry!! I couldn't find the profile data. Join support server to report the error: https://discord.gg/eP9A8f4vwh"
      );
    }
  },
};

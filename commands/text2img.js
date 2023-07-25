const {
  Client,
  SlashCommandBuilder,
  GatewayIntentBits,
} = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  data: new SlashCommandBuilder()
    //set the name of your command, must be lowercase ↓
    .setName("imagine")
    //set a short description about what your command does ↓
    .setDescription(
      "Write your imagination that you want to see in a picture."
    )
  .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Write what you want")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Your feature funtionality code goes here ↓
    const prompt = interaction.options.getString("prompt");
    await interaction.deferReply();
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: prompt,
      n: 2,
      size: "1024x1024",
    });

    // send the final output to the end user ↓
    await interaction.editReply(response.data.data[0].url + "\n" + response.data.data[1].url);
  },
};

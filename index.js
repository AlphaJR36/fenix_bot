require('dotenv').config();
const Discord = require("discord.js")
const { Client } = require("discord.js")
const config = require("./json/config.json")
const client = new Client({ intents: [1, 512, 32768, 2, 128, 32767] })

module.exports = client

client.on('interactionCreate', (interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd) return interaction.reply(`Error`);

        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction)

    }
})

client.on('ready', () => {
    console.log(`🟢 | ${client.user.tag}`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)
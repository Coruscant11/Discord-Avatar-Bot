const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { mdLogin, mdPswd } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pp")
        .setDescription("Afficher la pp d'un utilisateur.")
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Utilisateur de la pp.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Pp principale ou de serveur.')
                .setRequired(true)
                .addChoice('Principale', 'Principale')
                .addChoice('Serveur', 'Serveur')),
    async execute(interaction) {
        const client = interaction.client;

        let user = interaction.options.getUser("user");
        let type = interaction.options.getString("type");
        interaction.guild.members.fetch({ user, force: true });
        let member = interaction.guild.members.cache.find(member => member.user == user)

        console.log(`[${new Date().toLocaleTimeString()}] "${interaction.user.tag}" a fait la commande /pp pour voir la pp {${type}} de "${user.tag}".`);

        const avatarFormat = { format: 'png', size: 1024 };
        const ppEmbed = {
            title: user.username,
            image: {
                url: type == "Principale" ? user.displayAvatarURL(avatarFormat) : member.displayAvatarURL(avatarFormat)
            },
            footer: {
                text: type
            }
        }
        interaction.reply({ embeds: [ppEmbed] });
    }
}
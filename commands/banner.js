const { SlashCommandBuilder } = require('@discordjs/builders');
const { token } = require('../config.json');
const { getUserBanner } = require("discord-banner");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("banner")
        .setDescription("Afficher la banner d'un utilisateur.")
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Utilisateur de la banner.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Banner principale ou de serveur.')
                .setRequired(true)
                .addChoice('Principale', 'Principale')),

    async execute(interaction) {
        const client = interaction.client;

        let user = interaction.options.getUser("user");
        let type = interaction.options.getString("type");

        client.users.fetch(user.id).then(fetchedUser => {
            user = fetchedUser;
        });
        interaction.guild.members.fetch({ user, force: true });

        let member = interaction.guild.members.cache.find(member => member.user == user)

        let bannerURL;
        console.log(`[${new Date().toLocaleTimeString()}] "${interaction.user.tag}" a fait la commande /banner pour voir la banner {${type}} de "${user.tag}".`);
        getUserBanner(user.id, {
            token: token,
            format: "gif"
          }).then(banner => {
            const bannerEmbed = {
                title: user.username,
                image: {
                    url: banner.url
                },
                footer: {
                    text: "Principale"
                }
            }
            interaction.reply({ embeds: [bannerEmbed] });
          });
    }
}
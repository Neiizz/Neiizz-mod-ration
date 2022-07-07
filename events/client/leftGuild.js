const { Bot } = require('../../structures/client')
const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'guildDelete',

    /**
     * 
     * @param {Bot} client 
     */
    run: async(client, guild) => {

        const logChannel = client.channels.cache.get('990047480710328401')

        const embed = new Discord.MessageEmbed()
        .setTitle(`Nouveau Départ`)
        .addField('**__Informations du serveur__**', `> **-Nom du serveur:** \`${guild.name}\` \n> **-Identifiant:** \`${guild.id}\` \n> **-Propiétaire:** <@${guild.ownerId}> \n> **-Date de création:** \`${moment(guild.createdAt).format('DD/MM/YYYY à HH:mm')}\` (<t:${Math.floor(guild.createdAt / 1000)}:R>)  `)
        .addField('**__Autres informations du serveur__**', `> **-Nombres de membres:** \`${guild.memberCount}\` \n> **-Nombres de boost:** \`${guild.premiumSubscriptionCount >= 1 ? `${guild.premiumSubscriptionCount}` : `Aucun`}\` \n> **-URL personnalisé:** ${guild.vanityURLCode ? `https://discord.gg/${guild.vanityURLCode}` : "\`Aucun URL (niveau 3 requis)\`"} `)
        .setTimestamp()
        .setThumbnail(guild.iconURL())
        .setImage(guild.bannerURL({ dynamic: true, size: 4096 }))
        .setColor('RED')
        .setFooter({text: `Je suis sur ${client.guilds.cache.size} serveurs !` })

        logChannel.send({ embeds : [embed] })

    }
}
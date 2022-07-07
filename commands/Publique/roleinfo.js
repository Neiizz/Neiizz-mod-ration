const Discord = require('discord.js');
const { Database } = require('luma-db-v2');
const { Bot } = require('../../structures/client');
const moment = require('moment');


module.exports = {
    name: "roleinfo",
    aliases: ["ri"],
    description: "Voir les info du client",
    usage: "<prefix>botinfo",
    categorie: "public",

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, lang) => {

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.channel.send(`Veuillez mentionner un rôle !`)

        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `information sur ${role.name}` })
        .setTitle(`ID : ${role.id}`)
        .addField(`Rôle`, `<@&${role.id}>`)
        .addField(`Membre(s) avec ce rôle`, `${role.members.size.toString()}`)
        .addField(`Couleur`, `${role.hexColor.toString()}`)
        .addField(`Date de création`, `Le ${moment(role.joinedTimestamp).format('DD/MM/YYYY à HH:mm:ss')}`)
        .addField(`Afficher séparément`, `${role.hoist ? 'Oui' : 'Non' }`)
        .addField(`Mentionnable`, `${role.mentionable ? 'Oui' : 'Non' }`)
        .addField(`Position`, `${role.comparePositionTo.length}/${role.position.toString()}`)
        .addField(`Permissions`, `${role.permissions.toArray().map(perm => `\`${perm}\``).join(', ') || 'Aucun permmission'}`)

        .setColor(role.hexColor)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })


        message.channel.send({ embeds: [embed] })

    }
}
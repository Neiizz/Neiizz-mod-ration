const Discord = require('discord.js');
const { Database } = require('luma-db-v2');
const { Bot } = require('../../structures/client');
const moment = require('moment');


module.exports = {
    name: "serverinfo",
    aliases: ["si"],
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
        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
        if(color === null || color === undefined) color = `${client.config.color}`;

        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `information de ${message.guild.name}` })
       // .setTitle(`Propriétaire : <@${message.guild.ownerId}>`)
        .addField(`Propriétaire`, `<@${message.guild.ownerId}>`)
        .addField(`ID`, `${message.guild.id}`)
        .addField(`Date de création`, `<t:${parseInt(message.guild.createdTimestamp / 1000)}:f>`)
        .addField(`Membres`, `${message.guild.memberCount}`)
        .addField(`Rôle(s)`, `${message.guild.roles.cache.size > 10 ? `${message.guild.roles.cache.map(x => `<@&${x.id}>`).slice(0,10 )} Et ${message.guild.roles.cache.size - 10} autres rôles ` : message.guild.roles.cache.map(x => `<@&${x.id}>`)}`)
        .addField(`Boost(s)`, `${message.guild.premiumSubscriptionCount || `Aucun`} boost(s)`)
        .setColor(color || client.config.color)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setImage(message.guild.bannerURL({ dynamic: true, size: 4096 }))
        .setTimestamp()
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })


        message.channel.send({ embeds: [embed] })

    }
}
const Discord = require('discord.js');
const { Database } = require('luma-db-v2');
const { Bot } = require('../../structures/client');


module.exports = {
    name: "botinfo",
    aliases: ["bi"],
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

        const zay = client.users.fetch('492049863031259136')
        const jeotique = client.users.fetch('484412542530224128')

        const embed = new Discord.MessageEmbed()
        .setTitle(`information sur le bot ${client.user.username}`)
        .addField(`Informations sur le bot`, `> \`👑\` Développeur : <@492049863031259136> \`${(await zay).username}#${(await zay).discriminator}\` \n> \`⚙️\` Librairie : \`Discord.js v${Discord.version}\` \n> \`💻\` Node Versions: \`${process.version}\` `)
        .addField(`Statistique du bot`, `> \`⛪️\` Serveur Total : \`${client.guilds.cache.size}\` \n> \`🌙\` Utilisateurs Total : \`${message.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\` \n> \`🧾\` Salon Total : \`${client.channels.cache.size}\` \n> \`⏳\` Uptime : <t:${parseInt(client.readyTimestamp / 1000)}:R> \n> \`🏓\` Ping : \`${client.ws.ping}ms\` `)
        .addField(`Database`, `> \`🛢\` Database utilisé [\`luma-db-v2\`](https://www.npmjs.com/package/luma-db-v2) faite par [\`${(await jeotique).username}#${(await jeotique).discriminator}\`](https://github.com/Jeotique)`)
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })


        message.channel.send({ embeds: [embed] })

    }
}
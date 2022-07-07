const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "channelUpdate", 

    /**
     * 
     * @param {bot} client 
     * @param {import('discord.js').NonThreadGuildBasedChannel} oldChannel 
     * @param {import('discord.js').NonThreadGuildBasedChannel} newChannel 
     * @param {Discord.Message} message 
     */
    run: async(client, oldChannel, newChannel, message) => {
        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        if(client.db["logs"].get(`chlogs_${oldChannel.guild.id}`) === null || client.db["logs"].get(`chlogs_${oldChannel.guild.id}`) === undefined) {
            return;
        }
        else {
            let action = oldChannel.guild.fetchAuditLogs({
                limit: 1, 
                type: "CHANNEL_UPDATE"
            }).then((audit) => audit.entries.first());

            let author = (await action).executor;

            let ch = client.db["logs"].get(`chlogs_${oldChannel.guild.id}`) 

            if(author.id === client.user.id) return;

            let embed = new Discord.MessageEmbed()
            .setTitle(`〃 Modification Salon`)
            .addField(`Avant`, `<#${oldChannel.id}> | \`${oldChannel.name}\` `)
            .addField(`Après`, `<#${newChannel.id}> | \`${newChannel.name}\` `)
            .addField(`Auteur`, `<@${author.id}> (\`${author.tag}\`)`)
            .setColor(color || client.config.color)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp()

            oldChannel.guild.channels.cache.get(ch)?.send({embeds: [embed]}); 
        }
    }
}
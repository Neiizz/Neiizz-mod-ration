const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "channelDelete", 

    /**
     * 
     * @param {bot} client 
     * @param {import('discord.js').NonThreadGuildBasedChannel} channel 
     * @param {Discord.Message} message 
     */
    run: async(client, channel, message) => {
        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        if(client.db["logs"].get(`chlogs_${channel.guild.id}`) === null || client.db["logs"].get(`chlogs_${channel.guild.id}`) === undefined) {
            return;
        }
        else {
        
            const action = channel.guild.fetchAuditLogs({
                limit: 1, 
                type: "CHANNEL_DELETE"
            }).then((audit) => audit.entries.first()); 

            let author = (await action).executor;

            let channellogs = client.db["logs"].get(`chlogs_${channel.guild.id}`); 
            if(author.id === client.user.id) return;

            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `〃 Salon supprimé` })
            .addField(`Nom du salon supprimé :`, `\`${channel.id}\` / *\`${channel.name}\`*`)
            .addField(`Type :`, `*\`${channel.type}\`*`)
            .addField(`Auteur`, `<@${author.id}> (\`${author.tag}\`)`)
            .setColor(color || client.config.color)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp()

            channel.guild.channels.cache.get(channellogs)?.send({embeds: [embed]}); 
        }
    }
}
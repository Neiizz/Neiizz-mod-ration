const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "guildMemberRemove", 
    
    /**
     * 
     * @param {bot} client 
     * @param {Discord.NonThreadGuildBasedChannel} channel
     * @param {Discord.Message} message 
     */
    run: async(client, channel, message) => {
        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        if(client.db["logs"].get(`modlogs_${channel.guild.id}`) === null || client.db["logs"].get(`modlogs_${channel.guild.id}`) === undefined) {
            return;
        }
        else {
            
            let modlogs = client.db["logs"].get(`modlogs_${channel.guild.id}`); 

            const action = channel.guild.fetchAuditLogs({
                limit: 1,
                type: "MEMBER_KICK"
            }).then((audit) => audit.entries.first()); 

            let author = (await action).executor
            if(author.id === client.user.id) return;

            let embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} 〃 Nouveau Kick`)
            .setDescription(`<@${message.author.id}> (\`${message.author.tag}\`) à été expulsé pour la raison : \`${reason}\``)
            .setColor(color || client.config.color)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp(); 

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
    }
}
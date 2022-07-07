const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "channelCreate", 
    
    /**
     * 
     * @param {bot} client 
     * @param {Discord.NonThreadGuildBasedChannel} channel
     * @param {Discord.Message} message 
     */
    run: async(client, channel, message) => {
        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        if(client.db["logs"].get(`chlogs_${channel.guild.id}`) === null || client.db["logs"].get(`chlogs_${channel.guild.id}`) === undefined) {
            return;
        }
        else {
            
            let channelddb = client.db["logs"].get(`chlogs_${channel.guild.id}`); 

            const action = channel.guild.fetchAuditLogs({
                limit: 1,
                type: "CHANNEL_CREATE"
            }).then((audit) => audit.entries.first()); 

            let author = (await action).executor
            if(author.id === client.user.id) return;

            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `〃 Salon crée` })
            .addField(`Nom du salon crée :`, `${channel} | \`${channel.id}\` / *\`${channel.name}\`*`)
            .addField(`Type :`, `*\`${channel.type}\`*`)
            .addField(`Auteur de la création :`, `<@${author.id}> (\`${author.tag}\`)`)
            .setColor(color || client.config.color)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp()

            channel.guild.channels.cache.get(channelddb)?.send({embeds: [embed]}); 
        }
    }
}
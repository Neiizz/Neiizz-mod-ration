const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "messageUpdate", 

    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} oldMessage 
     * @param {Discord.Message} newMessage 
     */
    run: async(client, oldMessage, newMessage, message) => {
        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        if(oldMessage.channel.type === "DM") return;
        if(client.db["logs"].get(`msglogs_${oldMessage.guild.id}`) === null || client.db["logs"].get(`msglogs_${oldMessage.guild.id}`) === undefined) {
            return;
        } else if(client.db["logs"].get(`msglogs_${oldMessage.guild.id}`)){
            if(oldMessage.author.id === client.user.id) return;
            let happen = Math.floor(new Date().getTime()/1000.0); 

            let files = null;
            //add images if added (no videos possible)
            if (oldMessage.attachments.size > 0){
                if (oldMessage.attachments.every(attachIsImage)) {
                    files = url
                }
            }
    
       function attachIsImage(msgAttach) {
                url = msgAttach.url || null;
                imagename = msgAttach.name || `Unknown`;
                return url.indexOf(`png`, url.length - 3 ) !== -1 ||
                    url.indexOf(`jpeg`, url.length - 4 ) !== -1 ||
                    url.indexOf(`gif`, url.length - 3) !== -1 ||
                    url.indexOf(`jpg`, url.length - 3) !== -1;
            }
      
            const embed = new Discord.MessageEmbed()
            .setColor(color || client.config.color)
            .setAuthor({ name: `${newMessage.author.tag} 〃 Message modifié`, iconURL: `${newMessage.author.displayAvatarURL()}` })
            .addField(`Date de modification :`, `<t:${happen}:f>`)
            .addField(`Modifé depuis :`, `${newMessage.channel} | \`${newMessage.channel.id}\` / *\`${newMessage.channel.name}\`*`)
            .addField(`Avant :`, `\`\`\`\n${oldMessage.content.replace(/`/g, "'") || "Surrement un embed"}\n\`\`\``)
            .addField(`Après :`, `\`\`\`\n${newMessage.content.replace(/`/g, "'") || "Surrement un embed"}\n\`\`\``)
            .setImage(files)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp();
            
            oldMessage.guild.channels.cache.get(client.db["logs"].get(`msglogs_${oldMessage.guild.id}`)).send({embeds: [embed]}); 
        }
    }
}
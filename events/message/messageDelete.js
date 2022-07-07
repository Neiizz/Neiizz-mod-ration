const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "messageDelete", 

    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     */
    run: async(client, message, guild) => {

        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        if(message.channel.type === "DM") return;
        client.db["snipe"].set(`messagesnipe_${message.channel.id}`, message.content).save();
        client.db["snipe"].set(`authorsnipe_${message.channel.id}`, message.author).save();
        client.db["snipe"].set(`pdpsnipe_${message.channel.id}`, message.author.displayAvatarURL({dynamic: true})).save();

        if(client.db["logs"].get(`msglogs_${message.guild.id}`) === null || client.db["logs"].get(`msglogs_${message.guild.id}`) === undefined) {
            return;
        }
        else if(client.db["logs"].get(`msglogs_${message.guild.id}`)){
            let happen = Math.floor(new Date().getTime()/1000.0);
            if(message.author.id === client.user.id) return;

            let files = null;
                 //add images if added (no videos possible)
                 if (message.attachments.size > 0){
                     if (message.attachments.every(attachIsImage)) {
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
           .setAuthor({ name: `${message.author.tag} 〃 Message supprimé`, iconURL: `${message.author.displayAvatarURL()}` })
           .addField(`Date de supression :`, `<t:${happen}:f>`)
           .addField(`Supprimé depuis :`, `${message.channel} | \`${message.channel.id}\` / *\`${message.channel.name}\`*`)
           .addField(`Message supprimé :`, `\`\`\`\n${message.content.replace(/`/g, "'") || "Surrement un embed"}\n\`\`\``)
           .setImage(files)
           .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
           .setTimestamp()

            message.guild.channels.cache.get(client.db["logs"].get(`msglogs_${message.guild.id}`)).send({embeds: [embed]}); 
        } 
    }
}
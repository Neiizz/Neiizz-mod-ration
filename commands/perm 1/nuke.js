const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "nuke", 
    aliases: ["renew", "boom"],
    description: "Recréer un salon", 
    usage: "-nuke", 
    categorie: "mod",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     */
    run: async(client, message, args, lang, commandName) => {
        let pass = 'no';
        if(message.guild.ownerId === message.author.id || !client.config.owners.includes(message.author.id)) {
            if(client.db["owner"].get(`owners_${message.guild.id}`)?.includes(message.author.id)) pass = "oe";
            else if(client.db["perm"].get(`perm1_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm1_user_${message.guild.id}`)) pass = 'oe'
            else if(client.db["perm"].get(`perm2_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm2_user_${message.guild.id}`)) pass = 'oe'
            else if(client.db["perm"].get(`perm3_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm3_user_${message.guild.id}`)) pass = 'oe'
            else if(client.db["perm"].get(`perm4_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm4_user_${message.guild.id}`)) pass = 'oe'
            else if(client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "public") pass = 'no'
        } else pass = 'oe'
        if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Tu doit être dans la \`permissions 1\` pour utilisé cette commande **`)

        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;


        const nukeChannel = message.channel; 
        if(!nukeChannel.deletable) return message.channel.send(`Impossible de recréer le salon`);

        await nukeChannel.delete().catch(err => console.log(`[Erreur] - ${err}`)); 
        await nukeChannel.clone({ position: nukeChannel.rawPosition }).then((ch) => {
            ch.send(`<@${message.author.id}> salon recréé`).then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000);
                let modlogs = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(modlogs){
            let embed = new Discord.MessageEmbed()
            .setTitle(`〃 Salon recréé`)
            .setDescription(`<@${message.author.id}> a recréé le salon \`${nukeChannel.name}\``)
            .setColor(color || client.config.color)
            .setTimestamp(); 

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
            })
        })
    }
}
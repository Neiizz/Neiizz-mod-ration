const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "messageCreate", 

    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     */
    run: async(client, message) => {
        if(message.channel.type === "DM") return;
        if(client.db["protect"].get(`antispam_${message.guild?.id}`) === "off") return;

        if(client.db["protect"].get(`antispam_${message.guild?.id}`) === "on") {
            if(message.author.id === client.user.id) return;
            if(client.db["owner"].get(`owner_${message.author.id}`) === true) return;
            if(client.config.owners.includes(message.author.id)) return;
          //  if(client.db["whitelist"].get(`whitelist_${message.author.id}`) === true) return;
            if(client.db["protect"].get(`allowspam_${message.guild.id}`)?.includes(message.channel.id)) return; // c bon j'ai fais

            try {
            client.db["strike"].add(`spam_${message.author.id}`, 1);

            if(client.db["strike"].get(`spam_${message.author.id}`) >= 7) {
                message.channel.send(`<@${message.author.id}> Veuillez arrêter de spam`).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 1000)
                })
                message.channel.bulkDelete(6); 
            }
            if(client.db["strike"].get(`spam_${message.author.id}`) >= 13) {
                if(client.db["punish"].get(`antilinkpunish_${message.guild?.id}`) === "ban"){
                    message.author.send(`Vous avez été **ban** de \`${message.guild?.name}\` pour spam`).then(() => {
                        message.guild.members.cache.get(message.author.id).ban({reason: "Anti spam"}); 
                    })
                }
                    if(client.db["punish"].get(`antichannelpunish_${message.guild?.id}`) ==="kick"){
                        message.author.send(`Vous avez été **expulsé** de \`${message.guild.name}\` pour spam`).then(() => {
                            message.guild.members.cache.get(message.author.id).kick("Anti spam");
                        }) 
                    }
                    if(client.db["punish"].get(`antichannelpunish_${message.guild?.id}`) === "derank"){
                        message.author.send(`Vous avez été **derank** de \`${message.guild.name}\` pour spam`).then(() => {
                            message.guild.members.cache.get(message.author.id).roles.set([], "Anti spam"); 
                        }) 
                    }
            }
            setTimeout(() => {
                client.db["strike"].delete(`spam_${message.author.id}`); 
            }, 15000);
            } catch (err) {
                console.log(`[ERROR] - ${err}`); 
            }
        }
        if(client.db["protect"].get(`antispam_${message.guild?.id}`) === "max") {
            if(message.author.id === client.user.id) return;
            if(client.db["owner"].get(`owner_${message.author.id}`) === true) return;
            if(client.config.owners.includes(message.author.id)) return;

            try {
            client.db["strike"].add(`spam_${message.author.id}`, 1);

            if(client.db["strike"].get(`spam_${message.author.id}`) >= 7) {
                message.channel.send(`<@${message.author.id}> Veuillez arrêter de spam`).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 1000)
                })
                message.channel.bulkDelete(4); 
            }
            if(client.db["strike"].get(`spam_${message.author.id}`) >= 13) {
                message.author.send(`Vous avez été **ban** de \`${message.guild.name}\` pour spam`).then(() => {
                    message.guild.members.cache.get(message.author.id).ban({reason: "Anti spam"}); 
                })
            }
            setTimeout(() => {
                client.db["strike"].delete(`spam_${message.author.id}`); 
            }, 15000);
            } catch (err) {
                console.log(`[ERROR] - ${err}`); 
            }
        }
    }
}
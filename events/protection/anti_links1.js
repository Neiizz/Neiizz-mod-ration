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
        if(client.db["protect"].get(`antilink_${message.guild?.id}`) === "off") return;

        if(client.db["protect"].get(`antilink_${message.guild?.id}`) === "on") {
            if(message.author.id === client.user.id) return;
            if(client.config.owners.includes(message.author.id)) return;
            if(client.db["owner"].get(`owner_${message.author.id}`) === true) return;
          //  if(client.db["whitelist"].get(`whitelist_${message.author.id}`) === true) return;
            if(client.db["system"].get(`allowlink_${message.guildId}`) === message.channel.id) return;

            let links = ["https://", "http://", ".com", "discord.gg", "discord.com", ".com", ".net", ".org", ".fr", ".gg/", ".tk", "gg/"]; 
            links.forEach((link) => {
            if(message.content.includes(link)) {
            try {
                message.channel.send(`<@${message.author.id}> vous n'avez pas l'autorisation d'envoyer des liens sur le serveur`).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 1000)
                })
                message.delete(); 
                client.db["strike"].add(`ee_${message.author.id}_${message.guild.id}`, 1);

                if(client.db["strike"].get(`ee_${message.author.id}_${message.guild?.id}`) >= 5) {
                    if(client.db["punish"].get(`antilinkpunish_${message.guild?.id}`) === "ban"){
                        message.author.send(`Vous avez été **ban** de \`${message.guild.name}\` pour avoir envoyé trop de liens sur le serveur`).then(() => {
                            message.guild.members.cache.get(message.author.id).ban({reason: "Anti links"}); 
                        })
                    }
                        if(client.db["punish"].get(`antilinkpunish_${message.guild?.id}`) ==="kick"){
                            message.author.send(`Vous avez été **expulsé** de \`${message.guild.name}\` pour avoir envoyé trop de liens sur le serveur`).then(() => {
                                message.guild.members.cache.get(message.author.id).kick("Anti Links");
                            }) 
                        }
                        if(client.db["punish"].get(`antilinkpunish_${message.guild?.id}`) === "derank"){
                            message.author.send(`Vous avez été **derank** de \`${message.guild.name}\` pour avoir envoyé trop de liens sur le serveur`).then(() => {
                                message.guild.members.cache.get(message.author.id).roles.set([], "Anti links"); 
                            }) 
                        }
                }
            } catch (err) {
                console.log(`[ERROR] - ${err}`);
            }
        }
        });
        }
        if(client.db["protect"].get(`antilink_${message.guild?.id}`) === "max") {
            if(message.author.id === client.user.id) return;
            if(client.config.owners.includes(message.author.id)) return;
            if(client.db["owner"].get(`owner_${message.author.id}`) === true) return;

            let links = ["https://", "http://", ".com", "discord.gg", "discord.com", ".com", ".net", ".org", ".fr", ".gg/", ".tk", "gg/"]; 
            links.forEach((link) => {
            if(message.content.includes(link)) {
            try {
                message.channel.send(`<@${message.author.id}> vous n'avez pas l'autorisation d'envoyer des liens sur le serveur`).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 1000)
                })
                message.delete(); 
                client.db["strike"].add(`ee_${message.author.id}_${message.guild?.id}`, 1);

                if(client.db["strike"].get(`ee_${message.author.id}_${message.guild?.id}`) >= 3) {
                    if(client.db["punish"].get(`antilinkpunish_${message.guild?.id}`) === "ban"){
                        message.author.send(`Vous avez été **ban** de \`${message.guild?.name}\` pour avoir envoyé trop de liens sur le serveur`).then(() => {
                            message.guild.members.cache.get(message.author.id).ban({reason: "Anti links"}); 
                        })
                    }
                        if(client.db["punish"].get(`antilinkpunish_${message.guild?.id}`) ==="kick"){
                            message.author.send(`Vous avez été **expulsé** de \`${message.guild?.name}\` pour avoir envoyé trop de liens sur le serveur`).then(() => {
                                message.guild.members.cache.get(message.author.id).kick("Anti links");
                            }) 
                        }
                        if(client.db["punish"].get(`antilinkpunish_${message.guild.id}`) === "derank"){
                            message.author.send(`Vous avez été **derank** de \`${message.guild?.name}\` pour avoir envoyé trop de liens sur le serveur`).then(() => {
                                message.guild.members.cache.get(message.author.id).roles.set([], "Anti links"); 
                            }) 
                        }
                }
            } catch (err) {
                console.log(`[ERROR] - ${err}`);
            }
        }
        });
        }
    }
}
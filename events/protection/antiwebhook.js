const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "webhookUpdate", 

    /**
     * 
     * @param {bot} client 
     * @param {import('discord.js').NonThreadGuildBasedChannel} channel 
     */
    run: async(client, channel) => {
        if(client.db["protect"].get(`antiweb_${channel.guild.id}`) === "off" || client.db["protect"].get(`antiweb_${channel.guild.id}`) === null) return;

        if(client.db["protect"].get(`antiweb_${channel.guild.id}`) === "on"){
            const action = channel.guild.fetchAuditLogs({
                limit: 3,
                type: "WEBHOOK_CREATE"
            }).then((audit) => audit.entries.first())

            let author = (await action).executor; 

            if(author.id === client.user.id) return;
            if(client.db["owner"].get(`owner_${author.id}`) === true) return;
            if(client.config.owners.includes(author.id)) return;
          //  if(client.db["whitelist"].get(`whitelist_${author.id}`) === true) return;

            try {
                (await channel.fetchWebhooks((await action).id)).first().delete(); 
                if(client.db["punish"].get(`antiwebpunish_${channel.guild.id}`) === "ban"){
                    author.send(`Vous avez été **ban** de \`${channel.guild.name}\` pour avoir créé un webhook`).then(() => {
                        channel.guild.members.cache.get(author.id).ban({reason: "Anti webhook"}); 
                    })
                }
                    if(client.db["punish"].get(`antiwebpunish_${channel.guild.id}`) ==="kick"){
                        author.send(`Vous avez été **expulsé** de \`${channel.guild.name}\` pour avoir créé un webhook`).then(() => {
                            channel.guild.members.cache.get(author.id).kick("Anti webhook");
                        }) 
                    }
                    if(client.db["punish"].get(`antiwebpunish_${channel.guild.id}`) === "derank"){
                        author.send(`Vous avez été **derank** de \`${channel.guild.name}\` pour avoir créé un webhook`).then(() => {
                            channel.guild.members.cache.get(author.id).roles.set([], "Anti webhook"); 
                        }) 
                    }
            } catch(err){
                console.log(`[ERROR] - ${err}`); 
            }
        }
        if(client.db["protect"].get(`antiweb_${channel.guild.id}`) === "max"){
            const action = channel.guild.fetchAuditLogs({
                limit: 1,
                type: "WEBHOOK_CREATE"
            }).then((audit) => audit.entries.first())

            let author = (await action).executor; 

            if(author.id === client.user.id) return;
            if(client.db["owner"].get(`owner_${author.id}`) === true) return;
         //   if(client.config.bot.owners.includes(author.id)) return;

            try {
                (await channel.fetchWebhooks((await action).id)).first().delete(); 
                if(client.db["punish"].get(`antiwebpunish_${channel.guild.id}`) === "ban"){
                    author.send(`Vous avez été **ban** de \`${channel.guild.name}\` pour avoir créé un webhook`).then(() => {
                        channel.guild.members.cache.get(author.id).ban({reason: "Anti webhook"}); 
                    })
                }
                    if(client.db["punish"].get(`antiwebpunish_${channel.guild.id}`) ==="kick"){
                        author.send(`Vous avez été **expulsé** de \`${channel.guild.name}\` pour avoir créé un webhook`).then(() => {
                            channel.guild.members.cache.get(author.id).kick("Anti webhook");
                        }) 
                    }
                    if(client.db["punish"].get(`antiwebpunish_${channel.guild.id}`) === "derank"){
                        author.send(`Vous avez été **derank** de \`${channel.guild.name}\` pour avoir créé un webhook`).then(() => {
                            channel.guild.members.cache.get(author.id).roles.set([], "Anti webhook"); 
                        }) 
                    }
            } catch(err){
                console.log(`[ERROR] - ${err}`); 
            }
        }
    }
}
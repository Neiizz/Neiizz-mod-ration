const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "presetlogs", 
    description: "cree une category pour les logs", 
    usage: " ", 
    categorie: "perm3",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {*} lang 
     */
    run: async(client, message, args, lang, commandName) => {
        let pass = 'no';
        if(message.guild.ownerId === message.author.id || !client.config.owners.includes(message.author.id)) {
            if(client.db["owner"].get(`owners_${message.guild.id}`)?.includes(message.author.id)) pass = "oe";
            else if(client.db["perm"].get(`perm1_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm1_user_${message.guild.id}`)) pass = 'no'
            else if(client.db["perm"].get(`perm2_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm2_user_${message.guild.id}`)) pass = 'no'
            else if(client.db["perm"].get(`perm3_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm3_user_${message.guild.id}`)) pass = 'oe'
            else if(client.db["perm"].get(`perm4_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm4_user_${message.guild.id}`)) pass = 'oe'
            else if(client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "public") pass = 'no'
        } else pass = 'oe'
        if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Tu doit être dans la \`permissions 3\` pour utilisé cette commande **`)


        message.channel.send(`Creation des salon logs en cours...`)

        setTimeout(() => {
            message.guild.channels.create("logs", { type: "GUILD_CATEGORY", permissionOverwrites: [{ id: message.guild.id, deny: ['VIEW_CHANNEL'], }] });

            setTimeout(() => {
            message.guild.channels.create('📂・logs-message', { type: 'GUILD_TEXT', permissionOverwrites: [{ id: message.guild.id, deny: ['VIEW_CHANNEL'], }] }).then(ch => { 
                let category = message.guild.channels.cache.find(c => c.name == "logs" &&  c.type == "GUILD_CATEGORY"); 
                ch.setParent(category.id);
            })
        }, 500)
            setTimeout(() => {
            message.guild.channels.create('📂・logs-moderation', { type: 'GUILD_TEXT', permissionOverwrites: [{ id: message.guild.id, deny: ['VIEW_CHANNEL'], }] }).then(ch => { 
                let category = message.guild.channels.cache.find(c => c.name == "logs" &&  c.type == "GUILD_CATEGORY"); 
                ch.setParent(category.id);
            })
        }, 500)
            setTimeout(() => {
            message.guild.channels.create('📂・logs-antiraid', { type: 'GUILD_TEXT', permissionOverwrites: [{ id: message.guild.id, deny: ['VIEW_CHANNEL'], }] }).then(ch => { 
                let category = message.guild.channels.cache.find(c => c.name == "logs" &&  c.type == "GUILD_CATEGORY"); 
                ch.setParent(category.id);
            })
        }, 500)
            setTimeout(() => {
            message.guild.channels.create('📂・logs-salons', { type: 'GUILD_TEXT', permissionOverwrites: [{ id: message.guild.id, deny: ['VIEW_CHANNEL'], }] }).then(ch => { 
                let category = message.guild.channels.cache.find(c => c.name == "logs" &&  c.type == "GUILD_CATEGORY"); 
                ch.setParent(category.id);
            })
        }, 500)
            setTimeout(() => {
            message.guild.channels.create('📂・logs-tickets', { type: 'GUILD_TEXT', permissionOverwrites: [{ id: message.guild.id, deny: ['VIEW_CHANNEL'], }] }).then(ch => { 
                let category = message.guild.channels.cache.find(c => c.name == "logs" &&  c.type == "GUILD_CATEGORY"); 
                ch.setParent(category.id);
            })
        }, 500)
            setTimeout(() => {
            message.guild.channels.create('📂・logs-vocal', { type: 'GUILD_TEXT', permissionOverwrites: [{ id: message.guild.id, deny: ['VIEW_CHANNEL'], }] }).then(ch => { 
                let category = message.guild.channels.cache.find(c => c.name == "logs" &&  c.type == "GUILD_CATEGORY"); 
                ch.setParent(category.id);
            })
        }, 500)
            setTimeout(() => {
            message.guild.channels.create('📂・logs-roles', { type: 'GUILD_TEXT', permissionOverwrites: [{ id: message.guild.id, deny: ['VIEW_CHANNEL'], }] }).then(ch => { 
                let category = message.guild.channels.cache.find(c => c.name == "logs" &&  c.type == "GUILD_CATEGORY"); 
                ch.setParent(category.id);
            })
        }, 500)

            message.channel.send(`<@${message.author.id}> Creation terminée`)
        }, 10000)
        
    }
}
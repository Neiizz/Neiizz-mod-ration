const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "unlock", 
    description: "Dévérouiller un salon ou tous les salons d'un serveur", 
    usage: "-unlock [all]", 
    categorie: "mod",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {*} lang 
     * @param {string} commandName 
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


        if(args[0] === "all") {
            message.guild.channels.cache.forEach((ch) => {
                ch.permissionOverwrites.create(message.guild.roles.everyone, {
                    SEND_MESSAGES: true,
                })
            })
            message.channel.send(`Tous les salons du serveur ont été dévérrouillés`);

            let modlogs = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(modlogs){
            let embed = new Discord.MessageEmbed()
            .setTitle(`〃 Salon débloquer`)
            .setDescription(`<@${message.author.id}> a dévérrouillé tous les salons`)
            .setColor(color || client.config.color)
            .setTimestamp() 

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
        }
        else {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel; 

            if(!channel.manageable) return message.channel.send(`Ce salon n'est pas modifiable`);

           // if(!channel.permissionsLocked) return message.channel.send(`Le salon n'est pas vérouillé`); 

            channel.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: true,
            }).then(() => {
                message.channel.send(`Salon dévérrouillé`); 

                let modlogs = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(modlogs){
            let embed = new Discord.MessageEmbed()
            .setTitle(`〃 Salon débloquer`)
            .setDescription(`<@${message.author.id}> a dévérrouillé le salon <#${channel.id}>`)
            .setColor(color || client.config.color)
            .setTimestamp() 

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
            })
        }

    }
}
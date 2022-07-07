const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "lock", 
    description: "Vérouiller un salon ou tous les salons du serveur", 
    usage: "-lock [all]", 
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
                ch.permissionOverwrites.edit(message.guild.roles.everyone, {
                    SEND_MESSAGES: false, 
                })
            })
            await message.channel.send(`Tous les salons du serveur ont étés vérouillés`);

            let modlogs = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(modlogs){
            let embed = new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> a vérrouillé tous les salons du serveur`)
            .setColor(color || client.config.color)
            .setTimestamp()

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
        }
        else {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

            if(!channel.manageable) return message.channel.send(`Ce salon n'est pas modifiable`);

            if(channel.permissionsLocked) return message.channel.send(`Le salon est déjà vérouillé`);

            channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SEND_MESSAGES: false
            }).then((ch) => {
                message.channel.send(`Le salon <#${channel.id}> a bien été vérouillé`); 

                let modlogs = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(modlogs){
            let embed = new Discord.MessageEmbed()
            .setTitle(`〃 Salon bloquer`)
            .setDescription(`<@${message.author.id}> a vérrouillé le salon <#${channel.id}>`)
            .setColor(color || client.config.color)
            .setTimestamp()

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
            })
        }
        
    }
}
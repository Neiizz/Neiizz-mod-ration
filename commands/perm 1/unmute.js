const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "unmute", 
    aliases: ["untimeout"],
    description: "Ne plus exclure une personne exclue sur le serveur", 
    usage: "-unmute <user>", 
    categorie: "mod",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
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


        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]); 
        if(!user) return message.channel.send(`Veuillez me donner un utilisateur à unmute`);

        if(!user.isCommunicationDisabled()) return message.channel.send(`Cet utilisateur n'est pas mute`); 
        if(!user.manageable) return message.channel.send(`Ce membre n'est pas manageable`); 

        let reason = args.slice(1).join(" "); 
        if(!reason) reason = `Aucune raison fournie`; 

        user.timeout(null, reason);
        message.channel.send(`Vous venez d'unmute <@${user.id}> pour la raison \`${reason}\``); 
        let modlogs = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(modlogs){
            let embed = new Discord.MessageEmbed()
            .setTitle(`〃 Utilisateur unmute`)
            .setDescription(`<@${message.author.id}> a unmute <@${user.id}> pour la raison : \`${reason}\``)
            .setColor(color || client.config.color)
            .setTimestamp(); 

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
    }
}
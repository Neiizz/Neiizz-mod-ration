const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "kick",
    aliases: ["k"],
    description: "Expulser un utilisateur du serveur", 
    usage: "-kick <user> [raison]", 
    categorie: "mod",
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
            if(!client.db["owner"].get(`owners_${message.guild.id}`)?.includes(message.author.id)) {
            if(client.db["perm"].get(`permkick_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`permkick_user_${message.guild.id}`) ) pass = 'oe'
        } else pass = 'oe'
        if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Tu doit être dans la \`permissions kick\` pour utilisé cette commande **`)
        }

        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]); 
        if(!user) return message.channel.send(`Veuillez me donner un utilisateur à expulser`); 

        if(user.id === message.author.id) return message.channel.send(`Vous ne pouvez pas vous expulsé vous-même`); 
        if(user.id === client.user.id) return message.channel.send(`Vous ne pouvez pas m'expulser`); 
        if(user.id === message.guild.ownerId) return message.channel.send(`Vous ne pouvez pas expulser le propriétaire du serveur`); 
        if(client.config.owners.includes(user.id)) return message.channel.send(`Vous ne pouvez rien faire aux owners du bot`);
        if(!user.kickable) return message.channel.send(`Ce membre n'est pas kickable`); 

        let reason = args.slice(1).join(" ");
        if(!reason) reason = `Aucune raison fournie`; 

        await user.kick(`${reason}`); 
        message.channel.send(`Vous venez d'expulser <@${user.id}> pour la raison \`${reason}\``); 
        let modlogs = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(modlogs){
            let embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} 〃 Nouveau Kick`)
            .setDescription(`<@${message.author.id}> (\`${message.author.tag}\`) a expulsé <@${user.id}> pour la raison : \`${reason}\``)
            .setColor(color || client.config.color)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp(); 

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
    }
}
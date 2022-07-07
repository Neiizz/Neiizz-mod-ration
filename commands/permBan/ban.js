const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "ban", 
    aliases: ["b"], 
    description: "Bannir un utilisateur sur le serveur",
    usage: "-ban <user> [raison]", 
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
            if(client.db["perm"].get(`permban_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`permban_user_${message.guild.id}`) ) pass = 'oe'
        } else pass = 'oe' 
        if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Tu doit être dans la \`permissions ban\` pour utilisé cette commande **`)
        }

        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send(`Veuillez me donner un utilisateur à bannir`); 

        if(user.id === message.author.id) return message.channel.send(`Vous ne pouvez pas vous bannir vous-même`); 
        if(user.id === client.user.id) return message.channel.send(`Vous ne pouvez pas me bannir`); 
        if(user.id === message.guild.ownerId) return message.channel.send(`Vous ne pouvez pas bannir le propriétaire du serveur`); 
        if(client.config.owners.includes(user.id)) return message.channel.send(`Vous ne pouvez rien faire aux owners du bot`);
        if(!user.bannable) return message.channel.send(`Ce membre n'est pas bannable`); 

        let reason = args.slice(1).join(" ");
        if(!reason) reason = `Aucune raison fournie`; 

        await user.ban({reason: reason}).catch(err => { });
        message.channel.send(`Vous avez banni <@${user.id}> pour la raison \`${reason}\``); 

        let modlogs = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(modlogs){
            let embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} 〃 Nouveau Ban`)
            .setDescription(`<@${message.author.id}> (\`${message.author.tag}\`) a banni <@${user.id}> pour la raison : \`${reason}\``)
            .setColor(color || client.config.color)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp(); 

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
    }
}
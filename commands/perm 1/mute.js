const Discord = require('discord.js');
const {bot} = require('../../structures/client');
const ms = require('ms');

module.exports = {
    name: "mute",
    aliases: ["timeout"],
    description: "Timeout un utilisateur sur le serveur", 
    usage: "-mute <user> <temps> [raison]", 
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
        if(!user) return message.channel.send(`Veuillez me donner un utilisateur à mute`);

        let time = ms(args[1]);
        if(!time) return message.channel.send(`Veuillez me donner un temps valide`);

        let reason = args.slice(2).join(" ");
        if(!reason) reason = `Aucune raison fournie`; 

        if(user.id === message.author.id) return message.channel.send(`Vous ne pouvez pas vous mute vous-même`); 
        if(user.id === client.user.id) return message.channel.send(`Vous ne pouvez pas me mute`); 
        if(user.id === message.guild.ownerId) return message.channel.send(`Vous ne pouvez pas mute le propriétaire du serveur`);
        if(client.config.owners.includes(user.id)) return message.channel.send(`Vous ne pouvez rien faire aux owners du bot`); 
        if(!user.manageable) return message.channel.send(`Ce membre n'est pas manageable`);
        if(user.isCommunicationDisabled()) return message.channel.send(`Cet utilisateur est déjà mute`);

        await user.timeout(time, reason); 
        message.channel.send(`Vous avez mute <@${user.id}> pour la raison \`${reason}\``); 
        let modlogs = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(modlogs){
            let embed = new Discord.MessageEmbed()
            .setTitle(`〃 Utilisateur mute`)
            .setDescription(`<@${message.author.id}> a mute ${user} pour la raison : \`${reason}\``)
            .setColor(color || client.config.color)
            .setTimestamp(); 

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
    } 
}
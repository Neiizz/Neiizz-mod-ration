const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "unban", 
    description: "Révoquer le bannissement d'un utilisateur sur le serveur",
    usage: "-unban <user> [raison]", 
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
            if(!client.db["owner"].get(`owners_${message.guild.id}`)?.includes(message.author.id)) {
            if(client.db["perm"].get(`permban_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`permban_user_${message.guild.id}`) ) pass = 'oe'
        } else pass = 'oe' 
        if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Tu doit être dans la \`permissions ban\` pour utilisé cette commande **`)
        }

        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        let user = client.users.cache.get(args[0]);  
        if(!user) return message.channel.send(`Veuillez me donner un utilisateur à unban`); 
        let reason = args.slice(1).join(" ");
        if(!reason) reason = `Aucune raison fournie}`;

        try {
        message.guild.bans.fetch(user.id).then((b) => {
            message.guild.members.unban(user.id);
            message.channel.send(`<@${user.id}> a bien été unban`);
        }).catch(err => message.channel.send(`Je n'ai pas trouvé cet utilisateur dans les bannis du serveur`))
    } catch(err) {
        console.log(`[Erreur ${commandName}] - ${err}`)
    }
    let modlogs = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(modlogs){
            let embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} 〃 Nouveau Unban`)
            .setDescription(`<@${message.author.id}> (\`${message.author.tag}\`) a révoqué le bannissment de <@${user.id}> (\`${user.tag}\`)`)
            .setColor(color || client.config.color)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp(); 

            message.guild.channels.cache.get(modlogs)?.send({embeds: [embed]}); 
        }
    }
}
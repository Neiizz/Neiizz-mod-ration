const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "messagelogs", 
    aliases: ["msglogs", "logsmessage"], 
    description: "Activer ou désactiver les logs des message supprimés/modifiés", 
    usage: "-messagelogs <on/off> [salon]", 
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


        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        const embed1 = new Discord.MessageEmbed()
        .setDescription(`**Veuillez me préciser** \`on/off\` **et le salon**`)
        .setColor(color || client.config.color)
        
        const embed2 = new Discord.MessageEmbed()
        .setDescription(`**Ce salon est déjà attribué aux logs des messages**`)
        .setColor(color || client.config.color)

        const embed4 = new Discord.MessageEmbed()
        .setDescription(`**Les logs des messages sont déjà désactivés**`)
        .setColor(color || client.config.color)

        const embed5 = new Discord.MessageEmbed()
        .setDescription(`Les logs des messages sont désormais **désactivés**`)
        .setColor(color || client.config.color)


        if(!args.length) return message.channel.send({ embeds: [embed1] });

        if(args[0] === "on"){
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel;

            if(client.db["logs"].get(`msglogs_${message.guild.id}`) === channel.id) return message.channel.send({ embeds: [embed2] }); 

            client.db["logs"].set(`msglogs_${message.guild.id}`, channel.id).save();

            const embed3 = new Discord.MessageEmbed()
            .setDescription(`Les logs des messages sont désormais **activés** dans <#${channel.id}>`)
            .setColor(color || client.config.color)

            message.channel.send({ embeds: [embed3] })
        }
        if(args[0] === "off"){
            if(client.db["logs"].get(`msglogs_${message.guild.id}`) === "off") return message.channel.send({ embeds: [embed4] }); 

            client.db["logs"].delete(`msglogs_${message.guild.id}`).save();
            message.channel.send({ embeds: [embed5] }); 
        }
    }
}
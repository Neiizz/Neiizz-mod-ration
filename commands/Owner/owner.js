const Discord = require('discord.js'); 
const {bot} = require('../../structures/client'); 
const {Message} = require('discord.js'); 
const bdd = require('quick.db');

module.exports = {
    name: "owner", 
    description: "Voir les owners du bot sur le serveur et en ajouter", 
    usage: "+owner\n+owner <user>", 
    categorie: "param",
    /**
     * 
     * @param {bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, lang)=>{
      if(message.guild.ownerId === message.author.id || client.config.owners.includes(message.author.id)){

      let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        if(!args.length) return message.channel.send(`Veuillez précisez \`add/list/remove/clear\` `); 

        if(args[0] === "add"){
            let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]); 
            if(!user) return message.channel.send("Membre invalide");
            if(client.db["owner"].get(`owner_${message.guild.id}_${user.id}`) === true) return message.channel.send("Cet utilisateur est déjà owner");
            
            client.db["owner"].push(`owners_${message.guild.id}`, user.id).save();
            client.db["owner"].set(`owner_${message.guild.id}_${user.id}`, true).save();
            message.channel.send(`**${user.tag}** est désormais owner du bot`)
        }

        if(args[0] === "list"){
            let own = client.db["owner"].get(`owners_${message.guild.id}`);

            let embed = new Discord.MessageEmbed()
            .setTitle("Owners")
            .setDescription(`${!own ? "Aucun owner enregistré" : own.map(function(ow) { return `<@${ow}>` }).join("\n")}`)
            .setColor(color || client.config.color)

            message.reply({allowedMentions: { repliedUser: false }, embeds: [embed] })
        }

        if(args[0] === "remove"){
            let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]); 
            if(!user) return message.channel.send(`Membre invalide`);
    
            //if(client.db["owner"].get(`owner_${user.id}`) === false || client.db["owner"].get(`owner_${user.id}`) === null || client.db["owner"].get(`owner_${user.id}`) === undefined) return message.channel.send(`L'utilisateur n'est pas owner du bot`); 
    
            client.db["owner"].set(`owner_${message.guild.id}_${user.id}`, false).save();
            client.db["owner"].remove(`owners_${message.guild.id}`, user.id).save();
            message.channel.send(`**${user.tag}** ne fait désormais plus parti des owners du bot`); 
        }

        if(args[0] === "clear"){
            client.db["owner"].delete(`owners_${message.guild.id}`).save();
            client.users.cache.forEach((u) => {
            client.db["owner"].set(`owner_${message.guild.id}_${u.id}`, false).save();
            }); 

        message.channel.send(`Tous les owners ont étés supprimés`)
        }

    } 

    }
}
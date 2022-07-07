const Discord = require('discord.js');  
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "server", 
    aliases:["sbanner"], 
    description: "Voir la bannière du serveur", 
    usage: "-serverbanner", 
    categorie: "public",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {JSON} lang 
     * @param {string} commandName 
     */
    run: async(client, message, args, lang, commandName) => {

        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
        if(color === null || color === undefined) color = `${client.config.color}`;

        if(!args.length) return message.channel.send("Veuillez préciser `banner/pic`")

        if(args[0] === "banner"){
        message.guild.fetch().then((guild) => {
            let embed = new Discord.MessageEmbed()
            .setTitle(`${guild.name}`)
            .setImage(guild.bannerURL({dynamic: true, size: 4096}))
            .setColor(color || client.config.color); 

            message.channel.send({ embeds : [embed] }); 
        })
    }
    if(args[0] === "pic"){
        message.guild.fetch().then((guild) => {
            let embed = new Discord.MessageEmbed()
            .setTitle(`${guild.name}`)
            .setImage(guild.iconURL({dynamic:true, size: 1024}))
            .setColor(color || client.config.color); 

            message.channel.send({embeds : [embed]}); 
        })
    }
    }
}
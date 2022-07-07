const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const db = require('quick.db');

module.exports = {
    name: "setlang", 
    aliases: ["lang"], 
    description: "Changer la langue du bot", 
    usage: "-setlang <fr/en>", 
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, lang) => {
        if(client.config.owners.includes(message.author.id)) {
            if(!args.length) return message.channel.send(`${lang.settings.nolang}`)

            if(args[0] === "fr"){
                if(db.get(`lang_${message.guild.id}`) === "fr") return message.channel.send(`${lang.settings.alreadyfr}`); 

                db.set(`lang_${message.guild.id}`, "fr"); 
                message.channel.send(`${lang.settings.newlangfr}`); 
            }
            if(args[0] === "en"){
                if(db.get(`lang_${message.guild.id}`) === "en") return message.channel.send(`${lang.settings.alreadyen}`); 

                db.set(`lang_${message.guild.id}`, "en"); 
                message.channel.send(`${lang.settings.newlangen}`); 
            }
        }
    }
}
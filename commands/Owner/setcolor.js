const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "set",
    description: "Permet de gérer plusieurs fonctions du bot", 
    usage: "-set <name/pic/activity/color> <nom/pp/streaming/watching/listening/playing/competing>", 
    categorie: "param",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(client.config.owners.includes(message.author.id) || client.db["owner"].get(`owner_${message.guild.id}_${message.author.id}`)) {
            if(!args.length) return message.channel.send("Veuillez me préciser `theme`"); 

            if(args[0] === "theme"){
                let color = args[1]; 

                if(!color) return message.channel.send(`Donnez moi une couleur`); 

                if(client.db["color"].get(`theme_${message.guild.id}`) === color) return message.channel.send(`Ce thème est déjà utilisé`); 

                client.db["color"].set(`theme_${message.guild.id}`, color).save();
                message.channel.send(`Thème des embeds du bot mis à jour`)
            }
        }
    }
}
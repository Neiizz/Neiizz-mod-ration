const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "antiwebhook", 
    aliases: ["antiweb", "antiwebhooks"],
    description: "Empêcher les créations de webhooks sur le serveur", 
    usage: "-antiwebhook <on/off/max>", 
    categorie: "perm4",
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
            else if(client.db["perm"].get(`perm3_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm3_user_${message.guild.id}`)) pass = 'no'
            else if(client.db["perm"].get(`perm4_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm4_user_${message.guild.id}`)) pass = 'oe'
            else if(client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "public") pass = 'no'
        } else pass = 'oe'
        if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Tu doit être dans la \`permissions 4\` pour utilisé cette commande **`)

        if(!args.length) return message.channel.send(`Veuillez me préciser \`on/off/max\``); 

        if(args[0] === "on"){
            if(client.db["protect"].get(`antiweb_${message.guild.id}`) === "on") return message.channel.send(`La protection est déjà activé`); 

            client.db["protect"].set(`antiweb_${message.guild.id}`, "on").save();
            message.channel.send(`La protection est désormais **activé**`); 

        }
        if(args[0] === "off"){
            if(client.db["protect"].get(`antiweb_${message.guild.id}`) === "off") return message.channel.send(`La protection est déjà désactivé`); 

            client.db["protect"].set(`antiweb_${message.guild.id}`, "off").save();
            message.channel.send(`La protection est désormais **désactivé**`);

        }
        if(args[0] === "max"){
            if(client.db["protect"].get(`antiweb_${message.guild.id}`) === "max") return message.channel.send(`La protection est déjà activé sur max`);

            client.db["protect"].set(`antiweb_${message.guild.id}`, "max").save();
            message.channel.send(`La protection est désormais activé sur **max**`); 

        }
    }
}
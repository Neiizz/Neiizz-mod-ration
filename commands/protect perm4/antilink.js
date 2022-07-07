const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "antilink",
    description: "Empêcher les liens sur le serveur", 
    usage: "-antilink <on/off/max>", 
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

        if(!args.length) return message.channel.send(`Veuillez me préciser \`on/off/max/allow/unallow\` `);

        if(args[0] === "on") {
            if(client.db["protect"].get(`antilink_${message.guild.id}`) === "on") return message.channel.send(`La protection est déjà activé`); 

            client.db["protect"].set(`antilink_${message.guild.id}`, "on").save();
            message.channel.send(`La protection est désormais **activé**`); 

        }
        if(args[0] === "off") {
            if(client.db["protect"].get(`antilink_${message.guild.id}`) === "off") return message.channel.send(`La protection est déjà désactivé`); 

            client.db["protect"].set(`antilink_${message.guild.id}`, "off").save();
            message.channel.send(`La protection est désormais **désactivé**`); 

        }
        if(args[0] === "max") {
            if(client.db["protect"].get(`antilink_${message.guild.id}`) === "max") return message.channel.send(`La protection est déjà activé sur max`); 

            client.db["protect"].set(`antilink_${message.guild.id}`, "max").save();
            message.channel.send(`La protection est désormais activé sur **max**`); 

        }

        if(args[0] === "allow"){
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            if(!channel) return message.channel.send("Donnez moi un salon valide");

          //  if(client.db["system"].get(`allowlink_${message.guild.id}`) === channel.id) {
                client.db["system"].set(`allowlink_${message.guild.id}`, channel.id).save()

            message.channel.send(`Les liens sont désormais autorisé dans <#${channel.id}>`)

         //   }
          /*  else {client.db["system"].set(`allowlink_${message.guild.id}`, channel.id).save()}
            message.channel.send(`Les liens sont désormais autorisé dans <#${channel.id}>`) */
        }
        if(args[0] === "unallow"){
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            if(!channel) return message.channel.send("Donnez moi un salon valide");

            if(client.db["system"].get(`allowlink_${message.guild.id}`) === channel.id) {
                client.db["system"].set(`allowlink_${message.guild.id}`, null).save();

            message.channel.send(`Les liens ne sont désormais plus autorisé dans <#${channel.id}>`)

            }
        }

    }
}
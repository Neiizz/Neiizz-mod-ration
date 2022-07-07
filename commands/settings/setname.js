const { Message } = require('discord.js');
const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name: "setname", 
    description: "Changer le nom d'utilisateur de votre bot",
    usage: "<prefix>setname <nouveau nom>", 
    categorie: "param",
    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
       let pass = 'no';
       if(!client.config.dev.includes(message.author.id)) {
           if(client.db["owner"].get(`owners`)?.includes(message.author.id)) pass = "no";
           else if(client.db["perm"].get(`perm1_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm1_user_${message.guild.id}`)) pass = 'no'
           else if(client.db["perm"].get(`perm2_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm2_user_${message.guild.id}`)) pass = 'no'
           else if(client.db["perm"].get(`perm3_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm3_user_${message.guild.id}`)) pass = 'no'
           else if(client.db["perm"].get(`perm4_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm4_user_${message.guild.id}`)) pass = 'no'
           else if(client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "public") pass = 'no'
       } else pass = 'oe'
       if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Seul le \`BUYER\` pour utilisé cette commande **`)
       


        let newname = args.join(" "); 
        if(!newname) return message.channel.send("Veuillez me donner un nouveau nom"); 
        if(client.user.username === newname) return message.channel.send("Ce nom d'utilisateur est déjà le mien, veuillez m'en donner un nouveau"); 

        client.user.setUsername(newname); 
        message.channel.send(`Pseudo du bot changé par **${newname}**`); 

    } catch {
        message.reply(`Une erreur est survenue`)
    }
    }
}
const { Message } = require('discord.js');
const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name: "setavatar", 
    description: "Changer la photo de profil du bot", 
    usage: "<prefix>setavatar <lien/image>", 
    categorie: "param",
    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
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


        if(message.attachments.size > 0) { 
            message.attachments.forEach(attachment => {
                client.user.setAvatar(attachment.url)
                .then(u => message.channel.send(`${message.author}, Vous avez changé la photo de profil de votre bot.`))
                .catch(e => { 
                    return message.reply(`Une erreur est survenue`)
                });
            });
            } else if (args.length) {
                let str_content = args.join(" ")
                client.user.setAvatar(str_content)
                .then(u => message.channel.send(`${message.author}, Vous avez changé la pp de votre bot avec succès`))
                .catch(e => { 
                    return message.reply(`Une erreur est survenue`)
                });
            } else {
                message.channel.send(` ${message.author}, Veuillez fournir un lien ou une image pour changer mon avatar`);
            }

    }
}
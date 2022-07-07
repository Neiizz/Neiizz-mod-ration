const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'prefix',
    aliases: ['setprefix'],
    categorie: "param",

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        try{
          //  if(!client.config.owners.includes(message.author.id) || client.db["owner"].get(`owner_${message.author.id}`) === true) return message.reply(`Vous n'avez pas assez de permissions pour pouvoir utiliser cette commande`).catch(e=>{})
          let pass = 'no';
          if(message.guild.ownerId === message.author.id || !client.config.owners.includes(message.author.id)) {
              if(client.db["owner"].get(`owners_${message.guild.id}`)?.includes(message.author.id)) pass = "oe";
              else if(client.db["perm"].get(`perm1_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm1_user_${message.guild.id}`)) pass = 'no'
              else if(client.db["perm"].get(`perm2_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm2_user_${message.guild.id}`)) pass = 'no'
              else if(client.db["perm"].get(`perm3_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm3_user_${message.guild.id}`)) pass = 'no'
              else if(client.db["perm"].get(`perm4_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm4_user_${message.guild.id}`)) pass = 'no'
              else if(client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "public") pass = 'no'
          } else pass = 'oe'
          if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Tu doit être \`owner\` pour utilisé cette commande **`)
            
            let newprefix = args[0]
            if(!newprefix) return message.channel.send("Tu ne m'a donné aucun prefix.").catch(e=>{})
            let currentprefix = client.db['settings'].get(`prefix_${message.guild.id}`, true, client.config.prefix) || client.config.prefix
            if(newprefix===currentprefix) return message.channel.send(`Ce prefix est le prefix actuel, veuillez m'en donner un nouveau`).catch(e=>{})
            client.db['settings'].set(`prefix_${message.guild.id}`, newprefix).save()
            message.channel.send(`Mon nouveau prefix est \`${newprefix}\``).catch(e=>{})

        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}
const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "removeperm", 
    aliases: ["rperm"], 
    description: "Retirer un utilisateur d'une perm", 
    usage: "-rperm <1/2/3/4/ban/kick/gw> <user>", 
    categorie: "param",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, lang) => {
        if(message.guild.ownerId === message.author.id || client.config.owners.includes(message.author.id)){
            if(!args.length) return message.channel.send(`${lang.gperm.dperm} : \`1/2/3/4/ban/kick\` `); 

            if(args[0] === "1"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);

                if(!client.db["perm"].get(`perm1_user_${message.guild.id}`).includes(index.id)) return message.channel.send(`${lang.remperm.dperm1}`); 

                client.db["perm"].remove(`perm1_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.remperm.aperm1}`);
                if(client.db["perm"].get(`perm1_user_${message.guild.id}`) === null || client.db["perm"].get(`perm1_user_${message.guild.id}`) === undefined){client.db["perm"].set(`perm1_user_${message.guild.id}`, []).save();}
            }
            if(args[0] === "2"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);

                if(!client.db["perm"].get(`perm2_user_${message.guild.id}`).includes(index.id)) return message.channel.send(`${lang.remperm.dperm2}`); 

                client.db["perm"].remove(`perm2_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.remperm.aperm2}`);
                if(client.db["perm"].get(`perm2_user_${message.guild.id}`) === null || client.db["perm"].get(`perm2_user_${message.guild.id}`) === undefined){client.db["perm"].set(`perm2_user_${message.guild.id}`, []).save();}
            }
            if(args[0] === "3"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);
                
                if(!client.db["perm"].get(`perm3_user_${message.guild.id}`).includes(index.id)) return message.channel.send(`${lang.remperm.dperm3}`); 

                client.db["perm"].remove(`perm3_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.remperm.aperm3}`);
                if(client.db["perm"].get(`perm3_user_${message.guild.id}`) === null || client.db["perm"].get(`perm3_user_${message.guild.id}`) === undefined){client.db["perm"].set(`perm3_user_${message.guild.id}`, []).save();}
            }
            if(args[0] === "4"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);
                
                if(!client.db["perm"].get(`perm4_user_${message.guild.id}`).includes(index.id)) return message.channel.send(`${lang.remperm.dperm4}`); 
    
                client.db["perm"].remove(`perm4_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.remperm.aperm4}`);
                if(client.db["perm"].get(`perm4_user_${message.guild.id}`) === null || client.db["perm"].get(`perm4_user_${message.guild.id}`) === undefined){client.db["perm"].set(`perm4_user_${message.guild.id}`, []).save();}
            }
            if(args[0] === "ban"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);
                
                if(!client.db["perm"].get(`permban_user_${message.guild.id}`).includes(index.id)) return message.channel.send(`${lang.remperm.dpermBan}`); 
                client.db["perm"].remove(`permban_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.remperm.apermBan}`);
                if(client.db["perm"].get(`permban_user_${message.guild.id}`) === null || client.db["perm"].get(`permban_user_${message.guild.id}`) === undefined){client.db["perm"].set(`permban_user_${message.guild.id}`, []).save();}
            }
            if(args[0] === "kick"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);
                
                if(!client.db["perm"].get(`permkick_user_${message.guild.id}`).includes(index.id)) return message.channel.send(`${lang.remperm.dpermKick}`); 

                client.db["perm"].remove(`permkick_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.remperm.apermKick}`);
                if(client.db["perm"].get(`permkick_user_${message.guild.id}`) === null || client.db["perm"].get(`permkick_user_${message.guild.id}`) === undefined){client.db["perm"].set(`permkick_user_${message.guild.id}`, []).save();}
            }
            if(args[0] === "gw"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);
                
                if(!client.db["perm"].get(`permgw_user_${message.guild.id}`).includes(index.id)) return message.channel.send(`${lang.remperm.dpermGw}`); 

                client.db["perm"].remove(`permgw_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.remperm.apermGw}`);
                if(client.db["perm"].get(`permgw_user_${message.guild.id}`) === null || client.db["perm"].get(`permgw_user_${message.guild.id}`) === undefined){client.db["perm"].set(`permgw_user_${message.guild.id}`, []).save();}
            }
        }
    }
}
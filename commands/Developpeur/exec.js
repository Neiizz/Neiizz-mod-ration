const Discord = require('discord.js'); 
const {bot} = require('../../structures/client'); 
const {exec} = require('child_process'); 

module.exports = {
    name: "terminal", 
    aliases: ["texec", "exec"],  
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(client.config.dev.includes(message.author.id)){

        let cmd = args.join(" ")
        if(!cmd) return;
    try {
        exec(cmd, async(err, req) => {
            if(err) throw err;
            message.channel.send("```" + req.toString().slice(0, 2000) + "```"); 
        })
    } catch(e){
        let embed = new Discord.MessageEmbed()
        .setTitle("ERREUR")
        .setDescription(`${e}`); 
        message.channel.send({embeds : [embed]}); 
    }

        }
    }
}
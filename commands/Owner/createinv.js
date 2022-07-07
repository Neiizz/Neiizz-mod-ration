const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "createinv", 
    aliases: ["createinvite"], 
    description: "Créer une invite d'un serveur", 
    usage: "-createinv <guildID>", 
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {*} lang 
     */
    run: async(client, message, args, lang, commandName) => {
        let pass = 'no';
        if(!client.config.owners.includes(message.author.id)) {
            if(client.db["owner"].get(`owners`)?.includes(message.author.id)) pass = "oe";
            else if(client.db["perm"].get(`perm1_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm1_user_${message.guild.id}`)) pass = 'no'
            else if(client.db["perm"].get(`perm2_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm2_user_${message.guild.id}`)) pass = 'no'
            else if(client.db["perm"].get(`perm3_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm3_user_${message.guild.id}`)) pass = 'no'
            else if(client.db["perm"].get(`perm4_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm4_user_${message.guild.id}`)) pass = 'no'
            else if(client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "public") pass = 'no'
        } else pass = 'oe'
        if(pass === 'no') return;

        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        if(!args.length) return message.channel.send(`Veuillez préciser : \`bot/server\``); 
            if(args[0] === "server"){
            let guildID = client.guilds.cache.get(args[1]); 
            if(!guildID) return message.channel.send(`id de serveur invalide`); 
            const channels = guildID.channels.cache.random(); 

            await channels.createInvite().then((invite) => {
                message.channel.send(`Invitation créée avec succès\n${invite}`); 
            })
        }
        if(args[0] === "bot"){
            let botID = args[1];
            if(!botID) return message.channel.send(`Donnez moi l'id d'un bot valide`);

            const invite = `https://discord.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=8`; 

            let embed = new Discord.MessageEmbed()
            .setTitle("Invite Bot")
            .setColor(color || client.config.color)
            message.channel.send({embeds : [embed]}).then((msg) => {
                embed.setDescription(`[L'invite de votre bot](${invite})`);
                msg.edit({embeds : [embed]});
            })

        }
        console.log(`[${message.guild.name} | ${message.author.tag}] - createinv éxecuté`.cyan)
    }
}
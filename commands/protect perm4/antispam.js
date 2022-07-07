const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "antispam", 
    description: "Empêcher le spam sur le serveur", 
    usage: "-antispam <on/off/max>", 
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

        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;


        if(!args.length) return message.channel.send(`Veuillez me préciser \`on/off/max/allow\``); 

            if(args[0] === "on") {
                if(client.db["protect"].get(`antispam_${message.guild.id}`) === "on") return message.channel.send(`La protection est déjà activé`); 

                client.db["protect"].set(`antispam_${message.guild.id}`, "on").save();
                message.channel.send(`La protection est désormais **activé**`); 

            }
            if(args[0] === "off") {
                if(client.db["protect"].get(`antispam_${message.guild.id}`) === "off") return message.channel.send(`La protection est déjà désactivé`); 

                client.db["protect"].set(`antispam_${message.guild.id}`, "off").save();
                message.channel.send(`La protection est désormais **désactivé**`); 

            }
            if(args[0] === "max") {
                if(client.db["protect"].get(`antispam_${message.guild.id}`) === "max") return message.channel.send(`La protection est déjà activé sur max`); 
                
                client.db["protect"].set(`antispam_${message.guild.id}`, "max").save();
                message.channel.send(`La protection est désormais activé sur **max**`);

            }
            if(args[0] === "allow"){
                if(!args[1]) return message.channel.send("Veuillez préciser `add/remove/reset/show`");
                if(args[1] === "add"){
                let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);
                if(!channel) return message.channel.send("Donnez moi un salon valide");

                if(client.db["protect"].get(`allowspam_${message.guild.id}`)?.includes(channel.id)) return message.channel.send("Ce salon est déjà ignoré par l'antispam"); 

                client.db["protect"].push(`allowspam_${message.guild.id}`, channel.id).save();
                message.channel.send(`<#${channel.id}> ajouté aux salons ignorés par l'antispam`);

                }
                if(args[1] === "remove"){
                    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);
                    if(!channel) return message.channel.send("Donnez moi un salon valide");

                    if(!client.db["protect"].get(`allowspam_${message.guild.id}`)?.includes(channel.id)) return message.channel.send("Ce salon n'est pas ignoré par l'antispam"); 

                    client.db["protect"].remove(`allowspam_${message.guild.id}`, channel.id).save();
                    message.channel.send(`<#${channel.id}> retiré des salons ignorés par l'antispam`);

                }
                if(args[1] === "reset"){
                    let amount = 0
                    message.guild.channels.cache.forEach(async(channel) => {
                        if(client.db["protect"].get(`allowspam_${message.guild.id}`)?.includes(channel.id)){
                            client.db["protect"].remove(`allowspam_${message.guild.id}`, channel.id).save();
                            amount = amount + 1
                        }
                    })
                    message.channel.send(`${amount.toLocaleString()} salons retiré(s) de(s) salon(s) ignoré(s) par l'antispam`);

                }
                if(args[1] === "show"){
                    let allow = client.db["protect"].get(`allowspam_${message.guild.id}`);
                    if(allow === null || allow === undefined || !allow) allow = "Liste des salons ignorés vide";
                    let allowspam = allow?.map(function(sp) {return `<#${sp}>`}).join("\n");

                    let embed = new Discord.MessageEmbed()
                    .setTitle("Antispam Allow")
                    .setDescription(`${allowspam}`)
                    .setColor(color || client.config.color)

                    message.channel.send({embeds : [embed]});

                }
            }
    }
}
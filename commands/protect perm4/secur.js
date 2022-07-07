const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "secur", 
    aliases: ["protection", "security", "protect", "protections"], 
    description: "Voir toutes les protections du bot sur le serveur", 
    usage: "-protection [on/off/max]", 
    categorie: "perm4",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
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

        let prefix = client.db['settings'].get(`prefix_${message.guild.id}`, true, client.config.prefix) || client.config.prefix

        if(!args.length){
            let antilink = client.db["protect"].get(`antilink_${message.guild.id}`);
            if(antilink === "on") antilink = "\`✅\` *(5/s = ban/kick/derank)* ";
            if(antilink === "off") antibot = "\`❌\`";
            if(antilink === undefined || antilink === null) antilink = "\`❌\`";
            if(antilink === "max") antilink = "\`⛔️\` *(3/s = ban/kick/derank)* "; 

            let antispam = client.db["protect"].get(`antispam_${message.guild.id}`);
            if(antispam === "on") antispam = "\`✅\` *(13/s = ban/kick/derank)* ";
            if(antispam === "off") antispam ="\`❌\`";
            if(antispam === undefined || antispam === null) antispam = "\`❌\`";
            if(antispam === "max") antispam = "\`⛔️\` *(13/s = ban)* ";

            let antiweb = client.db["protect"].get(`antiweb_${message.guild.id}`);
            if(antiweb === "on") antiweb = "\`✅\` *(3/s = ban/kick/derank)* ";
            if(antiweb === "off") antiweb = "\`❌\`";
            if(antiweb === undefined || antiweb === null) antiweb = "\`❌\`";
            if(antiweb === "max") antiweb = "\`⛔️\` *(1/s = ban/kick/derank)* ";


            let embed = new Discord.MessageEmbed()
            .setTitle("〃 Panel des Sécurités")
            .setDescription(`**Anti-Link -** ${antilink} \n**Anti-Spam -** ${antispam} \n**Anti-Webhooks -** ${antiweb} \n\n▬▬▬▬▬▬▬▬\n\`✅\` **-** \`${prefix}secur on\` **➜** *Activé toutes les sécurités* \n\`❌\` **-** \`${prefix}secur off\` **➜** *Désactivé toutes les sécurités* \n\`⛔️\` **-** \`${prefix}secur max\` **➜** *Activé toutes les sécurité au max* `)
            .setTimestamp()
            .setColor(color || client.config.color)
            .setFooter({ text: `Pannel Anti-Raid` })

            message.channel.send({embeds: [embed]});

        }
        else if(args[0] === "on"){
            client.db["protect"].set(`antilink_${message.guild.id}`, "on").save();
            client.db["protect"].set(`antispam_${message.guild.id}`, "on").save();
            client.db["protect"].set(`antiweb_${message.guild.id}`, "on").save();

            const embed1 = new Discord.MessageEmbed()
            .setDescription(`\`✅\` **Toutes les securités sont désormais** \`activé\``)
            .setColor(color || client.config.color)

            message.channel.send({ embeds: [embed1] })

        }
        else if(args[0] === "off"){
            client.db["protect"].set(`antilink_${message.guild.id}`, null).save();
            client.db["protect"].set(`antispam_${message.guild.id}`, null).save();
            client.db["protect"].set(`antiweb_${message.guild.id}`, null).save();

            const embed1 = new Discord.MessageEmbed()
            .setDescription(`\`❌\` **Toutes les securités sont désormais** \`désactivé\``)
            .setColor(color || client.config.color)

            message.channel.send({ embeds: [embed1] })

        }
        else if(args[0] === "max"){
            client.db["protect"].set(`antilink_${message.guild.id}`, "max").save();
            client.db["protect"].set(`antispam_${message.guild.id}`, "max").save();
            client.db["protect"].set(`antiweb_${message.guild.id}`, "max").save();

            const embed1 = new Discord.MessageEmbed()
            .setDescription(`\`⛔️\` **Toutes les securités sont désormais au** \`maximum\``)
            .setColor(color || client.config.color)

            message.channel.send({ embeds: [embed1] })

        }
    }
}
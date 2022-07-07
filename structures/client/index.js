const { Client, Collection, Intents } = require('discord.js')
const { Database, Table } = require('luma-db-v2')
const fs = require('fs')
const colors = require('colors')
const moment = require('moment')
require("moment-duration-format")
global.print = console.log
class Bot extends Client {
    constructor(options = {
        intents: [Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
       // ws: { properties: { $browser: "Discord iOS" }}
    }) {
        super(options);
        this.setMaxListeners(15)
        this.db = {
            settings: new Table('settings'),
            activity: new Table('activity'), 
            antiraid: new Table('antiraid'), 
            strikes: new Table('strikes'),
            color: new Table('color'),
            owner: new Table("owner"), 
            logs: new Table("logs"), 
            perm: new Table('perm'),
            snipe: new Table("snipe"), 
            system: new Table("system"),
            protect: new Table('protect'),
            punish: new Table("punish"),
            strike: new Table("strike"), 
            blacklist: new Table('blacklist'), 
        }
        this.config = require('../../config')
        this.myDb = new Database({
            name: this.config.database.name,
            password: this.config.database.password,
            tables: [this.db['settings'], this.db["activity"], this.db["antiraid"], this.db["strikes"], this.db["color"], this.db["owner"], this.db["logs"], this.db["perm"], this.db["snipe"], this.db["system"], this.db['protect'], this.db['punish'], this.db['strike'], this.db["blacklist"]  ]
        })
        this.commands = new Collection()
        this.aliases = new Collection()
        this.initCommands()
        this.initEvents()
        this.login(this.config.token)
    }

    initCommands() {
        console.clear()
        print(`[${moment().format('HH:mm:ss')} - Handler] - Chargement des commandes...`.red);  
        const subFolders = fs.readdirSync('./commands')
        for (const category of subFolders) {
            const commandsFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'))
            for (const commandFile of commandsFiles) {
                const command = require(`../../commands/${category}/${commandFile}`)
                this.commands.set(command.name, command)
                if (command.aliases && command.aliases.length > 0) {
                    command.aliases.forEach(alias => this.aliases.set(alias, command))
                }
            }
        }
        print(`[${moment().format('HH:mm:ss')} - Handler] - Chargement des commandes fini !`.green)
    }

    initEvents() {
        console.log(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`.white)
        print(`[${moment().format('HH:mm:ss')} - Handler] - Chargement des events...`.red);  
        const subFolders = fs.readdirSync(`./events`)
        for (const category of subFolders) {
            const eventsFiles = fs.readdirSync(`./events/${category}`).filter(file => file.endsWith(".js"))
            for (const eventFile of eventsFiles) {
                const event = require(`../../events/${category}/${eventFile}`)
                this.on(event.name, (...args) => event.run(this, ...args))
                if (category === 'anticrash') process.on(event.name, (...args) => event.run(this, ...args))
            }
        }
        print(`[${moment().format('HH:mm:ss')} - Handler] - Chargement des events fini !`.green)
    }
}

exports.Bot = Bot
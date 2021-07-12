import Discord from 'discord.js'
import fs from 'fs'
import config from './utils/config.mjs'

const client = new Discord.Client()

// コマンド設定
const initCommands = async () => {
  client.commands = new Discord.Collection()

  const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.mjs'))

  for (const file of commandFiles) {
    const command = await import(`./commands/${file}`)
    client.commands.set(command.command.name, command.command)
  }
}
initCommands()

client.on('message', (message) => {
  // 通常メッセージとBOTのメッセージには反応しない
  if (!message.content.startsWith(config.prefix) || message.author.bot) {
    return
  }

  // 入力コマンドのパース
  const args = message.content.slice(config.prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()
  if (!client.commands.has(command)) {
    return
  }

  try {
    // コマンド実行
    client.commands.get(command).execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('there was an error trying to execute that command!')
  }
})

client.login(config.token)

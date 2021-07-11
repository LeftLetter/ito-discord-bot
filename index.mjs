import { getRandomInt, getHands } from './utils/random.mjs'
import Discord from 'discord.js'
import config from './utils/config.mjs'
import themes from './data/theme.mjs'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client()
const token = process.env.DISCORD_TOKEN
const botId = process.env.APP_ID
const itoChannelId = process.env.ITO_CHANNEL_ID

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', async (message) => {
  // BOTのメッセージには反応しない
  if (message.author.bot) {
    return
  }

  // ITOチャンネル（ボイスチャンネル）
  const itoChannel = message.guild.channels.cache.get(itoChannelId)

  // startコマンドで開始
  if (message.content === `${config.prefix}start`) {
    // 手札の生成
    const hands = getHands(itoChannel.members.size)
    console.log(`Hands are ${hands}.`)

    // テーマの決定
    const theme = themes[getRandomInt(themes.length)]
    console.log(`Theme is ${theme}.`)
    let index = 0

    // ITOチャンネルの参加者全員にDM送信
    itoChannel.members.forEach((member) => {
      // BOTは除く
      if (member.user.id !== botId) {
        try {
          member.send(`あなたの番号は ${hands[index]} です！`)
          member.send(`お題は ${theme} です！`)
          console.log(
            `Number ${hands[index]} was dealt to ${member.user.username}.`
          )
        } catch (error) {
          console.error(`Couldn't DM member ${member.user.tag}.`)
        } finally {
          index++
        }
      }
    })
  }
  // お題の追加機能
  else if (message.content === `${config.prefix}add`) {
    message.channel.send('This function is not implemented.')
  }
  // お題一覧表示機能
  else if (message.content === `${config.prefix}show`) {
    message.channel.send('This function is not implemented.')
  }
})

client.login(token)

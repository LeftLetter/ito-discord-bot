import { getRandomInt, getHands } from './utils/random.mjs'
import Discord from 'discord.js'
import config from './utils/config.mjs'
import themes from './data/theme.mjs'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client()
const token = process.env.DISCORD_TOKEN
const botId = process.env.APP_ID

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', async (message) => {
  // startコマンドで開始
  if (message.content === `${config.prefix}start`) {
    // 手札の生成
    const hands = getHands(message.guild.memberCount - 1) // BOTの分1引く
    console.log(`Hands are ${hands}.`)

    // テーマの決定
    const theme = themes[getRandomInt(themes.length)]
    console.log(`Theme is ${theme}.`)
    let index = 0

    // ギルドの参加者全員にDM送信
    message.guild.members.cache.forEach((member) => {
      // BOTは除く
      if (member.user.id !== botId) {
        try {
          member.send(`Your number is ${hands[index]}!`)
          member.send(`Theme is ${theme}!`)
        } catch (error) {
          console.error(`Couldn't DM member ${member.user.tag}.`)
        } finally {
          console.log(
            `Number ${hands[index]} was dealt to ${member.user.username}.`
          )
          index++
        }
      }
    })
  }
})

client.login(token)

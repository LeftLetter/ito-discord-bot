import config from '../utils/config.mjs'
import { getRandomInt, getHands } from '../utils/random.mjs'
import themes from '../data/theme.mjs'

export const command = {
  name: 'start',
  description: 'Start ITO.',
  execute(message, args) {
    // ITOチャンネル（ボイスチャンネル）
    const itoChannel = message.guild.channels.cache.get(config.itoChannelId)

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
        if (member.user.id !== config.botId) {
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
  },
}

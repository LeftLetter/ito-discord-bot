import dotenv from 'dotenv'
dotenv.config()

const config = {
  prefix: '!',
  token: process.env.DISCORD_TOKEN,
  botId: process.env.APP_ID,
  itoChannelId: process.env.ITO_CHANNEL_ID,
}

export default config

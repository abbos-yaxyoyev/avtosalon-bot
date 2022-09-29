import RedisSession from 'telegraf-session-redis'
import { RedisOptions } from '../config/config'

//* hozir buni ishlatganim yo'q
const session = new RedisSession({
  store: {
    // url: RedisOptions.url,
    host: RedisOptions.host,
    port: RedisOptions.port,
  },
  ttl: RedisOptions.ttl,
})
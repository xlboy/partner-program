/**
 * You can link multiple databases here.
 * Refer to: https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md
 *
 *
 */
import Environment from 'configs/environments'

module.exports = {
  type: Environment.DB_TYPE,
  host: Environment.DB_HOST,
  port: Environment.DB_PORT,
  username: Environment.DB_USERNAME,
  password: Environment.DB_PASSWORD,
  database: Environment.DB_DATABASE,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

import * as bootstrap from './bootstrap'
import { print } from './utils'
import path from 'path'
import { createConnection, getConnectionOptions } from 'typeorm'

  ; (async () => {
    const connectionOptions = await getConnectionOptions()
    const entitiesPath = path.resolve(__dirname, '../') + '/app/entities/*.entity.{ts,js}'
    const connection = await createConnection({
      ...connectionOptions,
      entities: [entitiesPath],
      synchronize: true, // 是否要根据entities中的实体自动将数据库表中不齐的字段生成/生成表
    })
    if (connection.isConnected) {
      print.log('database connected.')
    } else {
      print.danger('Database connection failed.')
    }

    bootstrap.connected()
  })().catch(error => console.error(error))

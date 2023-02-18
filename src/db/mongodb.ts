import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.DB_NAME

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

const connectToDatabase = async () => {
  // 检查缓存
  if (cachedClient && cachedDb) {
    // 读取缓存
    return {
      client: cachedClient,
      db: cachedDb,
    }
  }

  // 配置
  const opts: MongoClientOptions = {}

  // 检查 DB 连接
  if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable')
  }

  // 检查 DB 数据库
  if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable')
  }

  // Connect to cluster
  const client = new MongoClient(MONGODB_URI, opts)
  await client.connect()
  const db = client.db(MONGODB_DB)

  // set cache
  cachedClient = client
  cachedDb = db

  return {
    client: cachedClient,
    db: cachedDb,
  }
}

export default connectToDatabase

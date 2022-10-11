const { config } = require('dotenv')
config()

const { Pool } = require('pg')

const devConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'pern_auth',
  password: process.env.PG_PASSWORD,
  port: 5432,
}

const proConfig = {
  connectionString: process.env.DATABASE_URL
}

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? proConfig : devConfig
)

module.exports = {
  query: (text, params) => pool.query(text, params),
}


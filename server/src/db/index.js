const { config } = require('dotenv')
config()

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pern_auth',
  password: process.env.PG_PASSWORD,
  port: 5432,
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}




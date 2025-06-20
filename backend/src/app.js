import express from 'express'
import 'dotenv/config'
import pool from './config/db.js'

const app = express()
const port = process.env.PORT

app.get('/', async(req, res) => {
  const result = await pool.query("SELECT * FROM player_cricket_stats WHERE meets_min_criteria = true ORDER BY dynamic_strike_rate DESC LIMIT 50")
  res.json(result.rows)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

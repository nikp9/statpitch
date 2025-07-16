import {Pool} from 'pg'
import 'dotenv/config'

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT
})

pool.on("connect", () => {
    // console.log("Database connection successful!")
})

export default pool
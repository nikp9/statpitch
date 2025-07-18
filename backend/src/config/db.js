import {Pool} from 'pg'
import 'dotenv/config'

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    max: 30,
    min: 5,
    idleTimeoutMillis: 30000,    
    connectionTimeoutMillis: 2000, 
    acquireTimeoutMillis: 60000,  
})


pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

pool.on("connect", () => {
    // console.log("Database connection successful!")
})

export default pool
import express from 'express'
import 'dotenv/config'
import playerRoutes from './routes/playerRoutes.js';
import searchRoute from './routes/searchRoute.js'

const app = express()
const port = process.env.PORT

app.use('/api/player', playerRoutes);
app.use('/api/searchList', searchRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

import express from 'express'
import 'dotenv/config'
import playerRoutes from './routes/playerRoutes.js';
import searchRoute from './routes/searchRoute.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT

const cors = require('cors');

const allowedOrigins = [
  'https://statpitch.com', 
  'https://www.statpitch.com',
  'http://localhost:3000',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS not allowed for this origin: ${origin}`));
    }
  },
  credentials: true
}));


app.use('/api/player', playerRoutes);
app.use('/api/searchList', searchRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

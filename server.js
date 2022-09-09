const express = require('express')
const mongoose = require('mongoose');
const session = require("express-session")
const { createClient } = require("redis")
const cors = require("cors")
let RedisStore = require("connect-redis")(session)

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require('./config');



// let redisClient = createClient(REDIS_PORT,REDIS_URL);
let redisClient = createClient({
  legacyMode: true,
  socket: {
      port: REDIS_PORT,
      host: REDIS_URL
  }
})

redisClient.connect().catch(console.error)

const app = express()

app.enable("trust proxy")
app.use(cors({}));

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")


mongoose
  .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
  .then(() => { console.log('mongodb connect success yes') })
  .catch((err) => { console.log('mongodb connect error: ' + err.message) })

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,

  cookie: {
    resave: false,
    saveUninitialized: false,
    secure: false,
    httpOnly: true,
    maxAge: 60000
  }
}));


app.use(express.json())

app.use("/api/v1/users", userRouter);

app.use("/api/v1/posts", postRouter); 

app.get('/api', function (req, res) {
  
  res.send('HACKED YAKUZA!!')
  console.log("Hell yea")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

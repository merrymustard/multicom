require("dotenv").config()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const express = require("express")
const mongoose = require("mongoose")
const logger = require("morgan")
const path = require("path")
const cors = require("cors")
const session = require("express-session")
const passport = require("./config/passport")

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error("Error connecting to mongo", err))

const app_name = require("./package.json").name
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
)

const app = express()

// Middleware Setup
// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// app.use(
//   cors({
//     credentials: true,
//     origin: [process.env.FRONTENDPOINT]
//   })
// )

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTENDPOINT)

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  )

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true)

  // Pass to next layer of middleware
  next()
})

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: { httpOnly: false }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(logger("dev"))

const index = require("./routes/index")
const auth = require("./routes/auth.routes")
app.use("/", index)
app.use("/", auth)

// Uncomment this line for production
// app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

module.exports = app

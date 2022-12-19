import { config } from 'dotenv';

if (process.env.NODE_ENV === 'dev'){
  config()
}

const port = process.env.PORT || 8080;

/* const ADM = process.env.ADM */

import express, { json, urlencoded } from 'express';
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import compression from "compression";
/* import multer from 'multer'; */
import logger from "./loggers/logger.js";
import engine from 'ejs-mate';
/* import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaIMG=path.join(__dirname, '/public','profile-img')
 */

import "./db/conectMongo.js"
import router from "./routes/index.js";
import './middleware/passport.js'

// inicialización
const app = express();

//config plantilla
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('json spaces', 2)

app.use(express.static("public"));
app.use(json())
app.use(compression());
app.use(urlencoded({ extended: true }))

app.use((req, res, next) => {
  app.locals.usuario = req.user;
  next();
});

//session
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGOURI, dbName: process.env.DATABASENAME } ),
    secret: "miPropiaSession",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());

//rutas
app.use("/", router);

app.listen(port, ()=>{
    try {
        logger.info(`SERVER ON: PORT ${port}`)
      } catch (error) {
        logger.error(`ERROR AL INTENTAR LEVANTAR SERVER ON: PORT ${port}:  ${error} `)
      }
})

app.on("error", (error) => logger.error(`Error en servidor: ${error}`));
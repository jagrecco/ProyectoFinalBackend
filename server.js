import { config } from 'dotenv';

if (process.env.NODE_ENV === 'dev'){
  config()
}

const port = process.env.PORT || 8080;
/* const mensajes = [{usrMail: "admin@coder.com", usrMsg: "Bienvenido al chat", date: "2022-08-01 12:00:00"}]; */
const mensajes=[];

import express, { json, urlencoded } from 'express';
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import compression from "compression";
import logger from "./loggers/logger.js";
import engine from 'ejs-mate';

import {leer, guardar} from "./controllers/chatController.js";

import MongoSingleton from "./db/conexionSingleton.js";
MongoSingleton.getInstance(); /* import "./db/conectMongo.js" */

import router from "./routes/index.js";
import './middleware/passport.js'

// inicialización
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

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
  app.locals.usuario = req.user; //envía datos del usuario a todas las vistas
  next();
});

//session
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGOURI, dbName: process.env.DATABASENAME } ),
    secret: "miPropiaSession",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.EXPIRATIONTIME) },
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());

//rutas
app.use("/", router);

httpServer.listen(port, (error) => {
  try {
    logger.info(`SERVER ON: PORT ${port}`);
  } catch (error) {
    logger.error(`ERROR AL INTENTAR LEVANTAR SERVER ON: PORT ${port}:  ${error} `);
  }
});

io.on("connection", (socket) => {

  logger.info(`¡Nuevo cliente conectado!`);

  leer().then((data) => {
    socket.emit("mensaje", data);
  })
  /* socket.emit("mensaje", mensajes); */

  socket.on("mensaje", (data) => {

    mensajes.push(data)
    
    io.sockets.emit("mensaje", mensajes);

    guardar(data).then((data) => {})

  });

});

/* io.on("connection", function(socket) {

  logger.info(`¡Nuevo cliente conectado!`);

  socket.emit("mensaje", mensajes);

  socket.on("mensaje", (data) => {

    mensajes.push(data)
    io.sockets.emit("mensaje", mensajes);

  });

}); */

/* io.on("connection", (socket)=>{chat2({socket, mensajes})}); */

// Servidor socket
/* io.on("connection", chat); */
/* app.listen(port, ()=>{
    try {
        logger.info(`SERVER ON: PORT ${port}`)
      } catch (error) {
        logger.error(`ERROR AL INTENTAR LEVANTAR SERVER ON: PORT ${port}:  ${error} `)
      }
}) */

app.on("error", (error) => logger.error(`Error en servidor: ${error}`));
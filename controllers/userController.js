import logger from "../loggers/logger.js";
import { enviarMail } from "../utils/enviarMails.js";
import Usuario from "../models/user.js";
import path from 'path';

export function loginUsr (req, res) { // RUTA EN DESHUSO /////
  
    res.status(200).render('signin')

}

export async function raizUsr (req, res) {

    if (req.session.user) { res.redirect('/api/productos/Todos') };
    const usuario=req.session.user;
    const usrID="";
    res.status(200).render('signin', {usuario, usrID});

}

export function logoutUser(req, res)  {

    const usuario=req.session.user
    
    req.session.destroy((err) => {
      if (!err) {
        logger.info(`${usuario} cerró su sesión`);
        process.env.USERID="";
        res.redirect('/')
    }
      else {
        logger.error(`Error al cerrar la sesión ${err}`)
        res.redirect('/')
    };
    });
}

export function ingresoApp(req, res) {
  
    const { email } = req.body;
    
    req.session.user = email;
    res.redirect('api/productos/Todos')
    
}

export async function profileGet(req, res){

    const usuario=req.session.user
    const user = await Usuario.findOne({ email: req.session.user });
  
    const tmpFoto=user.foto;
    const usrID=process.env.USERID
    
    user.foto=path.join('profile-img',tmpFoto)
    
    res.status(200).render('profile', {user, usuario, usrID})
  
}

export async function profilePost (req, res){
  
    const { email, password, nombre, direccion, edad, telefono} = req.body;
  
    let foto=req.body.foto
    
    if(req.file) foto=req.file.filename
    
    try {
  
      await Usuario.updateOne({ "email" : req.session.user }, {$set:{email:email, nombre:nombre, direccion:direccion, edad:edad,telefono:telefono,foto:foto}})
  
    } catch (error) {
  
      logger.error(`Error modificando usuario: ${error}`)
  
    }
  
    res.redirect("/api/productos/Todos");
    
};

export function registerGet(req, res){
  
    res.render("register");
  
};

export async function registerPost (req, res){
  
    const { email, password, nombre, direccion, edad, telefono } = req.body;
    
    let foto="profile_img.png"
  
    //si no subió foto de perfil usa la predeterminada
    if (req.file) {foto=req.file.filename}
  
    Usuario.findOne({ "email" : req.body.email }, async (err, user) => {
      if (err) {
          logger.error(`Error de registro: ${err}`)
          res.render('errorRegistro');
      };
      if (user) {
          logger.error(`Intento de registrar usuario existente: ${user}`)
          res.render('errorRegistro');
      }
      
      if (!user) {
        const newUser = new Usuario({ email, password, nombre, direccion, edad, telefono, foto });
        const hashedPassword = await newUser.encryptPassword(password);
        newUser.password=hashedPassword;
        
        await newUser.save();
        //pasar dos objetos: el primero para nuevo registro, el segundo para pedidos realizados
        enviarMail({email, nombre, direccion, edad, telefono, foto});
        res.redirect("/login");
      }
    
    });
  };
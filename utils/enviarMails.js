import logger from "../loggers/logger.js";
import { createTransport } from "nodemailer";
import { readFile } from 'fs/promises'

const email = await readFile('./utils/email.json', 'utf-8')

const EMAIL = process.env.EMAIL //"julio.grecco@gmail.com";
const PASS_MAIL = process.env.PASS_MAIL

const transporter = createTransport({
    service: "gmail", // host: "gmail"
    port: 587,
    auth: {
        user: EMAIL,
        pass: PASS_MAIL,
    },

});


const emailContent = JSON.parse(email);

emailContent.to = process.env.EMAIL_ADMIN

async function enviarMail(registro) {

    const {email, nombre, direccion, edad, telefono, foto} = registro;

    const txt=`email: ${email} / nombre: ${nombre} / dirección: ${direccion} / edad: ${edad} / teléfono: ${telefono} / foto: ${foto}`

    emailContent.text="Nuevo registro en el sistema\n".concat(txt);

    const tabla=`<table align="center" border="1" style="width:100%"><tr><th>Email</th><th>Nombre</th>
    <th>Dirección</th><th>Edad</th><th>Teléfono</th><th>Foto</th></tr>
    <tr><td style="padding:5px">${email}</td><td style="padding:5px">${nombre}</td>
    <td style="padding:5px">${direccion}</td><td style="padding:5px">${edad}</td><td style="padding:5px">${telefono}</td>
    <td style="padding:5px">${foto}</td></tr></table>`

    emailContent.html="<h1 style='color: blue'>Nuevo registro al sistema</h1><br/>".concat(tabla);

    try {
      const info = await transporter.sendMail(emailContent);
      logger.info(`Mail enviado a ${info.envelope.to}`);
    } catch (err) {
        logger.error(`Error de envío de mail: ${err}`);
    }
    
}

export {enviarMail};
import { persisteOrder, leerOrdenes } from "../daos/orderDao.js";


export async function ordersGet(idUsr){
    leerOrdenes(idUsr);
};

export async function ordersPost(req, res) {

    const { idUsr } = req.params;
    const usuario=req.session.user
    const usrID=process.env.USERID
  
    const data = await leerOrdenes.buscarCarro(id);
  
    if (data.length==0) {
      res.status(302).render("carritoVacio",{usuario, usrID});
    } else {
      const carro=data[0];
      res.status(201).render("carrito", {carro, usuario, usrID});
    }
};

export async function ordersDelete(){

};
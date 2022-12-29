import { carritosDao } from "../daos/index.js";

export async function carritoGetTodos (req, res) {
    const datos = await carritosDao.listarTodos()
    res.status(201).json(datos)
};

export async function carritoPostAgregarProducto (req, res) {

    const { carro } = req.params
    const producto=JSON.stringify(req.body)

    const carrito = await carritosDao.listarUno(carro);
    console.log(carrito);

    const data = await carritosDao.agregarProducto(carro, producto)
    res.status(201).json(data)
  
};

export async function carritoDelete (req, res) {
    const id = req.params.id
    const data = await carritosDao.borrarUno(id);
    res.status(200).json(data);
};

export async function carritoGetSegunUsuario (req, res) {  
    const { id } = req.params;
    const usuario=req.session.user
    const usrID=process.env.USERID
  
    const data = await carritosDao.buscarCarro(id);
  
    if (data.length==0) {
      res.status(302).render("carritoVacio",{usuario, usrID});
    } else {
      const carro=data[0];
      res.status(201).render("carrito", {carro, usuario, usrID});
    }
};

export async function carritoDeleteProducto (req, res) { 
    const idCarrito = req.params.id   
    const idProducto = req.params.idProducto
    const data = await carritosDao.eliminarProducto(idCarrito, idProducto)
    res.json(data)
};
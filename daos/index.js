import dotenv from 'dotenv';
dotenv.config();

let productosDao;
let carritosDao;

const PERS = process.env.PERS || "memoria";

switch (PERS) {
  
  case 'mongoDB':
    import ("./mongoProductosDao.js")
      .then (module => productosDao = new module.default)

    import ("./mongoCarritoDao.js")
      .then (module => carritosDao = new module.default)
    
    break;

  case 'archivo':
    import ("./archivoProductosDao.js")
      .then (module => productosDao = new module.default)
    
    import ("./archivoCarritoDao.js")
      .then (module => carritosDao = new module.default)
    break; 

  case 'memoria':
    import ("./memoriaProductosDao.js")
      .then (module => productosDao = new module.default)

    import ("./memoriaCarritoDao.js")
      .then (module => carritosDao = new module.default)
    break;

  case 'firebase':
    import ("./firebaseProductosDao.js")
        .then (module => productosDao = new module.default)

    import ("./firebaseCarritoDao.js")
        .then (module => carritosDao = new module.default)
      
    break;    
    
}
export {productosDao, carritosDao}
import mongoose from "mongoose";

const url="https://i.picsum.photos/id/119/3264/2176.jpg?hmac=PYRYBOGQhlUm6wS94EkpN8dTIC7-2GniC3pqOt6CpNU"

const orderSchema = new mongoose.Schema({
    idUsuario: { type: String, required: true, max: 100 },
    usrMail: { type: String, required: true, trim: true, default: "Sin mail" },
    timestamp:  { type: Date, default: Date.now },
    dirEntrega: {type: String, max: 200, required: true, default: "Sin dirección" },
    productos: [
        {
            timestamp: { type: Date, default: Date.now },
            nombre: { type: String, required: true, max: 100 },
            descripcion: { type: String, required: true, max: 100 },
            foto: { type: String, required: true, default: url , max: 100 },
            precio: { type: Number, required: true },
            cantidad: { type: Number, required: true, default: 1 },
            codigo: { type: String, max: 100 },
        }
    ]
    });


const OrdersModel = mongoose.model("orders", orderSchema);
export { OrdersModel };
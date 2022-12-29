import mongoose from "mongoose";

const url="https://i.picsum.photos/id/119/3264/2176.jpg?hmac=PYRYBOGQhlUm6wS94EkpN8dTIC7-2GniC3pqOt6CpNU"

const orderSchema = new mongoose.Schema({
    timestamp:  { type: Date, default: Date.now },
    idUsuario: { type: String, required: true, max: 100 },
    numOrder: {type: Number, require: true, unique: true },
    estado: { type: String, required: true, max: 50, default: "generada" },
    productos: [
        {
            timestamp: { type: Date, default: Date.now },
            nombre: { type: String, required: true, max: 100 },
            descripcion: { type: String, required: true, max: 100 },
            codigo: { type: String, required: true, max: 30 },
            foto: { type: String, required: true, default: url , max: 100 },
            precio: { type: Number, required: true },
            cantidad: { type: Number, required: true, default: 1 },
        }
    ]
    });

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel;
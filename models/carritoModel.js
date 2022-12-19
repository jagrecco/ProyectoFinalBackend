import mongoose from "mongoose";

const url="https://i.picsum.photos/id/119/3264/2176.jpg?hmac=PYRYBOGQhlUm6wS94EkpN8dTIC7-2GniC3pqOt6CpNU"

const carroSchema = new mongoose.Schema({

    timestamp:  { type: Date, default: Date.now },
    productos: {
        timestamp: { type: Date, default: Date.now },
        nombre: { type: String, required: true, max: 100 },
        descripcion: { type: String, required: true, max: 100 },
        codigo: { type: String, required: true, max: 30 },
        foto: { type: String, required: true, default: url , max: 100 },
        precio: { type: Number, required: true },
        stock: { type: Number, required: true },
    }

    });

export const carritoSchema = mongoose.model("carritoSchema", carroSchema);
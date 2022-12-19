import mongoose from "mongoose";

const url="https://i.picsum.photos/id/119/3264/2176.jpg?hmac=PYRYBOGQhlUm6wS94EkpN8dTIC7-2GniC3pqOt6CpNU"

const prodSchema = new mongoose.Schema({

    id:{type: Number, required:true},
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true, max: 100 },
    category: { type: String, required: true, max: 100 },
    thumbnail:{ type: String, max: 150 },
    images: { type: Array },

    });

export const esquemaProducto = mongoose.model("esquemaProducto", prodSchema);
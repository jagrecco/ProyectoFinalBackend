import mongoose from "mongoose";

const url="https://i.picsum.photos/id/119/3264/2176.jpg?hmac=PYRYBOGQhlUm6wS94EkpN8dTIC7-2GniC3pqOt6CpNU"

const pSchema = new mongoose.Schema({

    id:{type: Number, required:true, default: 0},
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true, default: 1 },
    discountPercentage: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true, max: 100, default: "Sin marca" },
    category: { type: String, required: true, max: 100, default: "Sin categoria" },
    thumbnail:{ type: String, max: 150, default: url },
    // images: { type: Array },

});

const ProdModel = mongoose.model("productos", pSchema);
export default ProdModel
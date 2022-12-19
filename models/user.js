import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  edad: { type: Number, required: true },
  telefono: { type: String, required: true },
  foto: { type: String, default:"profile_img.png", required: true },
  adm: { type: Boolean, default:false},
},
{
  timestamps: true,
  versionKey: false,
});


UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.models.Usuario || mongoose.model('Usuario', UserSchema);
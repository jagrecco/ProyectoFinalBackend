import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

    timestamp:  { type: Date, default: Date.now },
    usrMail: { type: String,  max: 100 },
    usrMsg: { type: String,  max: 100 },

    });

export const chatModel = mongoose.model("chats", chatSchema);
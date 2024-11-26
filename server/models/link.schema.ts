import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

export const LinkSchema = defineMongooseModel({
    name: "Link",
    schema: {
        url: {
            type: String,
            required: true,
        },
        shortCode: {
            type: String,
            required: true,
            unique: true,
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        clicks: {
            type: Number,
            required: false,
            default: 0
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }
})
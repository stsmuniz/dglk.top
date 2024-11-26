import {defineMongooseModel} from "#nuxt/mongoose";
import mongoose from "mongoose";

export const ClickSchema = defineMongooseModel({
    name: "Click",
    schema: {
        path: {
            type: String,
            required: true,
            unique: false,
        },
        browser: {
            type: String,
            required: true,
            unique: false,
        },
        device: {
            type: String,
            required: true,
            unique: false,
        },
        os: {
            type: String,
            required: true,
            unique: false,
        },
        timestamp: {
            type: String,
            required: true,
            unique: false,
        },
        location: {
            type: Object,
            required: true,
            unique: false,
        },
        link_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Link",
        }
    }
})
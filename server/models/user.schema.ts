import { defineMongooseModel } from "#nuxt/mongoose";

export const UserSchema = defineMongooseModel({
    name: "User",
    schema: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: false,
        },
        token_creation: {
            type: String,
            required: false,
            unique: false,
        },

    }
})
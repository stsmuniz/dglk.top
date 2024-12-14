import bcrypt from 'bcrypt';
import {UserSchema} from "~/server/models/user.schema";

export default defineEventHandler(async event => {
    const password_reset_token = event.context.params.password_reset_token
    const user = await UserSchema.findOne({ password_reset_token });
    const body = await readBody(event);
    const password = await bcrypt.hash(body.password, 10);
    console.log(password, password_reset_token)
    console.log(user)

    if (!user) {
        throw createError({statusCode: 403, message: "Token inválido"})
    }

    try {
        user.password = password
        UserSchema.findOneAndUpdate(user._id, {$set: user}, { new: true })
        return {token, user};
    } catch (e) {
        throw new Error(e)
    }
})
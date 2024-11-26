import {UserSchema} from "~/server/models/user.schema";
import bcrypt from "bcrypt";

export default defineEventHandler(async event => {
    const body = await readBody(event)
    if (body.password) {
        body.password = await bcrypt.hash(body.password, 10)
    }
    try {
        const res = await UserSchema.findOneAndUpdate({_id: event.context.params?.id}, body, {new: true})
        return res
    }
    catch (error) {
        return error
    }
})
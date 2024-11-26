import {UserSchema} from "~/server/models/user.schema";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    body.password = await bcrypt.hash(body.password, 10)
    try {
        return await new UserSchema(body).save()
    }
    catch (error) {
        return error
    }
})
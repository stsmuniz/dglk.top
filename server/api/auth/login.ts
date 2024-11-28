import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {UserSchema} from "~/server/models/user.schema";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const {email, password} = body;
    console.log(email, password)
    const user = await UserSchema.findOne({ email });
    console.log(user)
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw createError({statusCode: 401, message: "Credenciais Inválidas"})
    }

    const runtimeConfig = useRuntimeConfig()
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET || runtimeConfig.jwtSecret)
    user.token = token
    user.token_creation = new Date().toISOString()
    console.log(user)
    UserSchema.findOneAndUpdate(user._id, user, { new: true })
    return {token, user};
})
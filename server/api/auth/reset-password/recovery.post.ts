import bcrypt from 'bcrypt';
import {UserSchema} from "~/server/models/user.schema";
import {sendEmail} from "~/server/utils/sendEmail";
import {passwordReset} from "~/server/utils/email_templates/passwordReset";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const email = body.email;
    console.log(email)
    const user = await UserSchema.findOne({ email });
    console.log(user)

    if (!user) {
        throw createError({statusCode: 403, message: "Usuário não encontrado"});
    }

    user.password_reset_creation = new Date().toISOString()
    user.password_reset_token = await bcrypt.hash(`${user.password}${user.token_creation}`, 10);

    try {
        const config = useRuntimeConfig();
        const appUrl = config.public.appUrl;
        UserSchema.findOneAndUpdate(user._id, user, { new: true })
        const messageBody = passwordReset(user.name, user.email, `${appUrl}/reset-password/${user.password_reset_token}`)
        sendEmail(user.email, 'Recuperação de e-mail', messageBody)
        return {user};
    } catch (e) {
        throw new Error(e)
    }
})
import {UserSchema} from "~/server/models/user.schema";
import bcrypt from "bcryptjs";
import {sendEmail} from "~/server/utils/sendEmail";
import {signup} from "~/server/utils/email_templates/signup";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    body.password = await bcrypt.hash(body.password, 10)
    try {
        const res =  await new UserSchema(body).save()
        const config = useRuntimeConfig();
        const appUrl = config.public.appUrl;
        const messageBody = signup(body.name, body.email, appUrl)
        sendEmail(body.email, 'Cadastro criado', messageBody)
        return res
    } catch (e) {
        throw new Error(e)
    }
})
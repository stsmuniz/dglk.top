import { Resend } from "resend";

const runtimeConfig = useRuntimeConfig()
const apiKey: string = runtimeConfig.resendApiKey

const resend = new Resend(apiKey);

export const sendEmail = async (to: string, subject: string, message: string) => {
    try {
        const data = await resend.emails.send({
            from: runtimeConfig.resendFrom,
            // to: [to],
            to: [to],
            subject: subject,
            html: message
        });

        return data;
    } catch (e) {
        throw new Error(e)
    }
}
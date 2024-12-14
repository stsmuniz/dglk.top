export const useSendEmail = () => {
    const sendEmail = (async (to: string, subject: string, message: string) => {
        try {
            const data = await resend.emails.send({
                from: runtimeConfig.resendFrom,
                // to: [to],
                to: [to],
                subject: subject,
                html: message
            });

            return data;
        } catch (error) {
            throw new Error(error)
        }
    })

    return { sendEmail }
}
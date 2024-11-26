import jwt from "jsonwebtoken";

export default defineEventHandler(async event => {
    if (event.path.startsWith('/api/auth') || event.path.startsWith('/api/links') || !event.path.startsWith('/api'))
        return;
    const authorization = getRequestHeader(event, "authorization");
    if (!authorization) {
        throw createError({message: 'Token não encontrado.', status: 403, fatal: true})
    }
    try {
        const runtimeConfig = useRuntimeConfig()
        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(token, runtimeConfig.jwtSecret)
    } catch (e) {
        throw createError({ statusCode: 401, message: 'Token inválido ou expirado.' });
    }
})
import jwt from "jsonwebtoken";

const exceptions: Array<string> = [
    '/api',
    '/api/auth',
    '/api/auth/reset-password',
    '/api/links',
    '/api/users/create',
]

export default defineEventHandler(async event => {
    if (exceptions.filter(s => event.path.startsWith(s))) {
        return;
    }
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
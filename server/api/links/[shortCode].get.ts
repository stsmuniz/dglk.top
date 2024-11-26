import {LinkSchema} from "~/server/models/link.schema";

export default defineEventHandler(async (event) => {
    const shortCode = event.context.params?.shortCode
    try {
        return await LinkSchema.findOne(
            {shortCode, active: true},
        );
    } catch (error) {
        throw createError({
            message: 'code not found',
            statusCode: 404
        })
    }
})
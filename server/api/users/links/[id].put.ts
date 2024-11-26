import {LinkSchema} from "~/server/models/link.schema";

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const id = getRouterParam(event, 'id')
    try {
        return await LinkSchema.findOneAndUpdate({_id: id}, body, {new: true})
    }
    catch (error) {
        return error
    }
})
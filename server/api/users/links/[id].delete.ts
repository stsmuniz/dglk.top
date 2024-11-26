import {LinkSchema} from "~/server/models/link.schema";

export default defineEventHandler(async event => {
    const id = getRouterParam(event, 'id')

    try {
        return await LinkSchema.findOneAndDelete({_id: id})
    }
    catch (error) {
        return error
    }
})
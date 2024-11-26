import {LinkSchema} from "~/server/models/link.schema";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user_id = body.user_id;
    const query = getQuery(event)
    const page = +query.page || 1
    const limit = +query.itensPerPage || 10;
    const offset = (page * limit) - limit;

    try {
        const linkLength = await LinkSchema.find({user_id: user_id}).countDocuments()
        return {
            links: await LinkSchema.find({user_id: user_id}).limit(limit).skip(offset),
            pageCount: Math.ceil((linkLength / limit) * page),
            linkLength
        }
    }
    catch (error) {
        return error
    }
})
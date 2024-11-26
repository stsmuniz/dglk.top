import {LinkSchema} from "~/server/models/link.schema";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        return await new LinkSchema(body).save()
    }
    catch (error) {
        return error
    }
})
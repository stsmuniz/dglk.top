import {LinkSchema} from "~/server/models/link.schema";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    try {
        const link = await LinkSchema.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(id)}},
            {
                $lookup: {
                    from: 'clicks',
                    localField: '_id',
                    foreignField: 'link_id',
                    as: 'link_clicks'
                }
            }
        ]);
        return link.shift()
    } catch (error) {
        throw createError({
            message: 'code not found',
            statusCode: 404
        })
    }
})
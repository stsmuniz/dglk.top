import {UserSchema} from "~/server/models/user.schema";

export default defineEventHandler(async event => {
    try {
        return await UserSchema.findOneAndDelete({_id: event.context.params?.id})
    }
    catch (error) {
        return error
    }
})
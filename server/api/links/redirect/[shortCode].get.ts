// @ts-ignore
import UAParser from "ua-parser-js";
import {LinkSchema} from "~/server/models/link.schema";
import {ClickSchema} from "~/server/models/click.schema";
import {EventHandlerRequest, H3Event} from "h3";


const getClickData = async (event: H3Event<EventHandlerRequest>) => {
    const userAgent = getRequestHeader(event, "user-agent");
    const runtimeConfig = useRuntimeConfig()
    const parser = new UAParser('user-agent');
    const {browser, device, os} = parser.setUA(userAgent).getResult();
    const ip = getRequestHeader(event, 'x-forwarded-for') || getRequestHeader(event, "remote-addr");
    const token = runtimeConfig.ipinfoToken
    const {country, region, city} = await $fetch(`https://ipinfo.io/${ip}?token=${token}`);

    const location = {
        country, region, city
    }

    return {
        browser,
        device,
        os,
        location
    }
}

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const shortCode = event.context.params?.shortCode

    try {
        const link = await LinkSchema.findOne(
            {shortCode, active: true},
        );

        LinkSchema.updateMany({}, {$addToSet: {}})

        const clickData = await getClickData(event);

        const click = {
            path: link.url,
            browser: clickData.browser.name || '-',
            device: clickData.device.model || '-',
            os: clickData.os.name || '-',
            timestamp: new Date().toISOString(),
            location: clickData.location,
            link_id: link._id,
        }

        await new ClickSchema(click).save();

        await LinkSchema.findOneAndUpdate(
            {_id: link._id},
            {$inc: {'clicks': 1}},
            {new: true}
        )

        return link;
    } catch (error) {
        throw new Error(error.message)
    }
})
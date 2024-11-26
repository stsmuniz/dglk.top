export const useLinks = () => {
    const token = useCookie('auth_token');
    const getLink = async (shortCode: string) => {
        try {
            return await $fetch(`/api/links/${shortCode}`);
        } catch (error) {
            throw new Error(error)
        }
    }

    const redirect = async (shortCode: string) => {
        try {
            const { url } = await $fetch(`/api/links/redirect/${shortCode}`)
            navigateTo(url, {
                external: true,
                redirectCode: 302
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    return {getLink, redirect}
}
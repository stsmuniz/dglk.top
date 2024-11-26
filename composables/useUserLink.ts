export const useUserLink = () => {
    const token = useCookie('auth_token');

    const updateUserLink = async (id: string, data: object) => {
        try {
            return await $fetch(`/api/users/links/${id}`, {
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const deleteUserLink = async (id: string) => {
        try {
            return await $fetch(`/api/users/links/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const getLinks = async (userId: string, query: object) => {
        return await $fetch('/api/users/links/', {
            method: 'POST',
            query,
            body: {
                user_id: userId
            },
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        })
    }

    const getLink = async (id: string) => {
        return await $fetch(`/api/users/links/${id}`, {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        })
    }

    const createLink = async (data: object) => {
        return await $fetch('/api/users/links/create', {
            method: 'POST',
            body: data,
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        })
    }

    return { updateUserLink, deleteUserLink, getLinks, getLink, createLink }
}
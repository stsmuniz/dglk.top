import {useUserStore} from "~/stores/user";

export const useUsers = () => {
    const token = useCookie('auth_token');

    const getUser = async (id: string) => {
        try {
            return await $fetch(`/api/users/${id}`, {
                headers: {
                    Authorization: `bearer ${token.value}`
                }
            });
        } catch (error) {
            throw new Error(error)
        }
    }

    const editUser = async(id: string, data: object) => {
        try {
            return await $fetch(`/api/users/${id}`, {
                headers: {
                    Authorization: `bearer ${token.value}`
                }
            });
        } catch (error) {
            throw new Error(error)
        }
    }

    const deleteUser = async (id: string) => {
        try {
            return await $fetch(`/api/users/${id}`, {
                headers: {
                    Authorization: `bearer ${token.value}`
                }
            });
        } catch (error) {
            throw new Error(error)
        }
    }


    return { getUser, editUser, deleteUser }
}
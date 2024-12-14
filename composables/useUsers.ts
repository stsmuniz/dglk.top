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

    const getUserByPasswordToken = async (passwordToken: string, state: object) => {
        try {
            return await $fetch(`/api/auth/reset-password/${passwordToken}`, {
                method: 'POST',
                body: state
            });
        } catch (error) {
            throw new Error(error)
        }
    }

    const createUser = async (state: object) => {
        try {
            const res = $fetch('/api/users/create', {
                method: 'POST',
                body: state
            })
            return res;
        } catch (e) {
            throw new Error(e)
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


    return { getUser, editUser, deleteUser, createUser, getUserByPasswordToken }
}
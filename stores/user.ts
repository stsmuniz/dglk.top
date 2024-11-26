import type { User } from "~/interfaces/user";
import {defineStore} from "pinia";

export const useUserStore = defineStore("user", () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(null);
    const tokenCookie = useCookie('auth_token')
    const tokenCreationDate = useCookie('auth_token_creation')

    const isAuthenticated = computed(() => !!user.value && !!token.value);

    const storeUser = (data: { token: string, user: User }) => {
        user.value = data.user;
        token.value = data.token;
        tokenCookie.value = data.token
        tokenCreationDate.value = data.token_creation
    }

    const deleteUser = () => {
        user.value = null;
        token.value = null;
    }

    const updateUser = (data: any) => {
        user.value.name = data.name;
        user.value.email = data.email;

        return user;
    }

    return { storeUser, deleteUser, updateUser, user, token, isAuthenticated};
}, {
    persist: true,
});

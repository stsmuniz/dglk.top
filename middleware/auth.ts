export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = useUserStore();

    if (!isAuthenticated) {
        return navigateTo('/login');
    }
});

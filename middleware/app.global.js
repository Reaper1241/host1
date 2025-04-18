export default defineNuxtRouteMiddleware((to, from) => {
    const appStore = useAppStore()

    if (process.client) {
        document.body.style.overflow = "auto";
    }

    if (to.name == 'car') {
        appStore.previousPage = from.name
    } else if (from.name == 'car' && to.name == appStore.previousPage) {
    } else {
        appStore.previousPage = ''
        appStore.recentCars.cars = {}
        appStore.recentCars.count = 0
        appStore.recentQuery = ''
    }

})
import axios from 'axios'
import { useAppStore } from '/stores/AppStore.js'
import { apiUsed } from "@/constants/";
import Success from '~/pages/success.vue';

export default function validateForm(phone, appType, name = null, car = null) {
    const appStore = useAppStore()

    let clearPhone = phone.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

    function newOrder(value) {
        id = value.data.id
        appStore.orderId = id
    }

    if (clearPhone.length == 11) {
        axios.post(`${apiUsed}applications`, {
            full_name: name ? name : null,
            phone_number: clearPhone,

            id: car ? car.id : null,
            brand: car ? car.brand : null,
            model: car ? car.model : null,

            send_form: 1,
            send_page: window.location.origin + window.location.pathname + '/',
            source: window.location.origin ? window.location.origin + '/' : null,

            referrer: appStore.reffer ? appStore.reffer + '/' : null,
            entry: appStore.entry ? appStore.entry + '/' : null,
            ip: appStore.ip,

            application_type_id: appType,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                res => newOrder(res);
                car ? yandexEcommercePurchase(appStore.orderId, car) : null;
                navigateTo('/success');
            })
            .catch(err => console.log(err))
    } else {
        return {
            status: false,
            phone:
            {
                error: true,
                message: 'Заполните номер телефона в формате +7 (999) 999-99-99'
            }
        }
    }
}
import axios from 'axios'
import { useAppStore } from '/stores/AppStore.js'
import { apiForm, blackList  } from "@/constants/";

axios.defaults.withCredentials = true

export default function postForm(data, appType, car) {
  const appStore = useAppStore()

  const ip = useCookie('ip')
  ip.value = appStore.ip

  const domain = useCookie('domain')
  domain.value = window.location.hostname

  const formData = Object.keys(data).reduce((acc, key) => {
    if (key === 'name' || key === 'phone') {
      acc[key] = data[key];
    } else {
      acc.comment[key] = data[key];
    }
    return acc;
  }, { comment: {} });

  let clearPhone = formData.phone.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');
  let comment = Object.keys(formData.comment)
    .filter(key => formData.comment[key].toString().trim() !== '')
    .map(key => `${formData.comment[key]}`)
    .join(', ');

    if (blackList.some(blackListed => clearPhone.startsWith(blackListed))) {
      navigateTo('/thank');
    } else {
  axios.post(`${apiForm}`, {
    phone_number: clearPhone,
    full_name: formData.name ? formData.name : null,
    comment: comment ? comment : null,

    car_id: car?.real ? car.id : null,
    brand: car ? car.brand : null,
    model: car ? car.model : null,
    price: car ? (car?.min_price ? car?.min_price : car?.price) : null,

    send_form: 1,
    send_page: window.location.origin + window.location.pathname,
    source: window.location.origin ? window.location.origin + '/' : null, // обязательно должен быть / на конце url

    referrer: window.location.origin + window.location.pathname + (appStore.reffer ? appStore.reffer : ''),
    entry: appStore.entry ? appStore.entry : null,
    ip: appStore.ip,

    application_type_id: appType,
  }, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Domain': `${removeSlash(window.location.origin)}`, // ${window.location.origin}
      'Domain':  'https://host-auto.ru',
    },
    withCredentials: true
  })
    .then(res => {
      appStore.orderId = res.data
      car ? yandexEcommercePurchase(appStore.orderId, car) : null;
    }).catch(err => console.log('неудача'))
    navigateTo('/success');
  }
}
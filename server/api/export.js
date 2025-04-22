import axios from "axios"
import { ref } from "vue"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const output = ref('')

    if (query.token && query.last_request_date) {
        const res = await axios.post(`https://api6.acduhovskoi.store/api/send/mega?token=${query.token}&last_request_date=${query.last_request_date}`, {}, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Domain': 'https://car-bu.ru',
            },
            method: 'post'
        })
        output.value = res.data
    } else {
        output.value = 'error'
    }

    return output.value
})  
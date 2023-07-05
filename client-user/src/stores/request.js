import axios from 'axios'
import { defineStore } from 'pinia'

const useRequestStore = defineStore('request', {
    state: () => {
        return {
            sigin: ''
        }
    },
    actions: {
        getAjax() {
            return axios({})
        },
        postAjax(url, headers, data) {
            return axios({
                method: 'POST',
                url: `http://localhost:3000/${url}`,
                headers,
                data,
            })
        },

    }
})

export default useRequestStore
import axios from 'axios'

const postAjax = (url, headers, data) => {
    return axios({
        method: 'POST',
        url: `http://localhost:3000/${url}`,
        headers,
        data,
    })
}

const getAjax = (url, headers) => {
    return axios({
        method: 'GET',
        url: `http://localhost:3000/${url}`,
        headers,
    })
}

export { postAjax, getAjax }
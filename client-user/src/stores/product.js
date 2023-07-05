import { defineStore } from 'pinia'
import { getAjax } from '../helpers/ajax'

const useProductStore = defineStore('product', {
    state: () => {
        return {
            products: [],
            search: ''
        }
    },
    actions: {
        async getProducts() {
            try {
                const access_token = localStorage.getItem('access_token')
                const { data: product } = await getAjax(
                    'products',
                    { access_token },
                )

                this.products = product.data
            } catch (error) {
                console.log(error);
            }
        }
    }

})

export default useProductStore
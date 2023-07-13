import { defineStore } from 'pinia'
import { getAjax } from '../helpers/ajax'

const useProductStore = defineStore('product', {
    state: () => {
        return {
            search: '',
            products: [],
            bookmark: [],
            pagination: {}
        }
    },
    actions: {
        async getProducts() {
            try {
                const access_token = localStorage.getItem('access_token')
                const { data: product } = await getAjax(
                    'customer/products',
                    { access_token },
                )

                this.products = product.data
                this.pagination = product.pagination
            } catch (error) {
                console.log(error);
            }
        }
    }

})

export default useProductStore
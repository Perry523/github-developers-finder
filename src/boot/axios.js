import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
    }
})
axios.defaults.baseURL = 'https://api.github.com/users/'
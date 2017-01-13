import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Lodash from 'lodash'

import store from './store/'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

import AwesomeHeader from './components/Header'
import YysIndex from './components/yys/Index'
import YysSeal from './components/yys/Seal'
import YysMonsterSearch from './components/yys/MonsterSearch'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Mint)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                header: AwesomeHeader,
                body: YysIndex
            },
        },
        {
            path: '/yys',
            components: {
                header: AwesomeHeader,
                body: YysIndex
            },
        },
        {
            path: '/yys/seal',
            components: {
                header: AwesomeHeader,
                body: YysSeal
            }
        },
        {
            path: '/yys/monster-search',
            components: {
                header: YysMonsterSearch
            }
        }
    ]
})

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
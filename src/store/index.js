/**
 * Created by pc on 2016/12/5.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    selectedMonsters: [
    ]
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})
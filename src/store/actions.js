/**
 * Created by pc on 2016/12/5.
 */

import * as types from './mutation-types'

export default {
    addMonster({ commit }, monster) {
        commit(types.ADD_MONSTER, monster)
    },
    deleteMonster({ commit }, monster) {
        commit(types.DELETE_MONSTER, monster)
    },
    clearMonsters({ commit }) {
        commit(types.CLEAR_MONSTERS)
    }
}
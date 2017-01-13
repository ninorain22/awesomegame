/**
 * Created by pc on 2016/12/9.
 */

import * as types from './mutation-types'

export default {
    [types.ADD_MONSTER] (state, monster) {
        state.selectedMonsters.push(monster)
    },

    [types.DELETE_MONSTER] (state, monster) {
        state.selectedMonsters.$remove(monster)
    },

    [types.CLEAR_MONSTERS] (state) {
        state.selectedMonsters = []
    }
}
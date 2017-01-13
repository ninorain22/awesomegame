<template>
    <div>
        <template v-for="monster in selectedMonsters">
            <mt-cell title="击杀妖怪" to="/yys/monster-search" is-link>{{ monster.name }}</mt-cell>
            <mt-field label="击杀数量" placeholder="输入击杀数量" type="number" v-model="monster.num"></mt-field>
        </template>
        <mt-cell title="击杀妖怪" to="/yys/monster-search" is-link>请选择</mt-cell>
        <mt-button size="large" type="primary" @click.native="optMonsters" :disabled="optDisabled">计算最优路线</mt-button>
        <mt-button size="large" @click.native="clearMonsters">重置</mt-button>
        <mt-cell v-if="haveOptResult" title="最优路线:"></mt-cell>
        <template v-for="optItem in optResult">
            <mt-cell :title="optItem.title">
                击杀&nbsp;<mt-badge type="error">{{ optItem.time }}</mt-badge>&nbsp;次
            </mt-cell>
        </template>
    </div>
</template>

<script>
export default {
    data () {
        return {
            optResult: []
        }
    },
    computed: {
        selectedMonsters () {
            return this.$store.state.selectedMonsters
        },
        optDisabled () {
            return (this.$store.state.selectedMonsters.length == 0)
        },
        haveOptResult () {
            return this.optResult.length > 0
        }
    },
    methods: {
        optMonsters () {
            let optResults = []
            let selectedMonsters = this.$store.state.selectedMonsters
            this.$http.post('/yys/api/seal/opt', { demands: selectedMonsters }).then((response) => {
                let optResultList = JSON.parse(response.body).data
                for (let optItem of optResultList) {
                    optResults.push({
                        title: optItem.dungeonName + ' - 第 ' + optItem.monsterIndex + ' 个' + optItem.monsterName,
                        time: optItem.killTime
                    })
                }
                this.optResult = optResults
            }, (response) => {
                MessageBox.alert('系统错误', '错误');
            })
        },
        clearMonsters () {
            this.$store.dispatch('clearMonsters')
            this.optResult = []
        }
    }
}
</script>

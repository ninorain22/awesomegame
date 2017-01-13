<template>
    <div>
        <mt-search
            v-model="queryString"
            placeholder="请输入妖怪名称"
        >
            <mt-cell
                v-for="monster in filteredMonsters"
                :title="monster.name"
                @click.native="addMonster(monster)"
                >
            </mt-cell>
        </mt-search>
    </div>
</template>

<script>
export default {
    data () {
        return {
            queryString: '',
            monsters: []
        }
    },
    computed: {
        filteredMonsters () {
            return this.monsters.filter((monster) => {
                return (monster.name.indexOf(this.queryString) >= 0)
            })
        }
    },
    methods: {
        loadMonsters () {
            let monsters = []
            this.$http.get('/yys/api/monster/list').then((response) => {
                let monsterList = JSON.parse(response.body).data
                for (let monster of monsterList) {
                    monsters.push({
                        id: monster.id,
                        name: monster.name
                    })
                }
                this.monsters = monsters
            }, (response) => {
                MessageBox.alert('系统错误', '错误');
            })
        },
        addMonster (monster) {
            let selectedMonster = {
                id: monster.id,
                name: monster.name,
                num: 10
            }
            this.$store.dispatch('addMonster', selectedMonster)
            this.$router.go(-1)
        }
    },
    mounted () {
        this.loadMonsters()
    }
}
</script>

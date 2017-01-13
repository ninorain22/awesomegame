<template>
  <div>
    <el-form :model="monsterForm" :rules="monsterRule" ref="monsterForm" label-width="200px" class="demo-dynamic">
      <el-form-item label="选择击杀妖怪及数量"
          v-for="(monster_demand, index) in monsterForm.demands"
      >
        <el-col :span="8">
          <el-form-item>
            <el-autocomplete
                class="inline-input"
                v-model="monster_demand.monster_name"
                :fetch-suggestions="querySearch"
                placeholder="击杀妖怪"
                @select="selectMonster"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-form-item>
            <el-input-number
                v-model="monster_demand.monster_num"
                :min="1"
                :max="20">
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="3">
          <el-button @click.prevent="removeDemand(monster_demand)">删除</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="optDemand">确定</el-button>
        <el-button @click="addDemand">新增击杀妖怪</el-button>
      </el-form-item>
    </el-form>
    <el-table v-if="strategyResult" v-loading="loading" :data="optStrategy" style="width: 100%">
      <el-table-column
        prop="dungeon_name"
        label="副本名称">
      </el-table-column>
      <el-table-column
        prop="monster_name"
        label="妖怪名称">
      </el-table-column>
      <el-table-column
        prop="turn"
        label="击杀次数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      monsters: [],
      monsterForm: {
        demands: [{
          monster_id: 0,
          monster_name: '',
          monster_num: 10
        }]
      },
      monsterRule: {

      },
      loading: false,
      strategyResult: false,
      optStrategy: []
    }
  },
  methods: {
    querySearch (queryString, cb) {
      let monsters = this.monsters
      let results = queryString ? monsters.filter(this.createFilter(queryString)) : monsters;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (monster) => {
        return (monster.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    addDemand () {
      this.monsterForm.demands.push({
        monster_id: 0,
        monster_name: '',
        monster_num: 10
      })
    },
    removeDemand (monster_demand) {
      let index = this.monsterForm.demands.indexOf(monster_demand);
      if (index !== -1) {
        this.monsterForm.demands.splice(index, 1)
      }
    },
    optDemand (ev) {
      let monsterDemand = this.monsterForm.demands
      let postMonsterDemand = []
      for (let demand of monsterDemand) {
        postMonsterDemand.push({
          monster_id: demand.monster_id,
          monster_num: demand.monster_num
        })
      }
      this.loading = true
      this.$http.post('/yys/api/seal/opt', {demands: postMonsterDemand}).then((response) => {
        setTimeout(() => {
          this.loading = false
        }, 500)
        this.strategyResult = true
//        this.optStrategy = JSON.parse(response.body).data
      }, (response) => {
        this.$message({
          showClose: true,
          message: '系统错误，请稍后再试',
          type: 'error'
        })
        this.loading = false
      })
    },
    loadMonsters () {
      let monsters = []
      this.$http.get('/yys/api/monster/list').then((response) => {
        let monsterList = JSON.parse(response.body).data
        for (let monster of monsterList) {
          monsters.push({
            value: monster.name,
            monster_id: monster.id
          })
        }
        this.monsters = monsters
      }, (response) => {
        this.$message({
          showClose: true,
          message: '系统错误，请稍后再试',
          type: 'error'
        })
      })
    },
    selectMonster (selectedMonster) {
      let selectedIndex = this.monsterForm.demands.findIndex((demand) => {
        return demand.monster_name == selectedMonster.value
      })
      this.monsterForm.demands[selectedIndex].monster_id = selectedMonster.monster_id
    }
  },
  mounted () {
    this.loadMonsters()
  }
}
</script>

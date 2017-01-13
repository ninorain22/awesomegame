<template>
  <div>
    <mt-header title="Awesome Game"></mt-header>
    <mt-navbar v-model="selectedGame">
      <mt-tab-item id="yys">阴阳师</mt-tab-item>
      <mt-tab-item id="game2">Game2</mt-tab-item>
      <mt-tab-item id="game3">Game3</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedGame: 'yys'
    }
  },
  created () {
    this.$watch('selectedGame', function (newVal, oldVal) {
      this.$router.push('/' + newVal)
    })
  }
}
</script>

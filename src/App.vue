<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view name="body"></router-view>
  </div>
  </template>

  <script>
//  import AwesomeHeader from './components/Header'

  export default {
    name: 'app',
    components: {
//      AwesomeHeader
    },
  }
</script>

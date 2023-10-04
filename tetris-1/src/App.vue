<template>
  <div>
    <game-components/>
  </div>
</template>

<script>
import GameComponents from './components/game-components.vue' 


export default {
  name: 'App',
  components: {
    GameComponents
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

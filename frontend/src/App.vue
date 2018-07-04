<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Registration from "./components/Registration";
import Auth from "./components/Auth";

export default {
  name: 'App',
  components: {Registration, Auth},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

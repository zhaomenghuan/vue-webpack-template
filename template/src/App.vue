<template lang="pug">
  div.app
    img(src="./assets/logo.png")
    h3 hello {{msg}} !
    p A template for vue.js projects which inclode webpack's basic function,babel's preset and eslint's function.vue router and vuex can choose install.
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'vue-webpack-template'
    }
  }
}
</script>

<style>
  :root {
    --center: {
      display: block;
      margin: 0 auto;
    }
    --unlist: {
      list-style: none;
      padding: 0;
    }
  }
  .app {
    max-width: 600px;
    @apply --center;
    & img {
      width: 150px;
      @apply --center;
    }
    & h3 {
      text-align: center;
    }
    & p {
      text-indent: 2em;
      text-align:justify; 
    }
  }
</style>

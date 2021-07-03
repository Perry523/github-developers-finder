<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import VueTour from 'vue-tour'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)
export default {
  name: 'App'
}
</script>

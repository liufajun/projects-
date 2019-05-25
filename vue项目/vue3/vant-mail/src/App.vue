<template>
  <div id="app">
    <Headers></Headers>
    <router-view/>
    <FooterBars></FooterBars>
  </div>
</template>
<script>
import Headers from '@/components/common-components/Header.vue'
import FooterBars from '@/components/common-components/Footer.vue'
export default {
  name: "app",
  components: {
    Headers,
    FooterBars
  }
}
</script>
<style lang="scss">
  html{
    font-size: calc( 100vw / 7.5 )
  }
</style>

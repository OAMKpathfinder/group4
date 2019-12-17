<template>
  <div class="w-full h-full pb-6">
    <Header />
    <nuxt class="px-3" />
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

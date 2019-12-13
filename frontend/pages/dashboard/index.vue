<template>
  <section class="container">
    <HouseList />
  </section>
</template>

<script>
import HouseList from '~/components/Houses/List'

export default {
  components: {
    HouseList
  },
  middleware: 'check-auth'
}
</script>

<style lang="postcss" scoped></style>

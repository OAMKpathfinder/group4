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
  middleware: 'authenticated',
  mounted() {
    const token = window.localStorage.getItem('token')
    if (!token) {
      this.$router.push('/auth/signin')
    }
  }
}
</script>

<style lang="postcss" scoped></style>

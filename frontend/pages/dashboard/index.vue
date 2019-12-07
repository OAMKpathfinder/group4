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
    this.$store.commit('SET_TOKEN', token)
    if (!token) {
      this.$router.push('/auth/signin')
    }
    this.$store.dispatch('GET_USER')
  }
}
</script>

<style lang="postcss" scoped></style>

<template>
  <section class="container">
    <h1 class>
      Dashboard
    </h1>
  </section>
</template>

<script>
export default {
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

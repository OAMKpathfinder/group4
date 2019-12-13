<template>
  <div class="container flex flex-col justify-center items-center">
    <h1>Checking Authorization...</h1>
    <nuxt-link v-if="verified" :to="this.$route.query.to" exact>
      Click here if you are not redirected in 5 seconds.
    </nuxt-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      token: undefined,
      verified: false
    }
  },
  mounted() {
    this.checkToken()

    if (this.token) {
      this.allowOrDeny()
    }
  },
  methods: {
    ...mapActions(['GET_USER']),
    checkToken() {
      this.token = window.localStorage.getItem('token')
      if (!this.token) {
        return this.$router.push('/auth/signin')
      }
    },
    async allowOrDeny() {
      const to = this.$route.query.to
      try {
        await this.GET_USER(this.token)
        this.verified = true
        this.$router.push(to)
      } catch (err) {
        console.log(err)
        return this.$router.push('/auth/signin')
      }
    }
  }
}
</script>

<style></style>

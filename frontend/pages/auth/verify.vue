<template>
  <div class="container pt-20 flex flex-col items-center">
    <div
      v-if="alreadyVerified"
      class="card w-full xs:w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6"
    >
      <h2 class="text-center">
        Email verified!
      </h2>
      <form class="flex flex-col mt-6" @submit.prevent="resend">
        <p>
          You can start using your account!
        </p>
        <nuxt-link to="/dashboard">
          <Button :variant="'primary'">Go ahead!</Button>
        </nuxt-link>
      </form>
    </div>
    <div v-else class="card w-full xs:w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6">
      <h2 class="text-center">
        Check your email!
      </h2>
      <form class="flex flex-col mt-6" @submit.prevent="resend">
        <p>
          To start using your account, please verify your email by accessing the
          link you should recieve from us.
        </p>
        <p>
          If you do not recieve a verification e-mail in the next few minutes,
          we can try resending it.
        </p>
        <Button :variant="'primary'">
          {{ cta.label }}
        </Button>
        <div v-if="error" class="alert-red mt-3">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '~/components/Common/Button'

export default {
  components: {
    Button
  },
  data() {
    return {
      cta: {
        label: 'Resend Verification',
        disabled: false
      },
      error: null,
      alreadyVerified: false
    }
  },
  created() {
    this.alreadyVerified = this.$route.query.verified === 'true'
  },
  mounted() {
    this.guard()
  },
  methods: {
    ...mapActions(['RESEND_VERIFICATION']),
    async resend() {
      try {
        await this.RESEND_VERIFICATION()
      } catch (err) {
        this.error = err
      }
    },
    // Check if user has created an account on local machine,
    // if not, redirect to sign-in
    guard() {
      if (!this.$store.state.verification) {
        const verification = window.localStorage.getItem('verification')
        if (!verification) {
          return this.router.push('/auth/signin')
        } else {
          this.$store.commit('SET_VERIFICATION', verification)
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.card {
  @apply bg-transparent shadow-none;
}
@screen xs {
  .card {
    @apply bg-white rounded-lg shadow-md;
  }
}
</style>

<template>
  <div class="container pt-20 flex flex-col items-center">
    <div class="card w-full xs:w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6">
      <h2 class="text-center">
        Sign in to your account
      </h2>
      <form class="flex flex-col mt-6" @submit.prevent="login">
        <InputText
          v-model="formData.username"
          :name="'username'"
          :type="'text'"
          :required="true"
          :placeholder="'john.doe'"
          :variant="'primary'"
          :label="'Username'"
        />
        <InputText
          v-model="formData.password"
          :name="'password'"
          :type="'password'"
          :required="true"
          :placeholder="'********'"
          :variant="'primary'"
          :label="'Password'"
        />
        <Button :variant="'primary'" :disabled="cta.disabled">
          {{ cta.label }}
        </Button>
        <div v-if="error" class="alert-red mt-3">
          {{ error }}
        </div>
      </form>
    </div>
    <span class="mt-6">
      Don't have an account?
      <nuxt-link class="font-bold text-primary-600" to="/auth/register">
        Create one now!
      </nuxt-link>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import InputText from '~/components/Common/InputText'
import Button from '~/components/Common/Button'

export default {
  components: {
    InputText,
    Button
  },
  data() {
    return {
      formData: {
        username: undefined,
        password: undefined
      },
      cta: {
        label: 'Sign in',
        disabled: false
      },
      error: null
    }
  },
  methods: {
    ...mapActions(['SIGN_IN']),
    async login() {
      this.cta.label = 'Processing'
      this.cta.disabled = true

      try {
        await this.SIGN_IN(this.formData)
        this.cta.label = 'Redirecting...'
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err
      }
      this.cta.label = 'Sign in'
      this.cta.disabled = false
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

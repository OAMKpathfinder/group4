<template>
  <div class="container pt-20 flex flex-col items-center">
    <div class="card w-full xs:w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6">
      <h2 class="text-center">
        Register an account
      </h2>
      <form class="flex flex-col mt-6" @submit.prevent="register">
        <InputText
          v-model="formData.full_name"
          :name="'full_name'"
          :type="'text'"
          :required="true"
          :placeholder="'John Doe'"
          :variant="'primary'"
          :label="'Your Full Name'"
        />
        <InputText
          v-model="formData.username"
          :name="'username'"
          :type="'text'"
          :required="true"
          :placeholder="'john.doe'"
          :variant="'primary'"
          :label="'Preferred Username'"
        />
        <InputText
          v-model="formData.email"
          :name="'email'"
          :type="'email'"
          :required="true"
          :placeholder="'john.doe@mail.com'"
          :variant="'primary'"
          :label="'Email'"
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
      </form>
      <div v-if="error" class="alert-red mt-3">
        {{ error }}
      </div>
    </div>
    <span class="mt-6">
      Already have an account? <nuxt-link class="font-bold text-primary-600" to="/auth/signin">Sign in!</nuxt-link>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import InputText from '../../components/Common/InputText'
import Button from '../../components/Common/Button'

export default {
  components: {
    InputText, Button
  },
  data () {
    return {
      formData: {
        full_name: undefined,
        username: undefined,
        email: undefined,
        password: undefined
      },
      error: null,
      cta: {
        label: 'Create Account',
        disabled: false
      }
    }
  },
  methods: {
    ...mapActions(['SIGN_UP']),
    async register () {
      this.cta.label = 'Processing'
      this.cta.disabled = true

      try {
        await this.SIGN_UP(this.formData)
        this.cta.label = 'Redirecting...'
        this.$router.push('/auth/verify')
      } catch (err) {
        this.error = err
      }
      this.cta.label = 'Create Account'
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

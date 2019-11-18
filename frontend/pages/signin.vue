<template>
  <div class="container pt-20 flex flex-col items-center">
    <div class="card w-full xs:w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6">
      <h2 class="text-center">
        Sign in to your account
      </h2>
      <form class="flex flex-col mt-6" action="">
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
        <Button :variant="'primary'">
          Sign in
        </Button>
      </form>
    </div>
    <span class="mt-6">
      Don't have an account? <nuxt-link class="font-bold text-primary-600" to="/register">Create one now!</nuxt-link>
    </span>
  </div>
</template>

<script>
import InputText from '../components/Common/InputText'
import Button from '../components/Common/Button'

export default {
  components: {
    InputText, Button
  },
  data () {
    return {
      formData: {
        email: undefined,
        password: undefined
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

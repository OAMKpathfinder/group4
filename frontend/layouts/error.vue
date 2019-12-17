<template>
  <div
    class="container h-full flex items-center justify-center text-center flex-col"
  >
    <h1 v-if="error.statusCode === 404" class="mb-12">
      Error 404 <br />
      Page not found, sorry.
    </h1>
    <h1 v-else>Oh, an error occured...</h1>
    <nuxt-link to="/" class="underline">Try going back home</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style></style>

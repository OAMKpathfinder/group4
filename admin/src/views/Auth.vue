<template>
  <div class="container h-full flex items-center">
    <div class="flex flex-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
      <h1 class="mx-auto mb-10">Log In</h1>
      <div class="card p-3 w-full mx-auto overflow-hidden">
        <div class="form flex flex-col">
          <input type="text" class="input-green mb-3" placeholder="Username">
          <input type="password" class="input-green mb-3" placeholder="Password">
          <button class="button-green">Log In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="postcss">
.tab {
  @apply p-3 font-bold;
}

.tab:hover {
  @apply bg-gray-300;
}
</style>

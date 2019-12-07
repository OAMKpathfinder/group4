<template>
  <div class="card flex items-end w-full h-32">
    <div class="flex flex-row justify-between items-center p-3 w-full">
      <div class="label flex flex-col w-full">
        <small>Decade</small>
        <h3>1990</h3>
      </div>
      <div class="select flex flex-row">
        <i
          class="la la-angle-left p-3 hover:bg-gray-200 rounded-full transition"
        />
        <i
          class="la la-angle-right p-3 hover:bg-gray-200 rounded-full transition"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      decades: undefined
    }
  },
  mounted() {
    // fetch decades from backend
  }
}
</script>

<style></style>

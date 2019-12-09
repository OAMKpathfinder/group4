<template>
  <div class="card shadow-lg w-full p-3 flex flex-row items-center">
    <h1>{{ item.decade }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>

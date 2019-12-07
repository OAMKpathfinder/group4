<template>
  <div class="w-full flex flex-col">
    <ChooseDecade v-model="value.decade" class="mb-4" />
  </div>
</template>

<script>
import ChooseDecade from './ChooseDecade'

export default {
  components: {
    ChooseDecade
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>

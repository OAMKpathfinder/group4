<template>
  <div>
    <span>{{ label }}</span>
    <Checkbox
      v-for="item of list"
      :key="item.value"
      :item="item.value"
      :label="item.label"
      :checked="item.checked"
      :disabled="item.disabled"
      v-model="value"
    >
    </Checkbox>
  </div>
</template>

<script>
import Checkbox from './Checkbox'
export default {
  components: {
    Checkbox
  },
  props: {
    label: String,
    list: {
      type: Array,
      required: true
    },
    value: Array
  }
}
</script>

<style></style>

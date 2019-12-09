<template>
  <label class="block">
    <span class="text-gray-700" v-if="label">{{ label }}</span>
    <select
      :value="value"
      :required="required"
      :name="name"
      @input="input($event.target.value)"
      class="input input-primary mt-1 block w-full focus:shadow-none"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="item in items" :key="item.id" :value="item.id">{{
        item.name
      }}</option>
    </select>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Select one'
    },
    label: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    input: function(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style></style>

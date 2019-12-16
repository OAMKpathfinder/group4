<template>
  <!-- eslint-disable -->
  <label class="block mb-4">
    <span v-if="label" class="text-gray-700 text-sm">
      {{ label }}{{ required ? ' *' : null }}
    </span>
    <select
      :value="value"
      :required="required"
      :name="name"
      class="input input-primary mt-1 block w-full focus:shadow-none"
      @input="input($event.target.value)"
    >
      <option :value="undefined">{{ placeholder }}</option>
      <option v-for="item in items" :key="item.id" :value="item[get]">
        {{ item[display] }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: undefined,
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
    },
    get: {
      type: String,
      default: 'id'
    },
    display: {
      type: String,
      default: 'name'
    }
  },
  methods: {
    input(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style></style>

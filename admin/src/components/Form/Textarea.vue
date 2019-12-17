<template>
  <label class="block mb-4">
    <span v-if="label" class="text-gray-700 text-sm">
      {{ label }}{{ required ? ' *' : null }}
    </span>
    <textarea
      :id="name"
      class="mt-1 block w-full focus:shadow-none rounded"
      :name="name"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="`input-${variant} ${errors ? 'input-error' : ''}`"
      :required="required"
      @input="input($event.target.value)"
    />
  </label>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'primary'
    },
    // eslint-disable-next-line
    value: {
      required: true,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default: null
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

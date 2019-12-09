<template>
  <label class="block mb-4">
    <span v-if="label" class="text-gray-700 text-sm">
      {{ label }}{{ required ? ' *' : null }}
    </span>
    <input
      :id="name"
      class="mt-1 block w-full focus:shadow-none"
      :name="name"
      :value="value"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="`input-${variant} ${errors ? 'input-error' : ''}`"
      :required="required"
      step=".01"
      min="0"
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
    type: {
      type: String,
      validator(value) {
        return ['text', 'email', 'password', 'number'].includes(value)
      },
      default: 'text'
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

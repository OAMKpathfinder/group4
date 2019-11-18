<template>
  <label class="block mb-2">
    <span v-if="label" class="text-gray-700">{{ label }}</span>
    <input
      class="mt-1 block w-full focus:shadow-none"
      :id="name"
      :name="name"
      :value="value"
      :type="type"
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
    type: {
      type: String,
      validator (value) {
        return ['text', 'email', 'password'].includes(value)
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
    value: {
      type: String
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
    input (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style></style>

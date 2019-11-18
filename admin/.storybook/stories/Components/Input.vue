<template>
  <label class="block">
    <span class="text-gray-700" v-if="label">{{ label }}</span>
    <input
      :value="value"
      :type="type"
      :name="name"
      :id="name"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="`input-${variant} ${errors ? 'input-error' : ''}`"
      :required="required"
      @input="input($event.target.value)"
      class="mt-1 block w-full focus:shadow-none"
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
      validator: function(value) {
        return ['text', 'email', 'password'].indexOf(value) !== -1
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
      default: 'green'
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
    input: function(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style></style>

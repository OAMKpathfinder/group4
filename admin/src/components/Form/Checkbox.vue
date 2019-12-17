<template>
  <div class="flex">
    <label class="flex items-center">
      <input
        :id="value"
        :value="value"
        :disabled="disabled"
        class="checkbox-primary"
        :checked="checked || value === true"
        type="checkbox"
        @click="check($event.target.value)"
      />
      <span class="ml-2"> {{ label }}{{ required ? ' *' : null }} </span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [Array, Boolean],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    check(value) {
      if (typeof this.value === 'boolean') {
        this.$emit('input', !this.value)
        return
      }

      if (!this.value.includes(value)) {
        this.value.push(value)
      } else {
        this.value.splice(this.value.indexOf(value), 1)
      }
      this.$emit('input', this.value)
    }
  }
}
</script>

<style></style>

<template>
  <div class="flex">
    <label class="flex items-center">
      <input
        type="checkbox"
        class="checkbox-primary"
        :value="item"
        :id="value"
        :disabled="disabled"
        :checked="checked || value === true"
        @click="check($event.target.value)"
      />
      <span class="ml-2">
        {{ label }}
      </span>
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
    item: {
      type: [String, Number],
      required: false
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
    }
  },
  methods: {
    check: function(value) {
      if (typeof this.value === 'boolean') {
        this.$emit('input', !this.value)
        return
      }

      if (this.value.indexOf(value) === -1) {
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

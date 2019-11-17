<template>
  <button :class="`button-${variant}`" @click="click" type="submit">
    <slot> </slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'light'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click: function() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="postcss"></style>

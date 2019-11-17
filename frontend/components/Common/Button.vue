<template>
  <button
    type="submit"
    :class="`button-${variant} w-full`"
    @click="click"
  >
    <slot />
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
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="postcss"></style>

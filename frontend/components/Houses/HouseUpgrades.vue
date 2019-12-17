<template>
  <div class="card p-3 rounded-lg mb-4">
    <h3>{{ details.House_Parts.part }}</h3>
    <div class="details">
      <div class="materials">
        <small class="text-gray-600">Materials</small>
        <p
          v-for="m of details.Part_Materials"
          :key="m.id"
          v-html="formatMaterial(m)"
        ></p>
      </div>
    </div>
    <div class="flex flex-row">
      <div class="mr-4">
        <small class="text-gray-600">U-Value</small>
        <p class="font-bold">{{ details.U_value }}</p>
      </div>
      <div class="mr-4">
        <small class="text-gray-600">Heat Loss</small>
        <p class="font-bold">{{ details.hjoht }}</p>
      </div>
      <div class="mr-4">
        <small class="text-gray-600">Surface</small>
        <p class="font-bold">{{ details.surface }}m<sup>2</sup></p>
      </div>
    </div>
    <div v-if="suggestions" class="suggestions">
      <div
        v-if="suggestions.length > 0"
        class="list w-full flex flex-col"
        @mouseenter="showAction = true"
        @mouseleave="showAction = false"
      >
        <span>Here are our suggestions for better efficiency:</span>
        <div
          v-for="suggestion of suggestions"
          :key="suggestion.id"
          class="my-2 flex flex-row rounded bg-gray-100 p-3 hover:shadow-md transition justify-between"
        >
          <div class="flex flex-row flex-grow">
            <div class="flex flex-col mr-4 w-1/2">
              <small class="text-gray-600">by {{ suggestion.producer }}</small>
              <h6 class="font-bold">{{ suggestion.name }}</h6>
            </div>
            <div
              :title="`U-Value: ${suggestion.U_value}`"
              class="flex flex-col mr-4"
            >
              <small class="text-gray-600">Improvement</small>
              <h6 class="font-bold text-primary-700">
                {{ calculateImprovement(suggestion.U_value) }} %
              </h6>
            </div>
            <div class="flex flex-col mr-4">
              <small class="text-gray-600">Price</small>
              <h6 class="font-bold">€{{ suggestion.price }}</h6>
            </div>
          </div>
          <div
            :class="{ 'text-transparent': !showAction }"
            class="action h-full flex self-center text-xl flex-shrink"
          >
            <i
              title="Upgrade!"
              class="las la-angle-double-up cursor-pointer p-3 rounded-full hover:bg-gray-300 transition"
              @click="upgrade(suggestion.id)"
            />
          </div>
        </div>
      </div>
      <div v-else class="w-full bg-primary-200 rounded p-3">
        <h4>Nice job! This part can't be more efficient!</h4>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'
export default {
  props: {
    details: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      suggestions: undefined,
      error: null,
      showAction: false
    }
  },
  mounted() {
    this.getSuggestions()
  },
  methods: {
    ...mapActions(['GET_SUGGESTIONS', 'UPGRADE_PART']),
    async getSuggestions() {
      try {
        this.suggestions = await this.GET_SUGGESTIONS({ id: this.details.id })
      } catch (err) {
        this.error = err
      }
    },
    async upgrade(to) {
      try {
        this.$emit('onUpgrade')
        await this.UPGRADE_PART({ id: this.details.id, to: to })
        this.$router.go()
      } catch (err) {
        this.$emit('onUpgrade')
        this.error = err
      }
    },
    calculateImprovement(UValue) {
      return (
        (100 * Math.abs(this.details.U_value - UValue)) /
        ((this.details.U_value + UValue) / 2)
      ).toFixed(2)
    },
    formatMaterial(m) {
      const { name, type, thickness, thermal_conductivity } = m.Materials
      return `<strong>${type} ${name}</strong>, ${thickness}m thick and a thermal conductivity of ${thermal_conductivity}.`
    }
  }
}
</script>

<style></style>

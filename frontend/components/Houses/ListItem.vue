<template>
  <div
    class="card shadow-lg w-full p-3 flex flex-row justify-between transition items-center"
  >
    <div class="flex flex-row flex-wrap items-center h-full">
      <img
        :src="`/static/${image}`"
        alt="Not found"
        :title="`Image of ${item.decade} building.`"
        class="w-32 h-20 object-cover rounded-lg mr-4"
      />
      <div class="detail">
        <small>Decade</small>
        <h1 class="-mt-2">{{ item.decade }}</h1>
      </div>
      <div class="detail">
        <small>Floors</small>
        <h1 class="-mt-2">{{ item.levels }}</h1>
      </div>
      <div class="detail">
        <small>Warm Water Pipe</small>
        <h1 class="-mt-2">
          <i
            v-if="item.warm_water_pipe"
            class="lar la-check-circle text-primary-600"
          ></i>
          <i v-else class="lar la-times-circle text-red-800"></i>
        </h1>
      </div>
      <div class="detail">
        <small>Heating Cost / Year</small>
        <h1 class="-mt-2">€{{ item.heating_per_year }}</h1>
      </div>
      <div class="detail">
        <small>Heat Loss</small>
        <h1 class="-mt-2">{{ item.hjoht }} kW</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      image: null
    }
  },
  beforeMount() {
    this.getImage()
  },
  methods: {
    ...mapActions(['GET_DECADE_IMAGE']),
    async getImage() {
      try {
        this.image = await this.GET_DECADE_IMAGE({ decade: this.item.decade })
      } catch (err) {
        return err
      }
    }
  }
}
</script>

<style scoped lang="postcss">
.detail {
  @apply flex flex-col mr-12;
}

.card:hover {
  transform: scale(1.001);
  @apply shadow-lg;
}

small {
  @apply uppercase text-gray-600;
}
</style>

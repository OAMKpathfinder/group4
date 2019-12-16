<template>
  <div class="card shadow-lg w-full p-3 flex flex-row items-center transition">
    <img
      :src="`/api/static/${image}`"
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
      <h1 class="-mt-2">{{ item.warm_water_pipe }}</h1>
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

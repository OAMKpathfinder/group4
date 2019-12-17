<template>
  <div class="card p-3 rounded-lg flex flex-col">
    <img
      v-if="image"
      :src="`/static/${image}`"
      alt="Image Not Found"
      class="rounded-lg h-48 w-full object-cover"
    />
    <img
      v-else
      src
      alt
      class="bg-gray-200 rounded-lg h-48 w-full object-cover"
    />
    <div class="grid grid-gap-4 grid-columns-2 mt-4">
      <div>
        <small class="text-gray-600">Decade</small>
        <h3>{{ house.decade }}</h3>
      </div>
      <div>
        <small class="text-gray-600">Levels</small>
        <h3>{{ house.levels }}</h3>
      </div>
      <div>
        <small class="text-gray-600">Location</small>
        <h3>{{ house.Locations.country }}</h3>
      </div>
      <div>
        <small class="text-gray-600">Heating System</small>
        <h3>{{ house.Heating_Systems.type }}</h3>
      </div>
      <div>
        <small class="text-gray-600">Heat Loss</small>
        <h3>{{ house.hjoht }} kW</h3>
      </div>
      <div>
        <small class="text-gray-600">Warm Water Pipe</small>
        <h1 class="-mt-2">
          <i
            v-if="house.warm_water_pipe"
            class="lar la-check-circle text-primary-600"
          ></i>
          <i v-else class="lar la-times-circle text-red-800"></i>
        </h1>
      </div>
      <div class="col-span-2">
        <small class="text-gray-600">Heating Cost / Year</small>
        <h3>€{{ house.heating_per_year }}</h3>
      </div>
    </div>
    <div
      class="total-spent mt-8 p-3 rounded-lg border border-primary-700 bg-primary-200"
    >
      <small>Total Money Spent</small>
      <h3>€{{ house.total_cost }}</h3>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    house: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      image: undefined
    }
  },
  beforeMount() {
    this.getImage()
  },
  methods: {
    ...mapActions(['GET_DECADE_IMAGE']),
    async getImage() {
      try {
        this.image = await this.GET_DECADE_IMAGE({ decade: this.house.decade })
      } catch (err) {
        return err
      }
    }
  }
}
</script>

<style></style>

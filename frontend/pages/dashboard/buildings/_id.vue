<template>
  <section
    :class="{ 'opacity-50': reloading }"
    class="container p-3 rounded-lg transition"
  >
    <p v-if="loading">loading</p>
    <div v-if="error" class="alert alert-red">
      {{ error }}
    </div>
    <div v-if="house" class="flex flex-col md:grid grid-gap-4 grid-columns-12">
      <!-- TODO: Change :key to id, modify backend -->
      <div class="col-span-8">
        <HouseUpgrades
          v-for="detail of house.House_Details"
          :key="detail.id"
          :details="detail"
          class="row-span-1"
          @onUpgrade="wait()"
        />
      </div>
      <HouseDetails :house="house" class="col-span-4" />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import HouseDetails from '~/components/Houses/HouseDetails'
import HouseUpgrades from '~/components/Houses/HouseUpgrades'

export default {
  components: {
    HouseDetails,
    HouseUpgrades
  },
  data() {
    return {
      house: undefined,
      loading: true,
      error: null,
      reloading: false
    }
  },
  mounted() {
    this.getHouse()
  },
  methods: {
    ...mapActions(['GET_ONE_HOUSE']),
    async getHouse() {
      const id = this.$route.params.id
      try {
        console.log(id)
        this.house = await this.GET_ONE_HOUSE(id)
      } catch (err) {
        this.error = err
      }
      this.loading = false
    },
    wait() {
      this.reloading = !this.reloading
    }
  }
}
</script>

<style></style>

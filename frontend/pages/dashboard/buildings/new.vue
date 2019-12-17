<template>
  <section class="container w-full">
    <form
      class="w-full pb-48 flex justify-center"
      @submit.prevent="progress === 2 ? createBuilding() : progress++"
    >
      <div class="w-full sm:w-2/3 lg:w-1/2 xl:w-2/5 flex flex-col">
        <HouseDetails v-show="progress >= 0" v-model="formData.houseDetails" />
        <HouseParts v-show="progress >= 1" v-model="formData.houseParts" />
        <div>
          <Button v-if="progress < 2" :variant="'primary'">
            Next Step
          </Button>
          <Button v-else :variant="'primary'">
            {{ loading ? 'Loading...' : 'Finish' }}
          </Button>
        </div>
        <div v-if="error" class="alert alert-red mt-4">
          {{ error }}
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '~/components/Common/Button'
import HouseDetails from '~/components/Houses/New/HouseDetails'
import HouseParts from '~/components/Houses/New/HouseParts'

export default {
  components: {
    Button,
    HouseDetails,
    HouseParts
  },
  middleware: 'check-auth',
  data() {
    return {
      formData: {
        houseDetails: {
          decade: undefined,
          LocationsId: undefined,
          HeatingSystemsId: undefined,
          levels: undefined,
          heating_per_year: undefined,
          warm_water_pipe: false
        },
        houseParts: []
      },
      progress: 0,
      error: null,
      loading: false
    }
  },
  methods: {
    ...mapActions(['POST_HOUSE', 'POST_HOUSE_DETAILS']),
    async createBuilding() {
      const house = this.formData.houseDetails
      try {
        const newHouse = await this.POST_HOUSE(house)
        await this.addParts(newHouse.id)
      } catch (err) {
        this.error = err
      }
    },
    async addParts(houseId) {
      this.formData.houseParts.forEach(function(part) {
        part.HousesId = houseId
      })
      await this.POST_HOUSE_DETAILS(this.formData.houseParts)
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style></style>

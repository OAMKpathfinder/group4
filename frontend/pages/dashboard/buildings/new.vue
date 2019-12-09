<template>
  <section class="container w-full">
    <form @submit.prevent="createBuilding" class="w-full pb-48">
      <div class="w-full flex flex-col md:flex-row">
        <HouseDetails
          v-model="formData.houseDetails"
          class="w-full md:w-1/2 lg:w-1/3"
        />
        <HouseParts
          v-model="formData.houseParts"
          class="w-full ml-0 md:w-1/2 lg:w-2/3 md:ml-4"
        />
      </div>
      <div class="w-32 float-right">
        <Button :variant="'primary'">
          {{ loading ? 'Loading...' : 'Finish' }}
        </Button>
      </div>
      <div v-if="error" class="alert alert-red mt-4">
        {{ error }}
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
        this.addParts(newHouse.id)
      } catch (err) {
        this.error = err
      }
    },
    async addParts(houseId) {
      console.log(houseId)
      this.formData.houseParts.forEach(function(part) {
        part.HousesId = houseId
      })
      console.log(this.formData.houseParts)
      const data = await this.POST_HOUSE_DETAILS(this.formData.houseParts)
      console.log(data)
    }
  }
}
</script>

<style></style>

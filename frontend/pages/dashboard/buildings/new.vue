<template>
  <section class="container grid grid-gap-4 grid-columns-12">
    <div class="col-span-3">
      <HouseDetails v-model="formData.houseDetails" />
      <Button :variant="'primary'">Finish</Button>
    </div>
    <div class="col-span-9">
      <HouseParts v-model="formData.houseParts" />
    </div>
  </section>
</template>

<script>
import Button from '~/components/Common/Button'
import HouseDetails from '~/components/Houses/New/HouseDetails'
import HouseParts from '~/components/Houses/New/HouseParts'
// import InputText from '~/components/Common/InputText'

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
          location: undefined,
          heating_system_type: undefined,
          levels: undefined,
          heating_per_year: undefined,
          warm_water_pipe: false
        },
        houseParts: []
      }
    }
  }
}
</script>

<style></style>

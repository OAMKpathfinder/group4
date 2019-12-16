<template>
  <form @submit.prevent="submit">
    <Dropdown
      :label="'For'"
      :items="parts"
      :display="'part'"
      :name="'forpart'"
      :required="true"
      v-model="formData.PartId"
    />
    <InputText
      :name="'part'"
      :label="'Product Name'"
      :placeholder="'Oak Door'"
      :required="true"
      :type="'text'"
      v-model="formData.name"
    />
    <InputText
      :name="'producer'"
      :label="'Produced by'"
      :placeholder="'Siemens'"
      :required="true"
      :type="'text'"
      v-model="formData.producer"
    />
    <InputText
      :name="'serial'"
      :label="'Serial ID'"
      :placeholder="'99XDV1990'"
      :required="true"
      :type="'text'"
      v-model="formData.serial"
    />
    <InputText
      :name="'price'"
      :label="'Price'"
      :placeholder="'110.99'"
      :required="true"
      :type="'number'"
      v-model="formData.price"
    />
    <InputText
      :name="'u-value'"
      :label="'U-Value'"
      :placeholder="'0.5'"
      :required="true"
      :type="'number'"
      v-model="formData.U_value"
    />
    <Button :variant="'primary'">Create</Button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

import Button from '../Form/Button'
import Dropdown from '../Form/Dropdown'
import InputText from '../Form/InputText'

export default {
  components: {
    Button,
    InputText,
    Dropdown
  },
  data() {
    return {
      formData: {},
      loading: false,
      error: null,
      parts: []
    }
  },
  mounted() {
    this.getParts()
  },
  methods: {
    ...mapActions(['create', 'fetchTableData']),
    async submit() {
      const resource = 'part-types'
      const data = this.formData

      try {
        await this.create({ resource: resource, data: data })
        this.formData = {}
      } catch (err) {
        this.error = err
      }
    },
    async getParts() {
      const resource = 'house-parts'
      try {
        this.parts = await this.fetchTableData(resource)
        console.log(this.parts)
      } catch (err) {
        this.$emit('error', err)
      }
    }
  }
}
</script>

<style></style>

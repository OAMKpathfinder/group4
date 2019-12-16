<template>
  <form @submit.prevent="submit">
    <InputText
      :name="'name'"
      :label="'Name'"
      :placeholder="'Wood'"
      :required="true"
      :type="'text'"
      v-model="formData.name"
    />
    <InputText
      :name="'type'"
      :label="'Type'"
      :placeholder="'White Oak'"
      :required="true"
      :type="'text'"
      v-model="formData.type"
    />
    <InputText
      :name="'thermal_conductivity'"
      :label="'Thermal Conductivity'"
      :placeholder="'1.5'"
      :required="true"
      :type="'number'"
      v-model="formData.thermal_conductivity"
    />
    <InputText
      :name="'thickness'"
      :label="'Thickness [meters]'"
      :placeholder="'0.2'"
      :required="true"
      :type="'number'"
      v-model="formData.thickness"
    />
    <Textarea
      :label="'Description'"
      :name="'description'"
      v-model="formData.description"
      :required="true"
    />
    <Button :variant="'primary'">Create</Button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

import Textarea from '../Form/Textarea'
import Button from '../Form/Button'
import InputText from '../Form/InputText'

export default {
  components: {
    Button,
    InputText,
    Textarea
  },
  data() {
    return {
      formData: {},
      loading: false,
      error: null,
      roles: [{ name: 'user' }, { name: 'admin' }]
    }
  },
  methods: {
    ...mapActions(['create']),
    async submit() {
      const resource = 'materials'
      const data = this.formData

      try {
        await this.create({ resource: resource, data: data })
        this.formData = {}
      } catch (err) {
        this.$emit('error', err)
      }
    }
  }
}
</script>

<style></style>

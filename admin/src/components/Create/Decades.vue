<template>
  <form @submit.prevent="submit">
    <InputText
      :name="'decade'"
      :label="'Decade'"
      :placeholder="'2000'"
      :required="true"
      :type="'number'"
      v-model="formData.decade"
    />
    <InputText
      :name="'houseImage'"
      :label="'Image File Name with Extension'"
      :placeholder="'file.jpg'"
      :required="true"
      :type="'text'"
      v-model="formData.houseImage"
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
      const resource = 'defaults'
      const data = this.formData

      try {
        await this.create({ resource: resource, data: data })
        this.formData = {}
      } catch (err) {
        this.$emit('error', err.data.message)
      }
    }
  }
}
</script>

<style></style>

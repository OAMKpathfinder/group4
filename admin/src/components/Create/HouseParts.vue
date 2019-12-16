<template>
  <form @submit.prevent="submit">
    <InputText
      :name="'part'"
      :label="'Part Name'"
      :placeholder="'Outer Wall'"
      :required="true"
      :type="'text'"
      v-model="formData.part"
    />
    <Button :variant="'primary'">Create</Button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

import Button from '../Form/Button'
import InputText from '../Form/InputText'

export default {
  components: {
    Button,
    InputText
  },
  data() {
    return {
      formData: {},
      loading: false,
      error: null
    }
  },
  methods: {
    ...mapActions(['create']),
    async submit() {
      const resource = 'house-parts'
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

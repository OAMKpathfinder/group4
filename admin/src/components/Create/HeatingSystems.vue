<template>
  <form @submit.prevent="submit">
    <InputText
      :name="'type'"
      :label="'Type'"
      :placeholder="'Oil'"
      :required="true"
      :type="'text'"
      v-model="formData.type"
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
      const resource = 'heating-systems'
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

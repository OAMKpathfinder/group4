<template>
  <form @submit.prevent="toUpdate ? updateData() : submit()">
    <InputText
      :name="'part'"
      :label="'Part Name'"
      :placeholder="'Outer Wall'"
      :required="true"
      :type="'text'"
      v-model="formData.part"
    />
    <Button :variant="'primary'">{{ toUpdate ? 'Update' : 'Create' }}</Button>
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
      resource: 'house-parts',
      toUpdate: null,
      formData: {},
      loading: false,
      error: null
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.fetchData(this.$route.query.id)
    }
  },
  methods: {
    ...mapActions(['create', 'get', 'update']),
    async submit() {
      const data = this.formData

      try {
        await this.create({ resource: this.resource, data: data })
        this.formData = {}
      } catch (err) {
        this.$emit('error', err.data.message)
      }
    },
    async fetchData(id) {
      try {
        const data = await this.get({ resource: this.resource, id: id })
        this.toUpdate = data.id
        this.formData = { ...data }
      } catch (err) {
        this.$emit('error', err.data.message)
      }
    },
    async updateData() {
      try {
        await this.update({
          resource: this.resource,
          id: this.toUpdate,
          data: this.formData
        })
        this.formData = {}
      } catch (err) {
        this.$emit('error', err.data.message)
      }
    }
  }
}
</script>

<style></style>

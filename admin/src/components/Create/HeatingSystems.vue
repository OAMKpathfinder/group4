<template>
  <form @submit.prevent="toUpdate ? update : submit">
    <InputText
      :name="'type'"
      :label="'Type'"
      :placeholder="'Oil'"
      :required="true"
      :type="'text'"
      v-model="formData.type"
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
      resource: 'heating-systems',
      toUpdate: null,
      formData: {},
      loading: false,
      error: null
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.get(this.$route.query.id)
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
    async get(id) {
      try {
        const data = await this.get({ resource: this.resource, id: id })
        this.toUpdate = data.id
        this.formData = { ...data }
      } catch (err) {
        this.$emit('error', err.data.message)
      }
    },
    async update() {
      try {
        await this.get({
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

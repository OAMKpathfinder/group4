<template>
  <form @submit.prevent="toUpdate ? updateData() : submit()">
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
    <Button :variant="'primary'">{{ toUpdate ? 'Update' : 'Create' }}</Button>
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
      resource: 'materials',
      formData: {},
      toUpdate: null,
      loading: false,
      error: null,
      roles: [{ name: 'user' }, { name: 'admin' }]
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
        this.$emit('error', err)
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

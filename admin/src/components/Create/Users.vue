<template>
  <form @submit.prevent="submit">
    <div class="alert alert-red mb-4" v-if="$route.query.id">
      <strong class="text-red-700">Sorry!</strong> User editing is not available
      yet.
    </div>
    <InputText
      :name="'username'"
      :label="'Username'"
      :placeholder="'john.doe'"
      :required="true"
      :type="'text'"
      v-model="formData.username"
    />
    <InputText
      :name="'fullname'"
      :label="'Full Name'"
      :placeholder="'John Doe'"
      :required="true"
      :type="'text'"
      v-model="formData.full_name"
    />
    <InputText
      :name="'email'"
      :label="'Email'"
      :placeholder="'john.doe@mail.com'"
      :required="true"
      :type="'email'"
      v-model="formData.email"
    />
    <InputText
      :name="'password'"
      :label="'Password'"
      :placeholder="'********'"
      :required="true"
      :type="'password'"
      v-model="formData.password"
    />
    <Dropdown
      :label="'Role'"
      :items="roles"
      :name="'roles'"
      :get="'name'"
      :required="true"
      v-model="formData.role"
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
    Dropdown,
    InputText
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
      const resource = 'users'
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

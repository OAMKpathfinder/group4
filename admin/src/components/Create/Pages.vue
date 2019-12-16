<template>
  <form @submit.prevent="submit">
    <InputText
      :name="'name'"
      :label="'Title'"
      :placeholder="'Title [<255 characters]'"
      :required="true"
      :type="'text'"
      v-model="formData.title"
    />
    <InputText
      :name="'slug'"
      :label="'Slug'"
      :placeholder="'title-url-slug'"
      :type="'text'"
      v-model="formData.slug"
    />
    <Textarea
      :name="'excerpt'"
      :label="'Excerpt'"
      :placeholder="'Excerpt [<255 characters]'"
      v-model="formData.excerpt"
      :required="true"
    />
    <InputText
      :name="'image'"
      :label="'Image'"
      :placeholder="'image_file_name.extension'"
      :required="true"
      :type="'text'"
      v-model="formData.image"
    />
    <span class="text-gray-700 text-sm">
      Body Text *
    </span>
    <ckeditor
      :editor="editor"
      v-model="formData.body"
      :config="editorConfig"
    ></ckeditor>
    <Button :variant="'primary'" class="mt-4">Create</Button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

import CKeditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import Textarea from '../Form/Textarea'
import Button from '../Form/Button'
import InputText from '../Form/InputText'

export default {
  components: {
    Button,
    InputText,
    Textarea,
    ckeditor: CKeditor.component
  },
  data() {
    return {
      formData: {},
      loading: false,
      error: null,
      editor: ClassicEditor,
      editorConfig: {
        placeholder: 'Edit here body text'
      }
    }
  },
  methods: {
    ...mapActions(['create']),
    async submit() {
      const resource = 'pages'
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

<style lang="postcss">
.ck-content {
  min-height: 240px;
}
</style>

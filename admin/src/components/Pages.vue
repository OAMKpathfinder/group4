<template>
  <div class="container px-3 pt-3 flex flex-col">
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
      <vue-editor
        id="editor"
        v-model="formData.body"
        :customModules="customModulesForEditor"
        :editorOptions="editorSettings"
        :useCustomImageHandler="true"
        @image-added="handleImageAdded"
      />

      <Button :variant="'primary'" class="mt-4">Create</Button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { VueEditor } from 'vue2-editor'
import { ImageDrop } from 'quill-image-drop-module'
// import ImageResize from 'quill-image-resize-module'

import Textarea from './Form/Textarea'
import Button from './Form/Button'
import InputText from './Form/InputText'

export default {
  components: {
    Button,
    InputText,
    Textarea,
    VueEditor
  },
  data() {
    return {
      formData: {},
      loading: false,
      error: null,
      customModulesForEditor: [
        { alias: 'imageDrop', module: ImageDrop }
        // { alias: 'imageResize', module: ImageResize }
      ],
      editorSettings: {
        modules: {
          imageDrop: true
        }
      }
    }
  },
  methods: {
    ...mapActions(['create', 'upload']),
    async submit() {
      const resource = 'pages'
      const data = this.formData

      try {
        await this.create({ resource: resource, data: data })
        this.formData = {}
      } catch (err) {
        this.$emit('error', err)
      }
    },
    async handleImageAdded(file, Editor, cursorLocation) {
      console.log('image')
      var formData = new FormData()
      formData.append('image-upload', file)
      try {
        const file = await this.upload({ data: formData })
        let url = `/static/${file}`

        Editor.insertEmbed(cursorLocation, 'image', url)
      } catch (err) {
        console.log(err)
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

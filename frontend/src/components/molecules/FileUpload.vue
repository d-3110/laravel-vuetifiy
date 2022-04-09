<template>
  <ValidationProvider ref="obs" v-slot="{ errors }" :rules="rules" :name="label" :immediate="immediate">
    <v-row @dragover.prevent @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
      <v-col>
        <v-file-input
          class="pa-0"
          v-model="files"
          multiple
          outlined
          clearable
          prepend-icon=""
          prepend-inner-icon="mdi-paperclip"
          :show-size="1000"
          :label="label"
          :placeholder="label"
          hint="ドラッグアンドドロップでもアップロードできます"
          persistent-hint
          :background-color="isDragging ? 'primary' : 'null'"
          @change="onChange"
          :error-messages="errors"
          :dense="dense"
        >
          <template #selection="{ index, text }">
            <v-chip v-if="index < 2" color="primary" dark label small>
              {{ text }}
            </v-chip>
            <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input>
      </v-col>
    </v-row>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
      required: true,
    },
    handleInput: {
      type: Function,
      required: true,
    },
    rules: {
      type: [String, Object],
      default: 'required',
      required: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: true,
    },
    dense: {
      type: Boolean,
      default: false,
      required: true,
    },
    immediate: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data: () => {
    return {
      files: [],
      isDragging: false,
      dragCount: 0,
    }
  },
  methods: {
    onDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      this.isDragging = false
      const _files = e.dataTransfer.files
      for (const file in _files) {
        if (!isNaN(file)) {
          //filesはファイル以外のデータが入っており、ファイルの場合のみキー名が数字になるため
          this.files.push(_files[file])
        }
      }
    },
    onDragEnter(e) {
      e.preventDefault()
      this.isDragging = true
      this.dragCount++
    },
    onDragLeave(e) {
      e.preventDefault()
      this.dragCount--
      if (this.dragCount <= 0) {
        this.isDragging = false
      }
    },
    onChange: async function (files) {
      this.handleInput({ [this.id]: files })
    },
  },
}
</script>

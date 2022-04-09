<template>
  <v-container>
    <v-row>
      <span v-if="label !== ''" class="my-4">{{ label }}</span>
      <v-chip-group multiple active-class="secondary--text" v-model="selected">
        <span v-for="(item, i) in chips" :key="i">
          <v-chip filter class="ma-2" close-icon="mdi-delete" color="primary" text-color="white">
            {{ item.originalName }}
          </v-chip>
        </span>
      </v-chip-group>
    </v-row>
    <v-row class="mb-2">
      <v-btn
        small
        @click="handleDownload(type, index)"
        :disabled="selected.length === 0 || isLoading ? true : false"
        :loading="isLoading"
        color="secondary"
        class="mr-4"
      >
        ダウンロード
      </v-btn>
      <v-btn
        v-if="hasDelete"
        small
        color="error"
        :disabled="selected.length === 0 || isLoading ? true : false"
        :loading="isLoading"
        @click="handleDelete(type, index)"
      >
        削除
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'FileDownload',
  props: {
    id: {
      type: String,
      required: true,
    },
    index: {
      validator: prop => typeof prop === 'number' || prop === null, // リセットの時のエラー回避のため(null許可)
      default: null,
      required: false,
    },
    type: {
      type: Number,
      required: true,
    },
    chips: {
      type: Array,
      default: () => [],
      required: true,
    },
    label: {
      type: String,
      default: '',
      required: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: true,
    },
    handleSelect: {
      type: Function,
      default: () => ({}),
      required: true,
    },
    handleDownload: {
      type: Function,
      default: () => ({}),
      required: true,
    },
    hasDelete: {
      type: Boolean,
      default: true,
      required: false,
    },
    handleDelete: {
      type: Function,
      default: () => ({}),
      required: false,
    },
    selectedFiles: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  computed: {
    selected: {
      get: function () {
        return this.selectedFiles
      },
      set: function (value) {
        if (this.index === null) {
          this.handleSelect({ [this.id]: value })
        } else {
          this.handleSelect({ [this.id]: value }, this.index)
        }
      },
    },
  },
}
</script>

<style></style>
